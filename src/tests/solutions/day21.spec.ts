import { Day21 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day21 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day21);

    describe('for test input', function () {
        beforeAll(setupSolution(`
Player 1 starting position: 4
Player 2 starting position: 8`));

        it('solves part 1', expectedResult(1, '739785'));
        it('solves part 2', expectedResult(2, '444356092776315'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '797160'));
        xit('solves part 2', expectedResult(2, 'Day21Part2'));
    });
});
