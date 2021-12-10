import { ArgumentParser } from 'argparse';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as https from 'https';
import { runChildProcessAsync } from './helpers';
const fsAsync = fs.promises;

const inputPath = './public/input/';
const solutionPath = './src/solutions/';
const testPath = './src/tests/solutions/';
const sessionConfigPath = './util/session.json';
const solutionTemplatePath = './util/solutionTemplate.txt';
const testTemplatePath = './util/testTemplate.txt';
const templateRegex__DAY_TWO_LETTER_NUMBER__ = /__DAY_TWO_LETTER_NUMBER__/g;
const templateRegex__DAY_NUMBER__ = /__DAY_NUMBER__/g;
const templateRegex__TITLE__ = /__TITLE__/g;
const templateRegex__TEST_INPUT__ = /__TEST_INPUT__/g;
const templateRegex__TEST_EXPECTED_PART_1_RESULT__ = /__TEST_EXPECTED_PART_1_RESULT__/g;
const solutionFileRegex = /day[0-9]+\.ts/;
const solutionIndexRegex = /(?<=day)([0-9]+)(?=\.ts)/;
const editorExecutableName = 'code-insiders';

async function getNextSolutionIndex(): Promise<number> {
    let maxIndex = 0;
    const files = await fsAsync.readdir(solutionPath);
    for (const file of files.filter(x => x.match(solutionFileRegex))) {
        solutionIndexRegex.lastIndex = 0;
        const result = solutionIndexRegex.exec(file);
        if (!result) { continue; }

        const index = parseInt(result[0]);
        if (index >= maxIndex) {
            maxIndex = index;
        }
    }

    return maxIndex + 1;
}

async function readSessionKeyAsync(): Promise<string> {
    let sessionData: { sessionKey: string; } = { sessionKey: '' };
    try {
        if (!fs.existsSync(sessionConfigPath)) {
            await fsAsync.writeFile(sessionConfigPath, JSON.stringify(sessionData, null, 4), { encoding: 'utf-8' });
        }
        sessionData = JSON.parse(await fsAsync.readFile(sessionConfigPath, { encoding: 'utf-8' }));
    } catch (error) {
        console.log(error);
    }

    const key = sessionData.sessionKey;
    if (!key || key.length === 0) {
        console.warn(`


Fill your session key in util/session.json to use scaffolding features!


`);
    }

    return key;
}

function puzzleDataWebRequest(year: number, day: number, type: 'description' | 'input', sessionKey: string): Promise<string> {
    const path = type === 'description' ? `/${year}/day/${day}` : `/${year}/day/${day}/input`;
    const requestOptions = {
        hostname: 'adventofcode.com',
        path: path,
        method: 'GET',
        headers: { Cookie: `session=${sessionKey}` }
    };

    return new Promise((resolve, reject) => {
        let data = '';
        const req = https.get(requestOptions, res => {
            console.log(`Response for ${type}: ${res.statusCode}`);
            res.on('data', chunk => data += chunk.toString());
            res.on('end', () => resolve(data));
        });
        req.on('error', error => reject(error));
        req.end();
    });
}

function tryParsePuzzleTestData(page: string) {
    const $ = cheerio.load(page);
    const testInputCandidates = $('article:first-of-type pre code')
        .map((_, el) => ({
            hasExampleLabel: /example/i.test($(el).parent().prev().text()),
            contents: $(el).text()
        }))
        .toArray();
    // Take the first block that has an 'example' sentence before it, or the first one without if none found
    const testInput = (testInputCandidates.filter(x => x.hasExampleLabel)[0]
        ?? testInputCandidates[0])?.contents.trim();

    const expectedResultCandidates = $('article:first-of-type em')
        .map((_, el) => $(el).text())
        .toArray();
    // Take the last block that does not end with a question
    const expectedPart1Result = expectedResultCandidates
        .filter(x => /^.*(?<!\?\s*)$/.test(x))
        .slice(-1)[0]?.trim();

    return { testInput, expectedPart1Result };
}

async function tryLoadPuzzleDataFromWeb(year: number, dayNumber: number) {
    const webTitleRegex = /(?<=.*: )(.*)(?= ---)/g;
    let title: string = undefined;
    let input: string = undefined;
    let testInput: string = undefined;
    let expectedPart1Result: string = undefined;

    const sessionKey = await readSessionKeyAsync();
    if (sessionKey) {
        console.log('Session key loaded. Asking adventofcode.com for details...');
        try {
            const page = await puzzleDataWebRequest(year, dayNumber, 'description', sessionKey);
            const $ = cheerio.load(page);
            title = $('h2').first().text().match(webTitleRegex)[0];
            input = await puzzleDataWebRequest(year, dayNumber, 'input', sessionKey);
            ({ testInput, expectedPart1Result } = tryParsePuzzleTestData(page));
        } catch (error) {
            console.log('Could not get puzzle data from adventofcode.com.');
            console.log(error);
        }
        console.log(`--- Day ${dayNumber}: ${title} ---`);
    } else {
        console.log(`--- Fill config to load puzzle data from web: ${sessionConfigPath} ---`);
    }
    return { title, input, testInput, expectedPart1Result };
}

function fillTemplate(
    template: string, dayNumber: number, twoDigitDayNumber: string, title: string,
    testInput = '', testExpectedPart1Result = ''
): string {
    return template
        .replace(templateRegex__DAY_NUMBER__, dayNumber.toString())
        .replace(templateRegex__DAY_TWO_LETTER_NUMBER__, twoDigitDayNumber)
        .replace(templateRegex__TITLE__, title)
        .replace(templateRegex__TEST_INPUT__, testInput)
        .replace(templateRegex__TEST_EXPECTED_PART_1_RESULT__, testExpectedPart1Result);
}

async function createNewSolutionFilesAsync(dayNumber: number | undefined, year: number) {
    dayNumber = dayNumber ?? await getNextSolutionIndex();

    console.log(`Scaffolding day ${dayNumber} of ${year}.`);
    const twoDigitDayNumber = dayNumber.toString().padStart(2, '0');
    const newSourcePath = `${solutionPath}day${twoDigitDayNumber}.ts`;
    const newInputPath = `${inputPath}day${twoDigitDayNumber}.txt`;
    const newTestPath = `${testPath}day${twoDigitDayNumber}.spec.ts`;

    let { title, input, testInput, expectedPart1Result } = await tryLoadPuzzleDataFromWeb(year, dayNumber);
    title = title ?? `Day${twoDigitDayNumber}Title`;
    input = input ?? `Day${twoDigitDayNumber}Input`;
    testInput = testInput ?? '';
    testInput = testInput.length === 0 || testInput.includes('\n') ? `\`\n${testInput}\`` : `'${testInput}'`;
    expectedPart1Result = expectedPart1Result ?? `Day${twoDigitDayNumber}Part1`;

    console.log('Opening puzzle page...');
    void runChildProcessAsync(`explorer "https://adventofcode.com/${year}/day/${dayNumber}"`, false);

    console.log(`Saving input file: ${newInputPath}`);
    await fsAsync.writeFile(newInputPath, input, { encoding: 'utf-8' });

    console.log(`Creating new solution file: ${newSourcePath}`);
    const solutionTemplate = await fsAsync.readFile(solutionTemplatePath, { encoding: 'utf-8' });
    const solutionContents = fillTemplate(solutionTemplate, dayNumber, twoDigitDayNumber, title);
    await fsAsync.writeFile(newSourcePath, solutionContents, { encoding: 'utf-8' });

    console.log(`Updating index: ${solutionPath}index.ts`);
    await runChildProcessAsync('npm run generate-index', false);

    console.log(`Creating new test file: ${newTestPath}`);
    const testTemplate = await fsAsync.readFile(testTemplatePath, { encoding: 'utf-8' });
    const testContents = fillTemplate(testTemplate, dayNumber, twoDigitDayNumber, title, testInput, expectedPart1Result);
    await fsAsync.writeFile(newTestPath, testContents, { encoding: 'utf-8' });

    console.log('Opening generated files in vs code...');
    for (const filePath of [newInputPath, newTestPath, newSourcePath]) {
        await runChildProcessAsync(`${editorExecutableName} ${filePath}`, false);
    }

    console.log('Done.');
}

async function parseArgs() {
    const parser = new ArgumentParser({
        description: 'Scaffold solutions',
        add_help: true,
    });

    parser.add_argument('-y', '--year', {
        help: 'Puzzle year. Used for picking puzzles from adventofcode.com. Default: 2021.',
        default: 2021, type: 'int'
    });
    parser.add_argument('days', {
        help: 'Scaffold a single day or multiple days.',
        metavar: 'days', default: undefined, type: 'int', nargs: '*'
    });
    const args = parser.parse_args();

    let days: number[];
    if (args.days && args.days.length > 0) {
        days = args.days;
        console.log(`Scaffolding solutions for day(s): ${days.join(', ')}`);
    } else {
        days = [undefined];
        console.log('Scaffolding solution for first available day.');
    }

    for (const day of days) {
        await createNewSolutionFilesAsync(day, args.year);
    }
}

/** Testing purposes */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function cachePages() {
    const until = 10;
    // const sessionKey = await readSessionKeyAsync();
    // for (let i = 1; i <= until; i++) {
    //     const page = await puzzleDataWebRequest(2021, i, 'description', sessionKey);
    //     fs.writeFileSync(`util/temp/page${i.toString().padStart(2, '0')}.html`, page, { encoding: 'utf-8' });
    // }

    for (let i = 1; i <= until; i++) {
        console.log('\n----------');
        console.log(`page ${i}`);
        console.log('----------');
        const page = fs.readFileSync(`util/temp/page${i.toString().padStart(2, '0')}.html`, { encoding: 'utf-8' });
        const result = tryParsePuzzleTestData(page);
        console.log(result);
    }
}

parseArgs();
