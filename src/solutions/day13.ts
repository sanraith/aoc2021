import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Point = { x: number; y: number; };
export type Day13VisualizationData = { steps: { points: Point[]; fold?: Point; }[]; };

@solutionInfo({
    day: 13,
    title: 'Transparent Origami'
})
export class Day13 extends SolutionBase {
    protected visualizationData?: Day13VisualizationData;

    protected part1(): number {
        const manual = this.parseInput();
        const points = this.fold(manual.points, manual.folds[0]);

        return points.length;
    }

    protected part2(): string {
        this.visualizationData = { steps: [] };
        const manual = this.parseInput();
        const points = manual.folds.reduce((points, fold) => {
            this.visualizationData!.steps.push({ points, fold });
            return this.fold(points, fold);
        }, manual.points);
        this.visualizationData!.steps.push({ points });
        const code = this.draw(points);

        return code;
    }

    private fold(points: Point[], fold: Point): Point[] {
        const duplicates = new Set<string>();
        const foldedPoints = points.map(p => ({
            x: fold.x && p.x > fold.x ? p.x - (p.x - fold.x) * 2 : p.x,
            y: fold.y && p.y > fold.y ? p.y - (p.y - fold.y) * 2 : p.y
        })).filter(p => {
            const pointStr = `${p.x},${p.y}`;
            return duplicates.has(pointStr) ? false : duplicates.add(pointStr);
        });

        return foldedPoints;
    }

    private draw(points: Point[]): string {
        const width = points.reduce((a, p) => Math.max(a, p.x), -1) + 1;
        const height = points.reduce((a, p) => Math.max(a, p.y), -1) + 1;
        const image = Array(height).fill(0).map(() => Array(width).fill(' '));
        points.forEach(p => image[p.y][p.x] = '█');

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
