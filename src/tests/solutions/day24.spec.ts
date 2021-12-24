import { Day24 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day24 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day24);

    describe('for test input', function () {
        beforeAll(setupSolution(''));

        xit('solves part 1', expectedResult(1, 'Day24Part1'));
        xit('solves part 2', expectedResult(2, 'Day24Part2'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        xit('solves part 1', expectedResult(1, 'Day24Part1'));
        xit('solves part 2', expectedResult(2, 'Day24Part2'));
    });
});
