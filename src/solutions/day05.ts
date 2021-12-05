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
        const coords = this.parsePipes();
        const map = this.createMap(coords);
        const strmap = map.map(line => line.map(x => x === 0 ? '.' : x.toString()).join(''));

        const overlapCount = map.reduce((a, x) => a +
            x.reduce((a, x) => a + (x > 1 ? 1 : 0), 0), 0);

        return overlapCount; // not 6736
    }

    protected part2(): string | number {
        this.noSolution();
    }

    private createMap(pipes: Pipe[]): number[][] {
        const map: number[][] = [];
        for (let { x1, y1, x2, y2 } of pipes) {
            if (x1 !== x2 && y1 !== y2) { continue; }

            [y1, y2] = [y1, y2].sort();
            [x1, x2] = [x1, x2].sort();
            for (let y = y1; y <= y2; y++) {
                for (let x = x1; x <= x2; x++) {
                    if (map[y] === undefined) { map[y] = []; }
                    if (map[y][x] === undefined) { map[y][x] = 0; }
                    map[y][x]++;
                }
            }
        }

        return map;
    }

    private parsePipes() {
        return regexMatches(/(\d+),(\d+) -> (\d+),(\d+)/g, this.input).map(match => {
            const [x1, y1, x2, y2] = match.slice(1).map(x => parseInt(x));
            return { x1, y1, x2, y2 };
        });
    }
}
