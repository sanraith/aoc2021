import { Subscription } from 'rxjs';
import { EventDispatcher, IEvent } from 'strongly-typed-events';
import { SolutionInfo } from '../core/solutionInfo';
import solutionManager from '../core/solutionManager';
import { SolutionCanceled, SolutionNotStarted, SolutionProgress, SolutionState } from '../core/solutionState';
import InputService from './input.service';
import WorkerService from './worker.service';


interface RuntimeSolution {
    info: SolutionInfo,
    states: [SolutionState, SolutionState];
    startTimes: [number | null, number | null];

    onChange: IEvent<RuntimeSolution, void>;
    start: () => Promise<void>;
    cancel: () => void;
}

interface RuntimeSolutionInternal extends RuntimeSolution {
    onChange: EventDispatcher<RuntimeSolutionInternal, void>;
    subscription: Subscription | null;
}

export default class RuntimeSolutionService {

    private _runtimeSolutions = new Map<number, RuntimeSolutionInternal>();
    get runtimeSolutions(): Map<number, RuntimeSolution> { return this._runtimeSolutions; }

    constructor(
        private inputService: InputService,
        private workerService: WorkerService
    ) {
        for (const [day, info] of solutionManager.getSolutionsByDay().entries()) {
            this._runtimeSolutions.set(day, {
                info: info,
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
        const input = await this.inputService.getInput(day);
        if (!input) { throw new Error(`Could not find input for day ${day}!`); }

        const runtimeSolution = this._runtimeSolutions.get(day);
        if (!runtimeSolution) { throw new Error(`Could not find runtimeState for day ${day}!`); }

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