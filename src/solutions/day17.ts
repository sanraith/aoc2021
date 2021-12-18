import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Point = { x: number; y: number; };
type Simulation = { hit: boolean, missTop: number, missBottom: number; };

@solutionInfo({
    day: 17,
    title: 'Trick Shot'
})
export class Day17 extends SolutionBase {

    protected part1(): number {
        const { topLeft, bottomRight } = this.parseInput();
        const { maxY } = this.searchMaxY(topLeft, bottomRight);

        return maxY;
    }

    protected part2(): number {
        const { bottomRight, topLeft } = this.parseInput();
        const { maxAy } = this.searchMaxY(topLeft, bottomRight);
        const minAy = bottomRight.y;

        let hitCount = 0;
        for (let aY = minAy; aY <= maxAy; aY++) {
            for (let aX = 0; aX <= bottomRight.x; aX++) {
                if (this.isHit(aX, aY, topLeft, bottomRight)) {
                    hitCount++;
                }
            }
        }

        return hitCount;
    }

    private isHit(aX: number, aY: number, tl: Point, br: Point) {
        let x = 0;
        let y = 0;
        while (!((aY < 0 && y < br.y) || x > br.x || (aX === 0 && x < tl.x))) {
            x += aX;
            y += aY;
            if (x >= tl.x && x <= br.x && y >= br.y && y <= tl.y) {
                return true;
            }
            aX = Math.max(0, aX - 1);
            aY = aY - 1;
        }

        return false;
    }

    private searchMaxY(tl: Point, br: Point) {
        let maxAy = -1;
        let canGoHigher = true;
        let prev: Simulation = undefined!;
        let maxY = Number.MIN_SAFE_INTEGER;
        while (canGoHigher) {
            maxAy++;
            const simulation = this.simulateY(maxAy, tl, br);
            if (simulation.hit) { maxY = Math.max(maxY, simulation.maxY); }
            canGoHigher = simulation.hit || !prev || !(!prev.hit &&
                prev.missTop <= simulation.missTop &&
                prev.missBottom >= simulation.missBottom);
            prev = simulation;
        }

        return { maxAy, maxY };
    }

    private simulateY(maxAy: number, tl: Point, br: Point) {
        let y = 0;
        let aY = maxAy;
        let hit = false;
        let missTop = 0;
        let missBottom = 0;
        let maxY = Number.MIN_SAFE_INTEGER;
        while (!((aY < 0 && y < br.y))) {
            y += aY;
            maxY = Math.max(maxY, y);
            if (y >= br.y && y <= tl.y) {
                hit = true;
                break;
            }
            if (y > tl.y) { missTop = y; }
            aY = aY - 1;
        }
        if (y < br.y) { missBottom = y; }

        return { hit, missTop, missBottom, maxY };
    }

    private parseInput() {
        const [x1, x2, y1, y2] = (this.input
            .match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)\.\.(-?\d+)/) ?? [])
            .slice(1).map(x => parseInt(x));

        return { topLeft: { x: x1, y: y2 }, bottomRight: { x: x2, y: y1 } };
    }
}
