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
        xit('solves part 2', expectedResult(2, 'Day15Part2'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        xit('solves part 1', expectedResult(1, 'Day15Part1'));
        xit('solves part 2', expectedResult(2, 'Day15Part2'));
    });
});
