import { Day25 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day25 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day25);

    describe('for test input', function () {
        beforeAll(setupSolution(`
v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`));

        it('solves part 1', expectedResult(1, '58'));
        it('solves part 2', expectedResult(2, '*'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '424'));
        it('solves part 2', expectedResult(2, '*'));
    });
});
