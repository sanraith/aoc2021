import { Day12 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day12 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day12);

    describe('for test input', function () {
        beforeAll(setupSolution(`
start-A
start-b
A-c
A-b
b-d
A-end
b-end`));

        it('solves part 1', expectedResult(1, '10'));
        xit('solves part 2', expectedResult(2, 'Day12Part2'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        xit('solves part 1', expectedResult(1, 'Day12Part1'));
        xit('solves part 2', expectedResult(2, 'Day12Part2'));
    });
});
