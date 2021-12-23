import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Cube = {
    x1: number; x2: number;
    y1: number; y2: number;
    z1: number; z2: number;
    volume: number;
};
type Step = { cube: Cube, state: boolean; };
type PunchedCube = {
    base: Cube;
    state: boolean;
    holes: PunchedCube[];
};

@solutionInfo({
    day: 22,
    title: 'Reactor Reboot'
})
export class Day22 extends SolutionBase {

    protected part1(): number {
        const { initSteps } = this.parseInput();
        return this.executeSteps(initSteps);
    }

    protected part2(): number {
        const { steps } = this.parseInput();
        return this.executeSteps(steps);
    }

    private executeSteps(steps: Step[]): number {
        const reCubes: PunchedCube[] = [];
        steps.forEach(({ cube, state }, index) => {
            this.updateProgress(index / steps.length);

            const intersections = reCubes
                .map(reCube => ({ reCube, hole: this.intersectPunched(reCube, cube) as PunchedCube }))
                .filter(x => x.hole);

            for (const { reCube, hole } of intersections) {
                hole.state = false;
                reCube.holes.push(hole);
            }

            if (state) {
                reCubes.push({ state: state, base: cube, holes: [] });
            }
        });

        return reCubes.reduce((a, x) => a + this.volume(x), 0);
    }

    private intersectPunched(a: PunchedCube, b: Cube): PunchedCube | false {
        const base = this.intersect(a.base, b);
        if (!base) { return false; }
        const holes = a.holes.map(h => this.intersectPunched(h, b) as PunchedCube).filter(x => x);

        return { base, holes, state: !a.state };
    }

    private volume(reCube: PunchedCube): number {
        let volume = reCube.base.volume;
        for (const hole of reCube.holes) {
            volume -= this.volume(hole);
        }

        return volume;
    }

    private intersect(a: Cube, b: Cube): Cube | false {
        const x1 = Math.max(a.x1, b.x1);
        const x2 = Math.min(a.x2, b.x2);
        const y1 = Math.max(a.y1, b.y1);
        const y2 = Math.min(a.y2, b.y2);
        const z1 = Math.max(a.z1, b.z1);
        const z2 = Math.min(a.z2, b.z2);
        if (x1 > x2 || y1 > y2 || z1 > z2) { return false; }

        return this.createCube(x1, x2, y1, y2, z1, z2);
    }

    private parseInput() {
        const cubes = regexMatches(/(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/g, this.input)
            .map(([, onOffMatch, ...coordMatches]) => {
                const state = onOffMatch === 'on';
                const coords = coordMatches.map(x => parseInt(x));
                const isInitStep = coords.every(x => x >= -50 && x <= 50);
                const [x1, x2, y1, y2, z1, z2] = coords;
                const cube = this.createCube(x1, x2, y1, y2, z1, z2);

                return { isInitStep, state, cube, holes: [] };
            });

        return { steps: cubes as Step[], initSteps: cubes.filter(x => x.isInitStep) };
    }

    private createCube(x1: number, x2: number, y1: number, y2: number, z1: number, z2: number) {
        return { x1, x2, y1, y2, z1, z2, volume: (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1) };
    }
}
