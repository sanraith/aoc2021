import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Grid = { map: number[][]; width: number; height: number; };

@solutionInfo({
    day: 11,
    title: 'Dumbo Octopus'
})
export class Day11 extends SolutionBase {

    protected part1(): number {
        const grid = this.parseInput();
        let flashCount = 0;
        for (let step = 1; step <= 100; step++) {
            flashCount += this.step(grid);
        }

        return flashCount;
    }

    protected part2(): number {
        const grid = this.parseInput();
        const simultaneousFlashCount = grid.width * grid.height;
        let step = 1;
        while (this.step(grid) < simultaneousFlashCount) {
            step++;
        }

        return step;
    }

    private step(grid: Grid): number {
        const { map } = grid;
        let flashCount = 0;
        this.forEachCell(grid, (x, y) => map[y][x]++);
        this.forEachCell(grid, (x, y) => flashCount += this.flash(grid, x, y));
        this.forEachCell(grid, (x, y) => map[y][x] = Math.max(0, map[y][x]));

        return flashCount;
    }

    private flash(grid: Grid, x: number, y: number): number {
        const { map } = grid;
        if (map[y][x] <= 9) { return 0; }

        let flashCount = 1;
        map[y][x] = Number.MIN_SAFE_INTEGER;
        this.forEachNeighbor(grid, x, y, (nx, ny) => {
            map[ny][nx]++;
            if (map[ny][nx] > 9) {
                flashCount += this.flash(grid, nx, ny);
            }
        });

        return flashCount;
    }

    private forEachCell({ width, height }: Grid, action: (x: number, y: number) => void): void {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                action(x, y);
            }
        }
    }

    private forEachNeighbor({ width, height }: Grid, startX: number, startY: number, action: (x: number, y: number) => void): void {
        const maxX = Math.min(width - 1, startX + 1);
        const maxY = Math.min(height - 1, startY + 1);
        for (let y = Math.max(0, startY - 1); y <= maxY; y++) {
            for (let x = Math.max(0, startX - 1); x <= maxX; x++) {
                if (x === startX && y === startY) { continue; }
                action(x, y);
            }
        }
    }

    private visualize({ map }: Grid): void {
        const mapStr = map
            .map(line => line.map(x => x < 0 ? '-' : x > 9 ? '+' : x).join(''))
            .join('\n');
        console.log(`\n${mapStr}`);
    }

    private parseInput(): Grid {
        const map = regexMatches(/\d+/g, this.input).map(lineMatch =>
            lineMatch[0].split('').map(x => parseInt(x))
        );

        return { map, width: map[0]?.length ?? 0, height: map.length };
    }
}
