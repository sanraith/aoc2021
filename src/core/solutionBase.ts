import { lastValueFrom, Observable, Subscriber } from 'rxjs';
import { Stopwatch } from 'ts-stopwatch';
import { SolutionError, SolutionProgress, SolutionResult, SolutionState } from './solutionState';

interface CurrentSolution {
    subscriber: Subscriber<SolutionState>;
    activePart: number;
    progressStopwatch: Stopwatch;
    stopwatch: Stopwatch;
}

export default abstract class SolutionBase {
    minTimeBetweenUpdatesMs = 20;

    protected visualizationData?: unknown;
    protected get input(): string { return this._input ?? ''; }
    protected get inputLines(): string[] {
        if (this._inputLines === undefined) {
            this._inputLines = this.parseInputLines(this.input);
        }
        return this._inputLines;
    }

    private _input?: string;
    private _inputLines?: string[];
    private currentSolution?: CurrentSolution;

    init(input: string): this {
        this._input = input;
        return this;
    }

    async solveAsync(part: 1 | 2): Promise<string | null> {
        const state = await lastValueFrom(this.solveWithProgress(part));
        switch (state.kind) {
            case 'result': return state.result;
            default: return null;
        }
    }

    solveWithProgress(part: 1 | 2): Observable<SolutionState> {
        return new Observable<SolutionState>(subscriber => {
            if (!this._input) {
                subscriber.error(new SolutionError(part, 'No input provided!'));
                return;
            }
            if (this.currentSolution) {
                subscriber.error(new SolutionError(part, 'Another solution is already in progress!'));
                return;
            }

            const partFunction = part === 1 ? this.part1 : this.part2;
            this.currentSolution = {
                activePart: part,
                subscriber: subscriber,
                stopwatch: new Stopwatch(),
                progressStopwatch: new Stopwatch()
            };
            this.visualizationData = null;
            this.currentSolution.stopwatch.start();
            this.currentSolution.progressStopwatch.start();

            try {
                const result = partFunction.apply(this) + '';
                const timeMs = this.currentSolution.stopwatch.stop();
                const resultPack = new SolutionResult(part, result, timeMs, this.visualizationData);
                subscriber.next(resultPack);
            } catch (exception) {
                const timeMs = this.currentSolution.stopwatch.stop() ?? 0;
                subscriber.next(new SolutionError(part, exception + '', timeMs));
            } finally {
                subscriber.complete();
                this.visualizationData = null;
                this.currentSolution = undefined;
            }
        });
    }

    protected abstract part1(): string | number;

    protected abstract part2(): string | number;

    protected updateProgress(progress: number): void {
        const current = this.currentSolution;
        if (current && current.progressStopwatch.getTime() > this.minTimeBetweenUpdatesMs) {
            current.subscriber.next(
                new SolutionProgress(current.activePart, progress, current.stopwatch.getTime())
            );
            current.progressStopwatch.start(true);
        }
    }

    protected noSolution(msg?: string): never {
        throw new Error(msg);
    }

    private parseInputLines(input: string): string[] {
        const newLineRegex = /\r\n?|\n/g;
        const inputLines = input.split(newLineRegex);

        let emptyCount: number;
        const whiteSpaceLineRegex = /^\s*$/gm;
        for (emptyCount = 0; emptyCount < inputLines.length; emptyCount++) {
            const line = inputLines[inputLines.length - emptyCount - 1];
            if (!whiteSpaceLineRegex.test(line)) {
                break;
            }
        }
        inputLines.splice(inputLines.length - emptyCount, emptyCount);

        return inputLines;
    }
}