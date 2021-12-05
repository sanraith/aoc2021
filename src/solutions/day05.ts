import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

interface Pipe { x1: number, y1: number, x2: number, y2: number; }

@solutionInfo({
    day: 5,
    title: 'Hydrothermal Venture'
})
export class Day05 extends SolutionBase {

    protected part1(): string | number {
        const pipes = this.parsePipes();
        const map = this.createMap(pipes, 'skip diagonals');
        const overlapCount = map.reduce((a, x) => a +
            x.reduce((a, x) => a + (x > 1 ? 1 : 0), 0), 0);

        return overlapCount;
    }

    protected part2(): string | number {
        const pipes = this.parsePipes();
        const map = this.createMap(pipes, 'include diagonals');
        const overlapCount = map.reduce((a, row) => a +
            row.reduce((a, x) => a + (x > 1 ? 1 : 0), 0), 0);

        return overlapCount;
    }

    private createMap(pipes: Pipe[], mode: 'skip diagonals' | 'include diagonals'): number[][] {
        const map: number[][] = [];
        const skipDiagonals = mode === 'skip diagonals';
        for (const { x1, y1, x2, y2 } of pipes) {
            const isDiagonal = x1 !== x2 && y1 !== y2;
            if (isDiagonal) {
                if (skipDiagonals) { continue; }
                const yCoords = [...this.iterate(y1, y2)];
                const xCoords = [...this.iterate(x1, x2)];
                const coords = yCoords.map((y, i) => ({ x: xCoords[i], y }));
                for (const { x, y } of coords) {
                    if (map[y] === undefined) { map[y] = []; }
                    if (map[y][x] === undefined) { map[y][x] = 0; }
                    map[y][x]++;
                }
            } else {
                for (const y of this.iterate(y1, y2)) {
                    for (const x of this.iterate(x1, x2)) {
                        if (map[y] === undefined) { map[y] = []; }
                        if (map[y][x] === undefined) { map[y][x] = 0; }
                        map[y][x]++;
                    }
                }
            }
        }

        return map;
    }

    private *iterate(from: number, to: number) {
        if (to >= from) {
            for (let i = from; i <= to; i++) {
                yield i;
            }
        } else {
            for (let i = from; i >= to; i--) {
                yield i;
            }
        }
    }

    private parsePipes(): Pipe[] {
        return regexMatches(/(\d+),(\d+) -> (\d+),(\d+)/g, this.input).map(match => {
            const [x1, y1, x2, y2] = match.slice(1).map(x => parseInt(x));
            return { x1, y1, x2, y2 };
        });
    }
}
