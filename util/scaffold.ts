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
const solutionFileRegex = /day[0-9]+\.ts/;
const solutionIndexRegex = /(?<=day)([0-9]+)(?=\.ts)/;

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
        throw new Error(`


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

async function tryLoadPuzzleDataFromWeb(year: number, dayNumber: number) {
    const webTitleRegex = /(?<=.*: )(.*)(?= ---)/g;
    let title = undefined;
    let input = undefined;

    const sessionKey = await readSessionKeyAsync();
    if (sessionKey) {
        console.log('Session key loaded. Asking adventofcode.com for details...');
        try {
            const page = await puzzleDataWebRequest(year, dayNumber, 'description', sessionKey);
            const $ = cheerio.load(page);
            title = $('h2').first().text().match(webTitleRegex)[0];
            input = await puzzleDataWebRequest(year, dayNumber, 'input', sessionKey);
        } catch (error) {
            console.log('Could not get puzzle data from adventofcode.com.');
            console.log(error);
        }
        console.log(`--- ${dayNumber} ${title} ---`);
    } else {
        console.log(`--- Fill config to load puzzle data from web: ${sessionConfigPath} ---`);
    }
    return { title, input };
}

function fillTemplate(template: string, dayNumber: number, twoDigitDayNumber: string, title: string): string {
    return template
        .replace(templateRegex__DAY_NUMBER__, dayNumber.toString())
        .replace(templateRegex__DAY_TWO_LETTER_NUMBER__, twoDigitDayNumber)
        .replace(templateRegex__TITLE__, title);
}

async function createNewSolutionFilesAsync(dayNumber?: number, year = 2020/* TODO update to 2021 */) {
    dayNumber = dayNumber ?? await getNextSolutionIndex();

    console.log(`Scaffolding day ${dayNumber} of ${year}.`);
    const twoDigitDayNumber = dayNumber.toString().padStart(2, '0');
    const newSourcePath = `${solutionPath}day${twoDigitDayNumber}.ts`;
    const newInputPath = `${inputPath}day${twoDigitDayNumber}.txt`;
    const newTestPath = `${testPath}day${twoDigitDayNumber}.spec.ts`;

    let { title, input } = await tryLoadPuzzleDataFromWeb(year, dayNumber);
    title = title ?? `Day${twoDigitDayNumber}Title`;
    input = input ?? `Day${twoDigitDayNumber}Input`;

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
    const testContents = fillTemplate(testTemplate, dayNumber, twoDigitDayNumber, title);
    await fsAsync.writeFile(newTestPath, testContents, { encoding: 'utf-8' });

    console.log('Opening generated files in vs code...');
    for (const filePath of [newInputPath, newTestPath, newSourcePath]) {
        await runChildProcessAsync(`code-insiders ${filePath}`);
    }

    console.log('Done.');
}

async function parseArgs() {
    const parser = new ArgumentParser({
        description: 'Scaffold solutions',
        add_help: true,
    });

    parser.add_argument('-y', '--year', {
        help: 'Puzzle year. Used for picking puzzles from adventofcode.com. Default: 2020.',
        default: 2020, type: 'int'
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

parseArgs();
