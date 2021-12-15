import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Grid = { map: number[][]; width: number; height: number; };
class Point {
    constructor(public x: number, public y: number) { }
    add(other: Point): Point { return new Point(this.x + other.x, this.y + other.y); }
    equal(other: Point): boolean { return this.x === other.x && this.y === other.y; }
    isInBounds(width: number, height: number) { return this.x >= 0 && this.x < width && this.y >= 0 && this.y < height; }
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
        // const distance = this.findBestPath(grid, start, end);
        const distance = this.findPathRecursive(grid, start, end);

        return distance;
    }

    protected part2(): string | number {
        this.noSolution();
        const grid = this.enlargeGrid(this.parseGrid(), 5);
        const start = new Point(0, 0);
        const end = new Point(grid.width - 1, grid.height - 1);
        const distance = this.findBestPath(grid, start, end);

        return distance; // 2835 too high
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

        // console.log();
        // console.log(map.map(l => l.join('')).join('\n'));

        return { map, width, height };
    }

    private findBestPath(grid: Grid, start: Point, end: Point) {
        const { map, width, height } = grid;
        const distances: number[][] = Array(height).fill(0).map(() => Array(width).fill(-1));
        const visited = new Set<string>([end.toString()]);
        const queue = [end];
        while (queue.length > 0) {
            this.updateProgress(visited.size / (width * height));
            const point = queue.shift()!;

            let bestDistance = undefined;
            for (const neighbor of directions.map(d => point.add(d))) {
                if (!neighbor.isInBounds(width, height)) { continue; }

                const neighborStr = neighbor.toString();
                const distance = distances[neighbor.y][neighbor.x];
                if (distance >= 0 && (bestDistance === undefined || distance < bestDistance)) {
                    bestDistance = distance;
                }

                if (!visited.has(neighborStr)) {
                    visited.add(neighborStr);
                    queue.push(neighbor);
                }
            }
            distances[point.y][point.x] = map[point.y][point.x] + (bestDistance ?? 0);
        }

        return distances[start.y][start.x] - map[start.y][start.x];
    }

    private findPathRecursive(grid: Grid, start: Point, end: Point, visited?: Set<string>, current = 0, bestRef = { value: Number.MAX_SAFE_INTEGER }): number {
        if (current >= bestRef.value) {
            return current;
        } else if (start.equal(end)) {
            bestRef.value = current;
            console.log(current);
            return current;
        }

        const { map, width, height } = grid;
        visited ??= new Set<string>([start.toString()]);

        for (const neighbor of directions.map(d => start.add(d))) {
            if (!neighbor.isInBounds(width, height)) { continue; }
            const neighborStr = neighbor.toString();
            if (visited.has(neighborStr)) { continue; }

            visited.add(neighborStr);
            this.findPathRecursive(grid, neighbor, end, visited, current + map[neighbor.y][neighbor.x], bestRef);
            visited.delete(neighborStr);
        }

        return bestRef.value;
    }

    private lazyFill(grid: Grid, start: Point, end: Point) {
        const { map, width, height } = grid;
        const distances: number[][] = Array(height).fill(0).map(() => Array(width).fill(-1));
        const solved = new Set<string>();
        const remap = new Map<string, Point>([[end.toString(), end]]);

        while (remap.size > 0) {
            for (const point of [...remap.values()]) {
                //
            }
            //
        }
    }

    private parseGrid() {
        const map = regexMatches(/\d+/g, this.input).map(([line]) =>
            line.split('').map(x => parseInt(x))
        );

        return { map, width: map[0].length, height: map.length };
    }
}
