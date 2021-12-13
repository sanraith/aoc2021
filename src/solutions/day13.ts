import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Point = { x: number; y: number; };

@solutionInfo({
    day: 13,
    title: 'Transparent Origami'
})
export class Day13 extends SolutionBase {

    protected part1(): number {
        const manual = this.parseInput();
        const points = this.fold(manual.points, manual.folds[0]);

        return points.length;
    }

    protected part2(): string {
        const manual = this.parseInput();
        const points = manual.folds.reduce((points, fold) => this.fold(points, fold), manual.points);
        const code = this.draw(points);

        return code;
    }

    private fold(points: Point[], fold: Point): Point[] {
        let foldedPoints = points.map(p => ({
            x: fold.x && p.x > fold.x ? p.x - (p.x - fold.x) * 2 : p.x,
            y: fold.y && p.y > fold.y ? p.y - (p.y - fold.y) * 2 : p.y
        }));

        // Keep distinct points only
        foldedPoints = [...new Set(foldedPoints.map(p => `${p.x},${p.y}`))]
            .map(s => s.split(','))
            .map(ps => ({ x: parseInt(ps[0]), y: parseInt(ps[1]) }));

        return foldedPoints;
    }

    private draw(points: Point[]): string {
        const width = points.reduce((a, p) => Math.max(a, p.x), -1) + 1;
        const height = points.reduce((a, p) => Math.max(a, p.y), -1) + 1;
        const image = Array(height).fill(0).map(() => Array(width).fill(' '));
        points.forEach(p => image[p.y][p.x] = '#');

        return image.map(line => line.join('')).join('\n');
    }

    private parseInput() {
        const points = regexMatches(/(\d+),(\d+)/g, this.input).map(m => ({ x: parseInt(m[1]), y: parseInt(m[2]) }));
        const folds = regexMatches(/fold along ([xy])=(\d+)/g, this.input)
            .map(m => {
                const axis = m[1] as 'x' | 'y';
                const pos = parseInt(m[2]);
                return {
                    x: axis === 'x' ? pos : 0,
                    y: axis === 'y' ? pos : 0
                };
            });

        return { points, folds };
    }
}
