import { Day06 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day06 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day06);

    describe('for test input', function () {
        beforeAll(setupSolution('3,4,3,1,2'));

        it('solves part 1', expectedResult(1, '5934'));
        it('solves part 2', expectedResult(2, '26984457539'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '365131'));
        it('solves part 2', expectedResult(2, '1650309278600'));
    });
});
