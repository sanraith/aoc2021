import { Day11 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day11 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day11);

    describe('for test input', function () {
        beforeAll(setupSolution(`
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`));

        it('solves part 1', expectedResult(1, '1656'));
        it('solves part 2', expectedResult(2, '195'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '1739'));
        it('solves part 2', expectedResult(2, '324'));
    });
});
