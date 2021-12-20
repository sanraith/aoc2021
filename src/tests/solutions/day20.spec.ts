import { Day20 } from '../../solutions';
import { fixtureSetup } from '../testHelper';

describe('Day20 solution', function () {
    const { setupSolution, expectedResult } = fixtureSetup(Day20);

    describe('for test input', function () {
        beforeAll(setupSolution(`
..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##
#..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###
.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.
.#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....
.#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..
...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....
..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

#..#.
#....
##..#
..#..
..###`));

        it('solves part 1', expectedResult(1, '35'));
        it('solves part 2', expectedResult(2, '3351'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        it('solves part 1', expectedResult(1, '5400'));
        it('solves part 2', expectedResult(2, '18989'));
    });
});
