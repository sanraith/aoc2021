import { Day13 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day13 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day13);

    describe('for test input', function () {
        beforeAll(setupSolution(`
6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`));

        it('solves part 1', expectedResult(1, '17'));
        it('solves part 2', expectedResult(2, `
#####
#   #
#   #
#   #
#####`));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '693'));
        it('solves part 2', expectedResult(2, `
#  #  ##  #    #### ###   ##  #### #  #
#  # #  # #       # #  # #  #    # #  #
#  # #    #      #  #  # #  #   #  #  #
#  # #    #     #   ###  ####  #   #  #
#  # #  # #    #    # #  #  # #    #  #
 ##   ##  #### #### #  # #  # ####  ## `));
    });
});
