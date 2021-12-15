import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Grid = { map: number[][]; width: number; height: number; };
class Point {
    constructor(public x: number, public y: number) { }
    add(other: Point): Point { return new Point(this.x + other.x, this.y + other.y); }
    manhattan(other: Point): number { return Math.abs(this.x - other.x) + Math.abs(this.y - other.y); }
    isInBounds(width: number, height: number) {
        return this.x >= 0 && this.x < width && this.y >= 0 && this.y < height;
    }
    toString(): string { return `${this.x},${this.y}`; }
}
const directions: readonly Point[] = [[1, 0], [0, 1], [-1, 0], [0, -1]].map(([x, y]) => new Point(x, y));

@solutionInfo({
    day: 15,
    title: 'Chiton'
})
export class Day15 extends SolutionBase {

    protected part1(): number {
        const grid = this.parseGrid();
        const start = new Point(0, 0);
        const end = new Point(grid.width - 1, grid.height - 1);
        const distance = this.findBestPath(grid, start, end);

        return distance;
    }

    protected part2(): string | number {
        const grid = this.enlargeGrid(this.parseGrid(), 5);
        const start = new Point(0, 0);
        const end = new Point(grid.width - 1, grid.height - 1);
        const distance = this.findBestPath(grid, start, end);

        return distance;
    }

    private enlargeGrid(grid: Grid, times: number): Grid {
        return grid; // TODO
    }

    private findBestPath(grid: Grid, start: Point, end: Point) {
        const { map, width, height } = grid;
        const distances: number[][] = Array(height).fill(0).map(() => Array(width).fill(-1));
        const visited = new Set<string>([end.toString()]);
        const queue = [end];
        while (queue.length > 0) {
            const point = queue.shift()!;

            let bestDistance = undefined;
            for (const next of directions.map(d => point.add(d))) {
                if (!next.isInBounds(width, height)) { continue; }
                const distance = distances[next.y][next.x];
                if (distance >= 0 && (bestDistance === undefined || distance < bestDistance)) {
                    bestDistance = distance;
                }

                const nextStr = next.toString();
                if (!visited.has(nextStr)) {
                    visited.add(nextStr);
                    queue.push(next);
                }
            }
            distances[point.y][point.x] = map[point.y][point.x] + (bestDistance ?? 0);
        }

        return distances[start.y][start.x] - map[start.y][start.x];
    }

    private parseGrid() {
        const map = regexMatches(/\d+/g, this.input).map(([line]) =>
            line.split('').map(x => parseInt(x))
        );

        return { map, width: map[0].length, height: map.length };
    }
}
