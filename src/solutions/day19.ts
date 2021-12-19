import { regexMatches, toRadians } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

class Point {
    constructor(public x: number, public y: number, public z: number) { }
    manhattan(p2: Point): number { return Math.abs(this.x - p2.x) + Math.abs(this.y - p2.y) + Math.abs(this.z - p2.z); }
    toString(): string { return `${this.x},${this.y},${this.z}`; }

    vector(): number[] { return [this.x, this.y, this.z]; }
    static from(vector: number[]): Point {
        const [x, y, z] = vector;
        return new Point(x, y, z);
    }
}

type Scanner = { id: number, orientations: Point[][]; };

const origin = new Point(0, 0, 0);
const rotationAngles: readonly number[] = [0, 90, 180, 270].map(d => toRadians(d));

@solutionInfo({
    day: 19,
    title: 'Beacon Scanner'
})
export class Day19 extends SolutionBase {

    protected part1(): number {
        const scanners = this.parseInput();
        const originScanner = scanners[0];

        this.noSolution();
    }

    protected part2(): string | number {
        this.noSolution();
    }

    private parseInput() {
        const scannerMatches = regexMatches(/--- scanner (\d+) ---\r?\n((?:.*,.*,.*(?:\r?\n)?)*)/g, this.input);
        const scanners = scannerMatches.map(([, idGroup, pointsGroup]) => {
            const id = parseInt(idGroup);
            const points = regexMatches(/(-?\d+),(-?\d+),(-?\d+)/g, pointsGroup)
                .map(m => m.slice(1).map(x => parseInt(x)))
                .map(([x, y, z]) => new Point(x, y, z))
                .sort((a, b) => a.manhattan(origin) - b.manhattan(origin));
            return { id, orientations: [points] };
        });

        return scanners;
    }

    // Rotation matrices
    private Rx(r: number) { return this.intMatrix([[1, 0, 0], [0, Math.cos(r), -Math.sin(r)], [0, Math.sin(r), Math.cos(r)]]); }
    private Ry(r: number) { return this.intMatrix([[Math.cos(r), 0, Math.sin(r)], [0, 1, 0], [-Math.sin(r), 0, Math.cos(r)]]); }
    private Rz(r: number) { return this.intMatrix([[Math.cos(r), -Math.sin(r), 0], [Math.sin(r), Math.cos(r), 0], [0, 0, 1]]); }
    private intMatrix(matrix: number[][]) { return matrix.map(line => line.map(x => Math.floor(x))); }
}
