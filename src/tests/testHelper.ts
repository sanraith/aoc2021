import FileInputManager from '../console/fileInputManager';
import SolutionBase from '../core/solutionBase';
import { Constructor } from '../core/solutionInfo';
import solutionManager from '../core/solutionManager';

const fileInputManager = new FileInputManager();

interface FixtureSetup {
    setupSolution: (input?: string | undefined) => () => Promise<void>;
    expectedResult: (part: 1 | 2, result: string) => () => Promise<void>;
}

function fixtureSetup(type: Constructor<SolutionBase>): FixtureSetup {
    let solution: SolutionBase | null = null;

    return {
        setupSolution: (input: string | undefined) => async () => {
            const solutionInfo = solutionManager.getSolutions().find(x => x.ctor === type)!;
            const solutionInstance = solutionInfo.create();
            input = input ?? await fileInputManager.loadInputAsync(solutionInfo.day);
            solutionInstance.init(input);
            solution = solutionInstance;
        },
        expectedResult: (part: 1 | 2, result: string) => async () => {
            expect(solution).toBeTruthy();
            expect(await solution!.solveAsync(part)).toEqual(result);
        }
    };
}

export {
    fixtureSetup
};

