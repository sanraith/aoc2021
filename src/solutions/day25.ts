import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Point = { x: number; y: number; };
type Grid = { map: number[][]; width: number; height: number; };
const directions: readonly Point[] = [[1, 0], [0, 1], [-1, 0], [0, -1]].map(([x, y]) => ({ x, y }));

@solutionInfo({
    day: 25,
    title: 'Sea Cucumber'
})
export class Day25 extends SolutionBase {

    protected part1(): number {
        const input = this.parseInput();
        const { grid } = input;
        let { grid: { map }, herds } = input;

        let step = 0;
        let maxMoveCount: number | null = null;
        let moveCount = 1;
        while (moveCount > 0) {
            step++;
            moveCount = 0;
            herds.forEach((herd, herdIndex) => {
                const nextHerds: typeof herds = [[], []];
                const nextMap: typeof map = Array(grid.height).fill(0).map(() => Array(grid.width));
                const otherHerdIndex = (herdIndex + 1) % 2;
                nextHerds[otherHerdIndex] = herds[otherHerdIndex].slice();
                nextHerds[otherHerdIndex].forEach(p => nextMap[p.y][p.x] = otherHerdIndex);

                for (const cucumber of herd) {
                    const target = this.add(cucumber, directions[herdIndex], grid);
                    const { x, y } = target;
                    if (map[y][x] === undefined) {
                        nextMap[y][x] = herdIndex;
                        nextHerds[herdIndex].push(target);
                        moveCount++;
                    } else {
                        nextMap[cucumber.y][cucumber.x] = herdIndex;
                        nextHerds[herdIndex].push(cucumber);
                    }
                }
                map = nextMap;
                herds = nextHerds;
            });

            maxMoveCount = Math.max(moveCount, maxMoveCount ?? 0);
            this.updateProgress((maxMoveCount - moveCount) / maxMoveCount);
        }

        return step;
    }

    protected part2(): string { return '*'; }

    private add(p1: Point, p2: Point, grid: Grid): Point {
        return {
            x: (p1.x + p2.x) % grid.width,
            y: (p1.y + p2.y) % grid.height
        };
    }

    private visualize(map: number[][], grid: Grid) {
        for (let y = 0; y < grid.height; y++) {
            let line = '';
            for (let x = 0; x < grid.width; x++) {
                line += map[y][x] === undefined ? '.' : map[y][x] === 0 ? '>' : 'v';
            }
            console.log(line);
        }
    }

    private parseInput() {
        const width = this.inputLines[0].length;
        const height = this.inputLines.length;
        const map = Array(height).fill(0).map(() => Array(width));
        const herds: Point[][] = [[], []];

        this.inputLines.forEach((line, y) => {
            line.split('').forEach((cell, x) => {
                if (cell !== '.') {
                    const herdIndex = cell === '>' ? 0 : 1;
                    map[y][x] = herdIndex;
                    herds[herdIndex].push({ x, y });
                }
            });
        });

        return { herds, grid: { map, width, height } };
    }
}
