import { Day07 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day07 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day07);

    describe('for test input', function () {
        beforeAll(setupSolution('16,1,2,0,4,2,7,1,2,14'));

        it('solves part 1', expectedResult(1, '37'));
        it('solves part 2', expectedResult(2, '168'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '356958'));
        it('solves part 2', expectedResult(2, '105461913'));
    });
});
