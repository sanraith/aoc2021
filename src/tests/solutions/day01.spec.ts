import { Day01 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day01 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day01);

    describe('for test input', function () {
        beforeAll(setupSolution(`
199
200
208
210
200
207
240
269
260
263`));

        it('solves part 1', expectedResult(1, '7'));
        it('solves part 2', expectedResult(2, '5'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '1292'));
        it('solves part 2', expectedResult(2, '1262'));
    });
});
