import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Point = { x: number; y: number; };
type HeightMap = { map: number[][]; width: number; height: number; };
const neighbors: readonly Point[] = [[-1, 0], [0, -1], [1, 0], [0, 1]].map(p => ({ x: p[0], y: p[1] }));

@solutionInfo({
    day: 9,
    title: 'Smoke Basin'
})
export class Day09 extends SolutionBase {

    protected part1(): number {
        const heightMap = this.parseInput();
        const lowPoints = this.getLowPoints(heightMap);
        const sum = lowPoints.reduce((a, p) => a + 1 + heightMap.map[p.y][p.x], 0);

        return sum;
    }

    protected part2(): number {
        const heightMap = this.parseInput();
        const lowPoints = this.getLowPoints(heightMap);
        const basins = lowPoints.map(p => this.flood(heightMap, p));
        const largest3Basins = basins.sort((a, b) => b - a).slice(0, 3);
        const product = largest3Basins.reduce((a, x) => a * x, 1);

        return product;
    }

    private getLowPoints({ map, width, height }: HeightMap): Point[] {
        const points: Point[] = [];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const current = map[y][x];
                const isLowest = neighbors
                    .map(np => map[y + np.y] && map[y + np.y][x + np.x])
                    .every(n => n === undefined || current < n);
                if (isLowest) {
                    points.push({ x, y });
                }
            }
        }

        return points;
    }

    /**
     * Floods an area starting from the given point to calculate it's size.
     * Areas are delimited by '9'-s.
     */
    private flood({ map, width, height }: HeightMap, start: Point): number {
        const toIndex = (p: Point) => p.y * width + p.x;
        const visitedIndexes = new Set<number>();
        const queue: Point[] = [start];

        while (queue.length > 0) {
            const point = queue.shift()!;
            const pointIndex = toIndex(point);

            if (visitedIndexes.has(pointIndex)) { continue; }
            visitedIndexes.add(pointIndex);

            neighbors.forEach(np => {
                const nextX = point.x + np.x;
                const nextY = point.y + np.y;
                if (nextX >= 0 && nextX < width &&
                    nextY >= 0 && nextY < height &&
                    map[nextY][nextX] < 9
                ) {
                    queue.push({ x: nextX, y: nextY });
                }
            });
        }

        return visitedIndexes.size;
    }

    private parseInput(): HeightMap {
        const map = this.inputLines.map(line =>
            regexMatches(/\d/g, line).map(x => parseInt(x[0]))
        );

        return {
            map,
            width: map[0].length,
            height: map.length
        };
    }
}
