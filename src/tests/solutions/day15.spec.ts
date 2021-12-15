import { Day15 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day15 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day15);

    describe('for test input', function () {
        beforeAll(setupSolution(`
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`));

        it('solves part 1', expectedResult(1, '40'));
        it('solves part 2', expectedResult(2, '315'));
    });

    describe('for input with up and left steps', function () {
        beforeAll(setupSolution(`
199999911111111111
199999919999999991
199999919999999991
199999911111999991
199999999991999991
199999999991999991
111111111111999991`));

        it('solves part 1', expectedResult(1, '43'));
        it('solves part 2', expectedResult(2, '417'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '447'));
        it('solves part 2', expectedResult(2, '2825'));
    });
});
