import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Cube = {
    x1: number; x2: number;
    y1: number; y2: number;
    z1: number; z2: number;
    volume: number;
};
type ReCube = {
    cube: Cube;
    state: boolean;
    missing: ReCube[];
};

@solutionInfo({
    day: 22,
    title: 'Reactor Reboot'
})
export class Day22 extends SolutionBase {

    protected part1(): number {
        const { initSteps } = this.parseInput();
        const coordStr = (x: number, y: number, z: number) => x + ',' + y + ',' + z;

        const map = new Map<string, boolean>();
        initSteps.forEach(({ isOn, cube }, index) => {
            this.updateProgress(index / initSteps.length);
            const { x1, x2, y1, y2, z1, z2 } = cube;
            for (let x = x1; x <= x2; x++) {
                for (let y = y1; y <= y2; y++) {
                    for (let z = z1; z <= z2; z++) {
                        map.set(coordStr(x, y, z), isOn);
                    }
                }
            }
        });

        return [...map.values()].reduce((a, x) => a + (x ? 1 : 0), 0);
    }

    protected part2(): number {
        const { steps } = this.parseInput();

        const reCubes: ReCube[] = [];
        steps.forEach(({ cube, isOn }, index) => {
            this.updateProgress(index / steps.length);

            const hits = reCubes
                .map(reCube => ({ reCube, intersection: this.reIntersect(reCube, cube) as ReCube }))
                .filter(x => x.intersection);

            for (const { reCube, intersection } of hits) {
                intersection.state = false;
                reCube.missing.push(intersection);
            }

            if (isOn) {
                reCubes.push({ state: isOn, cube, missing: [] });
            }
        });

        return reCubes.reduce((a, x) => a + this.reVolume(x), 0);
    }


    private intersect(a: Cube, b: Cube): Cube | false {
        const x1 = Math.max(a.x1, b.x1);
        const x2 = Math.min(a.x2, b.x2);
        const y1 = Math.max(a.y1, b.y1);
        const y2 = Math.min(a.y2, b.y2);
        const z1 = Math.max(a.z1, b.z1);
        const z2 = Math.min(a.z2, b.z2);

        if (x1 > x2 || y1 > y2 || z1 > z2) { return false; }
        return { x1, x2, y1, y2, z1, z2, volume: this.volume(x1, x2, y1, y2, z1, z2) };
    }

    private reIntersect(a: ReCube, b: Cube): ReCube | false {
        return false;
    }

    private volume(x1: number, x2: number, y1: number, y2: number, z1: number, z2: number) {
        return (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1);
    }

    private reVolume(reCube: ReCube): number {
        let volume = reCube.cube.volume;
        for (const inner of reCube.missing) {
            volume -= this.reVolume(inner);
        }

        return volume;
    }

    private parseInput() {
        const regions = regexMatches(/(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/g, this.input)
            .map(([, onOffMatch, ...coordMatches]) => {
                const isOn = onOffMatch === 'on';
                const coords = coordMatches.map(x => parseInt(x));
                const isInitStep = coords.every(x => x >= -50 && x <= 50);
                const [x1, x2, y1, y2, z1, z2] = coords;
                const cube = { x1, x2, y1, y2, z1, z2, volume: this.volume(x1, x2, y1, y2, z1, z2) };

                return { isOn, isInitStep, cube };
            });

        return { steps: regions, initSteps: regions.filter(x => x.isInitStep) };
    }
}
