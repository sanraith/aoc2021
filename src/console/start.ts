import { ArgumentParser } from 'argparse';
import { lastValueFrom, tap } from 'rxjs';
import solutionManager from '../core/solutionManager';
import { SolutionError, SolutionResult } from '../core/solutionState';
import FileInputManager from './fileInputManager';

let lastConsoleLineLength = 0;

function consoleRewrite(message: string, newLine = false) {
    process.stdout.write('\r'.padEnd(lastConsoleLineLength, ' '));
    lastConsoleLineLength = message.length + 1;
    process.stdout.write('\r' + message + (newLine ? '\n' : ''));
}

function consoleRewriteLine(message: string) {
    consoleRewrite(message, true);
}

async function app(days: number[]) {
    try {
        const inputManager = new FileInputManager();
        let totalTime = 0;

        for (const day of days) {
            const solutionInfo = solutionManager.getSolutionsByDay().get(day);
            if (!solutionInfo) {
                console.log(`No solution found for day ${day}!`);
                continue;
            }

            const solution = solutionInfo.create();
            const input = await inputManager.loadInputAsync(solutionInfo.day);
            solution.init(input);
            solution.minTimeBetweenUpdatesMs = 150;

            console.log(`Day ${solutionInfo.day} - ${solutionInfo.title}`);
            for (const part of [1, 2] as const) {
                consoleRewrite(`Part ${part}...`);
                const solutionObservable = solution.solveWithProgress(part).pipe(tap(state => {
                    if (state.kind === 'progress') {
                        consoleRewrite(`Part ${part} (${state.timeMs}+ ms): ${(state.progress * 100).toFixed(2)} %`);
                    }
                }));
                const state = await lastValueFrom(solutionObservable) as SolutionResult | SolutionError;
                let result = state.kind === 'result' ? state.result ?? '' : `(!) ${state.message}`;
                result = /\n/g.test(result) ? `\n${result}` : result;
                consoleRewriteLine(`Part ${part} (${state.timeMs} ms): ${result}`);
                totalTime += state.timeMs;
            }
            console.log();
        }

        console.log(`Total time: ${(totalTime / 1000).toFixed(3)} seconds.\n`);
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

async function parseArgs() {
    const parser = new ArgumentParser({
        description: 'Advent of Code 2021 solutions in Typescript',
        add_help: true,
    });

    parser.add_argument('-d', '--days', { help: 'Solve a single day or multiple days.', type: 'int', nargs: '+' });
    parser.add_argument('-a', '--all', { help: 'Solve all days.', action: 'store_true' });
    parser.add_argument('-l', '--last', { help: 'Solve the last available day.', action: 'store_true' });

    const args = parser.parse_args();
    let days: number[] = [];

    if (args.days) {
        days = args.days;
        console.log(`Running solutions for day(s): ${days.join(', ')}`);
    } else if (args.last) {
        days = [Array.from(solutionManager.getSolutionsByDay().keys()).sort((a, b) => b - a)[0]];
        console.log(`Running last available day: ${days[0]}`);
    } else {
        console.log('Running all available solutions.');
        days = Array.from(solutionManager.getSolutionsByDay().keys()).sort((a, b) => a - b);
    }

    if (!days || days.length === 0 || days.some(x => x === undefined)) {
        console.log('No solutions are available.');
        return;
    }

    await app(days);
}

parseArgs();
