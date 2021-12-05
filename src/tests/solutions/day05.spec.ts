import { Day05 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day05 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day05);

    describe('for test input', function () {
        beforeAll(setupSolution(`0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`));

        it('solves part 1', expectedResult(1, '5'));
        xit('solves part 2', expectedResult(2, 'Day05Part2'));
    });

    xdescribe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, 'Day05Part2'));
        it('solves part 2', expectedResult(2, 'Day05Part2'));
    });
});
