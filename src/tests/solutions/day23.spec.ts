import { Day23 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day23 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day23);

    describe('for test input', function () {
        beforeAll(setupSolution(`
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########`));

        it('solves part 1', expectedResult(1, '12521'));
        it('solves part 2', expectedResult(2, '44169'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '13455'));
        it('solves part 2', expectedResult(2, '43567'));
    });
});
