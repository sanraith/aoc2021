import { Day17 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day17 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day17);

    describe('for test input', function () {
        beforeAll(setupSolution('target area: x=20..30, y=-10..-5'));

        it('solves part 1', expectedResult(1, '45'));
        it('solves part 2', expectedResult(2, '112'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '7626'));
        it('solves part 2', expectedResult(2, '2032'));
    });
});
