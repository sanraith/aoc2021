import { off } from 'process';
import { regexMatches, toRadians } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

class Point {
    constructor(public x: number, public y: number, public z: number) { }
    add(p2: Point): Point { return new Point(this.x + p2.x, this.y + p2.y, this.z + p2.z); }
    sub(p2: Point): Point { return new Point(this.x - p2.x, this.y - p2.y, this.z - p2.z); }
    manhattan(p2: Point): number { return Math.abs(this.x - p2.x) + Math.abs(this.y - p2.y) + Math.abs(this.z - p2.z); }
    toString(): string { return `${this.x},${this.y},${this.z}`; }
    equal(p2: Point): boolean { return this.x === p2.x && this.y === p2.y && this.z === p2.z; }

    vector(): number[][] { return [[this.x], [this.y], [this.z]]; }
    static from(vector: number[][]): Point {
        const [[x], [y], [z]] = vector;
        return new Point(x, y, z);
    }
}

type Scanner = { id: number, points: Point[]; relativeDistances: number[][]; offset: Point; };
type Overlap = { p1: Point, p2: Point, p1Index: number, p2Index: number; };
const origin = new Point(0, 0, 0);
const overlapThreshold = 12 as const;

@solutionInfo({
    day: 19,
    title: 'Beacon Scanner'
})
export class Day19 extends SolutionBase {

    rotations: number[][][];

    constructor() {
        super();

        // Rotation matrices for each angle
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
        this.rotations = rotations;
    }

    protected part1(): number {
        const scanners = this.parseInput();
        const pairs = this.pairs(scanners)
            .map(([a, b]) => ({ a, b, overlaps: this.overlap(a, b) }))
            .filter(x => x.overlaps.length > 0);

        console.log(pairs.map(x => x.a.id + ',' + x.b.id));

        const oriented = new Set<number>([0]);
        while (oriented.size < scanners.length) {
            const pairIndex = pairs.findIndex(p => oriented.has(p.a.id) && !oriented.has(p.b.id));
            const pair = pairs[pairIndex];
            for (const overlap of pair.overlaps) {
                if (this.reorient(pair.a, pair.b, overlap)) {
                    break;
                }
            }
            oriented.add(pair.b.id);
            pairs.splice(pairIndex, 1);
        }

        const pointSet = new Set<string>();
        scanners.forEach(s => s.points.forEach(p => pointSet.add(p.toString())));

        return pointSet.size;
    }

    protected part2(): number {
        const scanners = this.parseInput();
        const pairs = this.pairs(scanners)
            .map(([a, b]) => ({ a, b, overlaps: this.overlap(a, b) }))
            .filter(x => x.overlaps.length > 0);

        console.log(pairs.map(x => x.a.id + ',' + x.b.id));

        const oriented = new Set<number>([0]);
        while (oriented.size < scanners.length) {
            const pairIndex = pairs.findIndex(p => oriented.has(p.a.id) && !oriented.has(p.b.id));
            const pair = pairs[pairIndex];
            for (const overlap of pair.overlaps) {
                if (this.reorient(pair.a, pair.b, overlap)) {
                    break;
                }
            }
            oriented.add(pair.b.id);
            pairs.splice(pairIndex, 1);
        }

        const maxDistance = this.pairs(scanners).reduce((max, pair) => {
            const distance = pair[0].offset.manhattan(pair[1].offset);
            return distance > max ? distance : max;
        }, Number.MIN_SAFE_INTEGER);

        return maxDistance;
    }

    private reorient(s1: Scanner, s2: Scanner, overlap: Overlap): boolean {
        const { p1Index, p2Index } = overlap;
        const p1 = s1.points[p1Index];
        for (const rotation of this.rotations) {
            let rotatedPoints = s2.points.map(p => Point.from(this.multiply(rotation, p.vector())));
            const offset = p1.sub(rotatedPoints[p2Index]);
            rotatedPoints = rotatedPoints.map(p => p.add(offset));
            const commonCount = rotatedPoints.reduce((a, s2p) => a + (s1.points.some(s1p => s1p.equal(s2p)) ? 1 : 0), 0);
            if (commonCount >= overlapThreshold) {
                console.log(`Reoriented ${s2.id} based on ${s1.id}!`);
                s2.points = rotatedPoints;
                s2.offset = offset;
                return true;
            }
        }

        return false;
    }

    private pairs<T>(items: T[]): [T, T][] {
        const length = items.length;
        const result: [T, T][] = [];
        for (let i = 0; i < length; i++) {
            const a = items[i];
            for (let j = 0; j < length; j++) {
                if (i === j) { continue; }
                result.push([a, items[j]]);
            }
        }

        return result;
    }

    /** Not 100% accurate, but probably good enough for the puzzle. */
    private overlap(s1: Scanner, s2: Scanner): Overlap[] {
        const candidates: Overlap[] = [];
        for (let i = 0; i < s1.relativeDistances.length; i++) {
            const r1 = s1.relativeDistances[i];
            for (let j = 0; j < s2.relativeDistances.length; j++) {
                const r2 = s2.relativeDistances[j];
                const overlap = this.intersectSorted(r1, r2);
                if (overlap.length >= overlapThreshold - 1) {
                    candidates.push({
                        p1: s1.points[i], p2: s2.points[j],
                        p1Index: i, p2Index: j
                    });
                }
            }
        }

        return candidates;
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
                .map(([x, y, z]) => new Point(x, y, z));
            const relativeDistances = points.map(p1 => points.map(p2 => p1.manhattan(p2)).sort((a, b) => a - b).slice(1));
            return { id, points, relativeDistances, offset: new Point(0, 0, 0) };
        });

        return scanners;
    }

    // Matrices
    private multiply(m1: number[][], m2: number[][]) {
        const height = m1.length;
        const width = m2[0].length;
        const result: number[][] = Array(height).fill(0).map(() => Array(width));
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                result[row][col] = m1[row].map((x1, i1) => x1 * m2[i1][col]).reduce((a, x) => a + x);
            }
        }

        return result;
    }
    private Rx(r: number) { return this.intMatrix([[1, 0, 0], [0, Math.cos(r), -Math.sin(r)], [0, Math.sin(r), Math.cos(r)]]); }
    private Ry(r: number) { return this.intMatrix([[Math.cos(r), 0, Math.sin(r)], [0, 1, 0], [-Math.sin(r), 0, Math.cos(r)]]); }
    private Rz(r: number) { return this.intMatrix([[Math.cos(r), -Math.sin(r), 0], [Math.sin(r), Math.cos(r), 0], [0, 0, 1]]); }
    private intMatrix(matrix: number[][]) {
        return matrix.map(line => line.map(x => {
            const whole = x < 0 ? Math.ceil(x) : Math.floor(x);
            if (Math.abs(x - whole) < .00001) {
                return whole;
            } else {
                console.log(x, whole);
                throw new Error();
            }
        }));
    }
}
