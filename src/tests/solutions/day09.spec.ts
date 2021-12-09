import { Day09 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day09 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day09);

    describe('for test input', function () {
        beforeAll(setupSolution(`2199943210
3987894921
9856789892
8767896789
9899965678`));

        it('solves part 1', expectedResult(1, '15'));
        it('solves part 2', expectedResult(2, '1134'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '566'));
        it('solves part 2', expectedResult(2, '891684'));
    });
});
