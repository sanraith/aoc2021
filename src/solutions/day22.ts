import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 22,
    title: 'Reactor Reboot'
})
export class Day22 extends SolutionBase {

    protected part1(): number {
        const { initSteps } = this.parseInput();
        const coordStr = (x: number, y: number, z: number) => x + ',' + y + ',' + z;

        const map = new Map<string, boolean>();
        initSteps.forEach(({ isOn, x1, x2, y1, y2, z1, z2 }, index) => {
            this.updateProgress(index / initSteps.length);
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
        this.noSolution();
    }

    private parseInput() {
        const regions = regexMatches(/(on|off) x=(-?\d+)\.\.(-?\d+),y=(-?\d+)\.\.(-?\d+),z=(-?\d+)\.\.(-?\d+)/g, this.input)
            .map(([, onOffMatch, ...coordMatches]) => {
                const isOn = onOffMatch === 'on';
                const coords = coordMatches.map(x => parseInt(x));
                const isInitStep = coords.every(x => x >= -50 && x <= 50);
                const [x1, x2, y1, y2, z1, z2] = coords;

                return { isOn, isInitStep, x1, x2, y1, y2, z1, z2 };
            });

        return { initSteps: regions.filter(x => x.isInitStep) };
    }
}
