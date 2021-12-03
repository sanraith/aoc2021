import { Day03 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day03 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day03);

    describe('for test input', function () {
        beforeAll(setupSolution(`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`));

        it('solves part 1', expectedResult(1, '198'));
        it('solves part 2', expectedResult(2, '230'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '3985686'));
        it('solves part 2', expectedResult(2, '2555739'));
    });
});
