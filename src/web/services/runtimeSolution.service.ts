import { Subscription } from 'rxjs';
import { EventDispatcher, IEvent } from 'strongly-typed-events';
import { SolutionInfo } from '../../core/solutionInfo';
import solutionManager from '../../core/solutionManager';
import { SolutionCanceled, SolutionNotStarted, SolutionProgress, SolutionState } from '../../core/solutionState';
import InputService from './input.service';
import WorkerService from './worker.service';


export interface RuntimeSolution {
    /** Static information about the solution. */
    info: SolutionInfo,
    /** Input for the solution. */
    input: string | null,
    /** The last known state of each solution part. */
    states: [SolutionState, SolutionState];
    /** The date in milliseconds when each solution part has started. */
    startTimes: [number | null, number | null];
    /** Fired when the states or start times have changed. */
    onChange: IEvent<RuntimeSolution, void>;
    /** Starts the solution in a background webworker. */
    start: () => Promise<void>;
    /** Cancels an ongoing solution if there is any. */
    cancel: () => void;
}

interface RuntimeSolutionInternal extends RuntimeSolution {
    onChange: EventDispatcher<RuntimeSolutionInternal, void>;
    /** Subscription to the background worker while the solution is running. */
    subscription: Subscription | null;
    inputPromise: Promise<void> | null;
}

export default class RuntimeSolutionService {

    private _runtimeSolutions = new Map<number, RuntimeSolutionInternal>();
    get runtimeSolutions(): Map<number, RuntimeSolution> { return this._runtimeSolutions; }

    constructor(
        inputService: InputService,
        private workerService: WorkerService
    ) {
        for (const [day, info] of solutionManager.getSolutionsByDay().entries()) {
            this._runtimeSolutions.set(day, {
                info: info,
                input: null,
                inputPromise: inputService.getInput(day).then(x => {
                    const rs = this._runtimeSolutions.get(day)!;
                    rs.input = x ?? '';
                    rs.inputPromise = null;
                    rs.onChange.dispatch(rs);
                }),
                states: [new SolutionNotStarted(1), new SolutionNotStarted(2)],
                startTimes: [null, null],
                onChange: new EventDispatcher<RuntimeSolutionInternal, void>(),
                start: () => this.start(day),
                cancel: () => this.cancel(day),
                subscription: null
            });
        }
    }

    private async start(day: number): Promise<void> {
        const runtimeSolution = this._runtimeSolutions.get(day);
        if (!runtimeSolution) { throw new Error(`Could not find runtimeState for day ${day}!`); }

        if (runtimeSolution.inputPromise) {
            await runtimeSolution.inputPromise;
            if (runtimeSolution.input === null) { throw new Error(`Could not load input for day ${day}!`); }
        }
        const input = runtimeSolution.input!;

        if (runtimeSolution.subscription) {
            this.cancel(day);
        }

        runtimeSolution.startTimes = [new Date().getTime(), null];
        runtimeSolution.states = [new SolutionProgress(1, 0), new SolutionProgress(2, 0)];
        runtimeSolution.onChange.dispatch(runtimeSolution);

        runtimeSolution.subscription = this.workerService.solveAsync(day, input).subscribe({
            next: state => {
                if (state.kind === 'result' && state.part === 1) {
                    runtimeSolution.startTimes[1] = new Date().getTime();
                }
                runtimeSolution.states[state.part - 1] = state;
                runtimeSolution.onChange.dispatch(runtimeSolution);
            },
            complete: () => {
                runtimeSolution.subscription = null;
            }
        });
    }

    private cancel(day: number): void {
        const runtimeSolution = this._runtimeSolutions.get(day);
        if (!runtimeSolution) { throw new Error(`Could not find runtimeState for day ${day}!`); }

        runtimeSolution.states = runtimeSolution.states.map(s =>
            s.kind === 'progress' ? new SolutionCanceled(s.part, s.timeMs) : s
        ) as [SolutionState, SolutionState];
        runtimeSolution.onChange.dispatch(runtimeSolution);

        runtimeSolution.subscription?.unsubscribe();
    }
}