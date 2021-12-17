import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

class Point {
    constructor(public x: number, public y: number) { }
    add(other: Point): Point { return new Point(this.x + other.x, this.y + other.y); }
    isInBounds(p1: Point, p2: Point) { return this.x >= p1.x && this.x <= p2.x && this.y >= p1.y && this.y <= p2.y; }
    toString(): string { return `${this.x},${this.y}`; }
}

@solutionInfo({
    day: 17,
    title: 'Trick Shot'
})
export class Day17 extends SolutionBase {

    protected part1(): number {
        const target = this.parseInput();
        // Y0 = 0;
        // Y1 = Y0 + Ay
        // Y2 = Y0 + Ay + (Ay - 1)
        // Y3 = Y0 + Ay + (Ay - 1) + (Ay - 2)
        // Yn = Y0 + n * Ay - ((n * (n - 1)) / 2

        let highest = 0;
        for (let a = 0; a < 1000; a++) {
            const { hits, highest: highest1 } = this.search(0, a, target.bottomRight.y, target.topLeft.y);
            if (hits.length > 0) {
                highest = highest1;
            }
        }

        return highest;
    }


    protected part2(): number {
        const { bottomRight, topLeft } = this.parseInput();
        let maxAY = 0;
        for (let a = 0; a < 1000; a++) {
            const { hits } = this.search(0, a, bottomRight.y, topLeft.y);
            if (hits.length > 0) {
                maxAY = a;
            }
        }

        let count = 0;
        for (let aX = 0; aX < 1000; aX++) {
            this.updateProgress(aX / 1000);
            for (let aY = -2 * maxAY; aY <= maxAY; aY++) {
                if (this.simulate(aX, aY, topLeft, bottomRight)) { count++; }
            }
        }

        return count;
    }

    private simulate(aX: number, aY: number, t1: Point, t2: Point) {
        let x = 0;
        let y = 0;
        let n = 0;
        while (n < 1000) {
            x += aX;
            y += aY;
            if (x >= t2.x && x <= t1.x && y >= t2.y && y <= t1.y) {
                return true;
            }
            aX = Math.max(0, aX - 1);
            aY = aY - 1;
            n++;
        }
        return false;
    }

    private search(y: number, aY: number, minY: number, maxY: number) {
        let yN = 0;
        let n = 0;
        let beforeHit = maxY + 1;
        let afterOrHit = minY - 1;
        let highest = Number.MIN_SAFE_INTEGER;
        const hits = [];
        while (yN >= minY) {
            yN = y + n * aY - Math.floor((n * (n - 1)) / 2);
            n++;
            if (yN > highest) { highest = yN; }
            if (yN > maxY) { beforeHit = yN; }
            if (yN < minY) { afterOrHit = yN; }
            if (yN <= maxY && yN >= minY) { hits.push({ n, yN }); }
        }
        return ({ highest, firstBefore: beforeHit, firstAfterOrLast: afterOrHit, hits });
    }

    private parseInput() {
        const [x1, x2, y1, y2] = (this.input
            .match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/) ?? [])
            .slice(1).map(x => parseInt(x));

        return { topLeft: new Point(x2, y2), bottomRight: new Point(x1, y1) };
    }
}
