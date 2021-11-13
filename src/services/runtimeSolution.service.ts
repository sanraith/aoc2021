import { EventDispatcher, IEvent } from 'strongly-typed-events';
import { SolutionInfo } from '../core/solutionInfo';
import solutionManager from '../core/solutionManager';
import { SolutionState } from '../core/solutionState';
import InputService from './input.service';
import WorkerService from './worker.service';


interface RuntimeSolution {
    info: SolutionInfo,
    states: [SolutionState | null, SolutionState | null];
    onChange: IEvent<RuntimeSolution, string>;
    start: () => Promise<void>;
    cancel: () => void;
}

export default class RuntimeSolutionService {

    runtimeSolutions = new Map<number, RuntimeSolution>();

    constructor(
        private inputService: InputService,
        private workerService: WorkerService
    ) {
        for (const [day, info] of solutionManager.getSolutionsByDay().entries()) {
            this.runtimeSolutions.set(day, {
                info: info,
                states: [null, null],
                onChange: new EventDispatcher<RuntimeSolution, string>(),
                start: () => this.start(day),
                cancel: () => { }
            });
        }
    }

    private async start(day: number): Promise<void> {
        const input = await this.inputService.getInput(day);
        if (!input) { throw new Error(`Could not find input for day ${day}!`); }

        const runtimeState = this.runtimeSolutions.get(day);
        if (!runtimeState) { throw new Error(`Could not find runtimeState for day ${day}!`); }

        // TODO unsub, cancel
        this.workerService.solveAsync(day, input).subscribe({
            next: state => {
                runtimeState.states[state.part] = state;
                (runtimeState.onChange as EventDispatcher<RuntimeSolution, string>).dispatch(runtimeState, 'update');
            },
            complete: () => (runtimeState.onChange as EventDispatcher<RuntimeSolution, string>).dispatch(runtimeState, 'update')
        });
    }
}