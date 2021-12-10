import { Day02 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day02 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day02);

    describe('for test input', function () {
        beforeAll(setupSolution(`
forward 5
down 5
forward 8
up 3
down 8
forward 2`));

        it('solves part 1', expectedResult(1, '150'));
        it('solves part 2', expectedResult(2, '900'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '2091984'));
        it('solves part 2', expectedResult(2, '2086261056'));
    });
});
