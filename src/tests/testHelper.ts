import FileInputManager from '../console/fileInputManager';
import SolutionBase from '../core/solutionBase';
import { Constructor } from '../core/solutionInfo';
import solutionManager from '../core/solutionManager';

const fileInputManager = new FileInputManager();
const emptyFirstLineRegex = /^\s*\n/;

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
            input = input !== undefined && emptyFirstLineRegex.test(input) ? input.replace(emptyFirstLineRegex, '') : input;
            input = input ?? await fileInputManager.loadInputAsync(solutionInfo.day);
            solutionInstance.init(input);
            solution = solutionInstance;
        },
        expectedResult: (part: 1 | 2, resultExpected: string) => async () => {
            if (emptyFirstLineRegex.test(resultExpected)) {
                resultExpected = resultExpected.replace(emptyFirstLineRegex, '');
            }
            expect(solution).toBeTruthy();
            const resultActual = await solution!.solveAsync(part);
            expect(resultActual).toEqual(resultExpected);
        }
    };
}

export {
    fixtureSetup
};

