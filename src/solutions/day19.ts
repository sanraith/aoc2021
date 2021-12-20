import { regexMatches, toRadians } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

class Point {
    constructor(public x: number, public y: number, public z: number) { }

    add(p: Point): Point { return new Point(this.x + p.x, this.y + p.y, this.z + p.z); }
    sub(p: Point): Point { return new Point(this.x - p.x, this.y - p.y, this.z - p.z); }
    manhattan(p: Point): number { return Math.abs(this.x - p.x) + Math.abs(this.y - p.y) + Math.abs(this.z - p.z); }
    equal(p: Point): boolean { return this.x === p.x && this.y === p.y && this.z === p.z; }

    toString(): string { return `${this.x},${this.y},${this.z}`; }

    vector(): Matrix { return [[this.x], [this.y], [this.z]]; }
    static from(vector: Matrix): Point {
        const [[x], [y], [z]] = vector;
        return new Point(x, y, z);
    }
}

type Matrix = number[][];
type Scanner = { id: number, points: Point[]; relativeDistances: number[][]; offset: Point; };
type Overlap = { p1Index: number, p2Index: number; };
const origin = new Point(0, 0, 0);
const overlapThreshold = 12 as const;

@solutionInfo({
    day: 19,
    title: 'Beacon Scanner'
})
export class Day19 extends SolutionBase {

    rotations: Matrix[] = this.createRotationMatrixes();
    orientedScanners: Scanner[] = [];

    protected part1(): number {
        const scanners = this.parseInput();
        const pairs = this.unorderedPairs(scanners)
            .map(([a, b], index, arr) => {
                this.updateProgress(index / arr.length);
                return { a, b, overlap: this.overlap(a, b) as Overlap };
            })
            .filter(p => p.overlap)
            .flatMap(p => [p, { // add reversed pairs as well
                a: p.b, b: p.a,
                overlap: { p1Index: p.overlap.p2Index, p2Index: p.overlap.p1Index }
            }]);

        const oriented = new Set<number>([0]);
        while (oriented.size < scanners.length) {
            const pairIndex = pairs.findIndex(p => oriented.has(p.a.id) && !oriented.has(p.b.id));
            const { a, b, overlap } = pairs[pairIndex];
            this.reorient(a, b, overlap);
            console.log(`Oriented ${b.id} based on ${a.id}`);
            oriented.add(b.id);
            pairs.splice(pairIndex, 1);
        }
        this.orientedScanners = scanners;

        const pointSet = new Set<string>();
        scanners.forEach(s => s.points.forEach(p => pointSet.add(p.toString())));

        return pointSet.size;
    }

    protected part2(): number {
        const maxDistance = this.unorderedPairs(this.orientedScanners)
            .reduce((max, [a, b]) => Math.max(max, a.offset.manhattan(b.offset)),
                Number.MIN_SAFE_INTEGER);

        return maxDistance;
    }

    /** Reorients s2 using s1 as origin based on the given overlap data. */
    private reorient(s1: Scanner, s2: Scanner, overlap: Overlap): boolean {
        const { p1Index, p2Index } = overlap;
        const p1 = s1.points[p1Index];
        for (const rotation of this.rotations) {
            const rotatedPoints = s2.points.map(p => Point.from(this.multiply(rotation, p.vector())));
            const offset = p1.sub(rotatedPoints[p2Index]);
            const offsetPoints = rotatedPoints.map(p => p.add(offset));

            const overlapCount = offsetPoints.reduce((a, p) => a + (s1.points.some(s1p => s1p.equal(p)) ? 1 : 0), 0);
            if (overlapCount >= overlapThreshold) {
                s2.points = offsetPoints;
                s2.offset = offset;
                return true;
            }
        }

        return false;
    }

    /** Creates unordered pair combinations of the given items. */
    private unorderedPairs<T>(items: T[]): [T, T][] {
        const length = items.length;
        const pairs: [T, T][] = [];
        for (let i = 0; i < length; i++) {
            const a = items[i];
            for (let j = i + 1; j < length; j++) {
                pairs.push([a, items[j]]);
            }
        }

        return pairs;
    }

    /**
     * Finds an overlap between two scanners by comparing relative distances of points within each.
     * Returning only the first hit is not 100% accurate, but good enough for the puzzle.
     * */
    private overlap(s1: Scanner, s2: Scanner): Overlap | false {
        for (let i = 0; i < s1.relativeDistances.length; i++) {
            const r1 = s1.relativeDistances[i];
            for (let j = 0; j < s2.relativeDistances.length; j++) {
                const r2 = s2.relativeDistances[j];
                const overlap = this.intersectSorted(r1, r2);
                if (overlap.length >= overlapThreshold - 1) {
                    return { p1Index: i, p2Index: j };
                }
            }
        }

        return false;
    }

    /** Returns the intersection of two ascending number arrays. */
    private intersectSorted(a: number[], b: number[]): number[] {
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

    private parseInput(): Scanner[] {
        const scannerMatches = regexMatches(/--- scanner (\d+) ---\r?\n((?:.*,.*,.*(?:\r?\n)?)*)/g, this.input);
        const scanners = scannerMatches.map(([, idGroup, pointsGroup]) => {
            const id = parseInt(idGroup);
            const points = regexMatches(/(-?\d+),(-?\d+),(-?\d+)/g, pointsGroup)
                .map(m => m.slice(1).map(x => parseInt(x)))
                .map(([x, y, z]) => new Point(x, y, z));
            const relativeDistances = points.map(p1 => points.map(p2 => p1.manhattan(p2)).sort((a, b) => a - b).slice(1));
            return { id, points, relativeDistances, offset: origin };
        });

        return scanners;
    }

    // Matrixes

    /** Creates rotation matrixes for each possible 90°-based orientation. */
    private createRotationMatrixes(): Matrix[] {
        // Individual rotations on each axes
        const rotationAngles: readonly number[] = [0, 90, 180, 270].map(d => toRadians(d));
        const xrs = rotationAngles.map(a => this.Rx(a));
        const yrs = rotationAngles.map(a => this.Ry(a));
        const zrs = rotationAngles.map(a => this.Rz(a));

        // Rotation combinations
        const duplicates = new Set<string>();
        const rotations = xrs
            .flatMap(rx => yrs.map(ry => [rx, ry]))
            .flatMap(([rx, ry]) => zrs.map(rz => [rx, ry, rz]))
            .map(t => t.reduce((a, x) => this.multiply(a, x)))
            .filter(t => !duplicates.has(t.join(';')) && duplicates.add(t.join(';')));

        return rotations;
    }

    /** Multiplies the 2 matrixes. */
    private multiply(m1: Matrix, m2: Matrix) {
        const height = m1.length;
        const width = m2[0].length;
        const result: Matrix = Array(height).fill(0).map(() => Array(width));
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                result[row][col] = m1[row].map((x1, i1) => x1 * m2[i1][col]).reduce((a, x) => a + x);
            }
        }

        return result;
    }

    // Rotation matrix generators for each axes
    private Rx(r: number): Matrix { return this.intMatrix([[1, 0, 0], [0, Math.cos(r), -Math.sin(r)], [0, Math.sin(r), Math.cos(r)]]); }
    private Ry(r: number): Matrix { return this.intMatrix([[Math.cos(r), 0, Math.sin(r)], [0, 1, 0], [-Math.sin(r), 0, Math.cos(r)]]); }
    private Rz(r: number): Matrix { return this.intMatrix([[Math.cos(r), -Math.sin(r), 0], [Math.sin(r), Math.cos(r), 0], [0, 0, 1]]); }

    /** Converts matrix values into integers. */
    private intMatrix(matrix: Matrix) { return matrix.map(line => line.map(x => x < 0 ? Math.ceil(x) : Math.floor(x))); }
}
