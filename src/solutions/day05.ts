import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

interface Pipe { x1: number; y1: number; x2: number; y2: number; }

@solutionInfo({
    day: 5,
    title: 'Hydrothermal Venture'
})
export class Day05 extends SolutionBase {

    protected part1(): number {
        const pipes = this.parsePipes();
        const map = this.createMap(pipes, 'skip diagonals');
        const overlapCount = this.countOverlaps(map);

        return overlapCount;
    }

    protected part2(): number {
        const pipes = this.parsePipes();
        const map = this.createMap(pipes, 'include diagonals');
        const overlapCount = this.countOverlaps(map);

        return overlapCount;
    }

    private countOverlaps(map: number[][]): number {
        return map.reduce((a, row) => a + row.reduce((a, x) => a + (x > 1 ? 1 : 0), 0), 0);
    }

    private createMap(pipes: Pipe[], mode: 'skip diagonals' | 'include diagonals'): number[][] {
        const map: number[][] = [];
        const skipDiagonals = mode === 'skip diagonals';
        for (const { x1, y1, x2, y2 } of pipes) {
            if (skipDiagonals && x1 !== x2 && y1 !== y2) {
                continue;
            }
            this.drawLine(map, x1, y1, x2, y2);
        }

        return map;
    }

    private drawLine(map: number[][], x1: number, y1: number, x2: number, y2: number) {
        const dx = Math.sign(x2 - x1);
        const dy = Math.sign(y2 - y1);

        let [x, y] = [null, null] as (number | null)[];
        while (x !== x2 || y !== y2) {
            x = (x ?? x1 - dx) + dx;
            y = (y ?? y1 - dy) + dy;

            if (map[y] === undefined) { map[y] = []; }
            if (map[y][x] === undefined) { map[y][x] = 0; }
            map[y][x]++;
        }
    }

    private parsePipes(): Pipe[] {
        return regexMatches(/(\d+),(\d+) -> (\d+),(\d+)/g, this.input).map(match => {
            const [x1, y1, x2, y2] = match.slice(1).map(x => parseInt(x));
            return { x1, y1, x2, y2 };
        });
    }
}
