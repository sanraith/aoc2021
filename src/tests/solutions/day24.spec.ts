import { Day24 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day24 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day24);

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '93997999296912'));
        it('solves part 2', expectedResult(2, '81111379141811'));
    });
});
