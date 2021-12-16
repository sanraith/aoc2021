import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

class Point {
    constructor(public x: number, public y: number) { }
    add(other: Point): Point { return new Point(this.x + other.x, this.y + other.y); }
    isInBounds(width: number, height: number) { return this.x >= 0 && this.x < width && this.y >= 0 && this.y < height; }
    toString(): string { return `${this.x},${this.y}`; }
}
type Grid = { map: number[][]; width: number; height: number; };
const directions: readonly Point[] = [[1, 0], [0, 1], [-1, 0], [0, -1]].map(([x, y]) => new Point(x, y));

@solutionInfo({
    day: 15,
    title: 'Chiton'
})
export class Day15 extends SolutionBase {

    protected part1(): number {
        const grid = this.parseGrid();
        const distance = this.findShortestPathLength(grid);

        return distance;
    }

    protected part2(): string | number {
        const grid = this.enlargeGrid(this.parseGrid(), 5);
        const distance = this.findShortestPathLength(grid);

        return distance;
    }

    private findShortestPathLength(grid: Grid) {
        const { map, width, height } = grid;
        const length = width * height;
        const toIndex = (p: Point) => p.y * width + p.x;
        const toPoint = (i: number) => new Point(i % width, Math.floor(i / width));
        const startIndex = 0;
        const endIndex = length - 1;

        const nodes = Array(length).fill(0).map((_, i) => {
            const p = toPoint(i);
            const neighborIndexes = (directions.map(d =>
                p.add(d).isInBounds(width, height) ? toIndex(p.add(d)) : undefined!
            ).filter(x => x !== undefined)).sort((a, b) => a - b);

            return {
                index: i,
                value: map[p.y][p.x],
                outEdges: i === length - 1 ? [] : neighborIndexes,
                shortestDistance: i === 0 ? 0 : Number.MAX_SAFE_INTEGER
            };
        });

        let iteration = 0;
        const invalidated = new Set<number>([startIndex]);
        while (invalidated.size > 0) {
            this.updateProgress(Math.min(iteration++ / width, .99));
            const currentNodes = [...invalidated.values()].map(x => nodes[x]);
            invalidated.clear();

            for (const from of currentNodes) {
                for (const toIndex of from.outEdges) {
                    const to = nodes[toIndex];
                    const distance = from.shortestDistance + to.value;
                    if (distance < to.shortestDistance) {
                        to.shortestDistance = distance;
                        invalidated.add(to.index);
                        to.outEdges.forEach(x => invalidated.add(x));
                    }
                }
            }
        }

        return nodes[endIndex].shortestDistance;
    }

    private enlargeGrid(original: Grid, times: number): Grid {
        const map: number[][] = Array(original.height * times).fill(0).map(() => Array(original.width * times).fill(0));
        const width = map[0].length;
        const height = map.length;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const offset = Math.floor(y / original.height) + Math.floor(x / original.width);
                map[y][x] = (original.map[y % original.height][x % original.width] + offset - 1) % 9 + 1;
            }
        }

        return { map, width, height };
    }

    private parseGrid() {
        const map = regexMatches(/\d+/g, this.input).map(([line]) =>
            line.split('').map(x => parseInt(x))
        );

        return { map, width: map[0].length, height: map.length };
    }
}
