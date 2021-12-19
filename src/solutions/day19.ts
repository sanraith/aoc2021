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

type Scanner = { id: number, points: Point[]; relativeDistances: number[][]; };

const origin = new Point(0, 0, 0);
const rotationAngles: readonly number[] = [0, 90, 180, 270].map(d => toRadians(d));

@solutionInfo({
    day: 19,
    title: 'Beacon Scanner'
})
export class Day19 extends SolutionBase {

    protected part1(): number {
        const scanners = this.parseInput();
        // console.log(scanners[0].points);
        // console.log(scanners[0].relativeDistances);
        // const overlapping = scanners.slice(1).filter(s2 => this.maybeOverlapping(originScanner, s2));
        // console.log(this.intersectSorted([1, 2, 3, 3, 5], [0, 3, 3, 4, 5]));

        const originScanner = scanners[0];
        const pairs = this.pairs(scanners)
            .map(([a, b]) => ({ a, b, overlap: this.overlap(a, b) }))
            .filter(x => x.overlap);
        console.log(pairs);



        this.noSolution();
    }

    protected part2(): string | number {
        this.noSolution();
    }

    private pairs<T>(items: T[]): [T, T][] {
        const length = items.length;
        const result: [T, T][] = [];
        for (let i = 0; i < length; i++) {
            const a = items[i];
            for (let j = i + 1; j < length; j++) {
                result.push([a, items[j]]);
            }
        }

        return result;
    }

    /** Not 100% accurate, but probably good enough for the puzzle. */
    private overlap(s1: Scanner, s2: Scanner) {
        for (let i = 0; i < s1.relativeDistances.length; i++) {
            const r1 = s1.relativeDistances[i];
            for (let j = 0; j < s2.relativeDistances.length; j++) {
                const r2 = s2.relativeDistances[j];
                const overlap = this.intersectSorted(r1, r2);
                if (overlap.length > 10) {
                    return {
                        p1: s1.points[i], p2: s2.points[j],
                        p1Index: i, p2Index: j
                    };
                }
            }
        }

        return false;
    }

    private intersectSorted(a: number[], b: number[]) {
        const result: number[] = [];
        let bIndex = 0;
        for (const item of a) {
            while (b[bIndex] < item) { bIndex++; }
            if (b[bIndex] === item) {
                result.push(item);
                bIndex++;
            }
        }

        return result;
    }

    private parseInput() {
        const scannerMatches = regexMatches(/--- scanner (\d+) ---\r?\n((?:.*,.*,.*(?:\r?\n)?)*)/g, this.input);
        const scanners = scannerMatches.map(([, idGroup, pointsGroup]) => {
            const id = parseInt(idGroup);
            const points = regexMatches(/(-?\d+),(-?\d+),(-?\d+)/g, pointsGroup)
                .map(m => m.slice(1).map(x => parseInt(x)))
                .map(([x, y, z]) => new Point(x, y, z))
                .sort((a, b) => a.manhattan(origin) - b.manhattan(origin));
            const relativeDistances = points.map(p1 => points.map(p2 => p1.manhattan(p2)).sort((a, b) => a - b).slice(1));

            return { id, points, relativeDistances };
        });

        return scanners;
    }

    // Rotation matrices
    private Rx(r: number) { return this.intMatrix([[1, 0, 0], [0, Math.cos(r), -Math.sin(r)], [0, Math.sin(r), Math.cos(r)]]); }
    private Ry(r: number) { return this.intMatrix([[Math.cos(r), 0, Math.sin(r)], [0, 1, 0], [-Math.sin(r), 0, Math.cos(r)]]); }
    private Rz(r: number) { return this.intMatrix([[Math.cos(r), -Math.sin(r), 0], [Math.sin(r), Math.cos(r), 0], [0, 0, 1]]); }
    private intMatrix(matrix: number[][]) { return matrix.map(line => line.map(x => Math.floor(x))); }
}
