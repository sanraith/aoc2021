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
        xit('solves part 2', expectedResult(2, 'Day20Part2'));
    });

    describe('for puzzle input', function () {
        beforeAll(setupSolution());

        xit('solves part 1', expectedResult(1, 'Day20Part1'));
        xit('solves part 2', expectedResult(2, 'Day20Part2'));
    });
});
