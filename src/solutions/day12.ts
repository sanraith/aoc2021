import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 12,
    title: 'Passage Pathing'
})
export class Day12 extends SolutionBase {

    protected part1(): number {
        const { map, start, end } = this.parseInput();
        const pathCount = this.findPathCount(start, start, end, map, new Set([start]), 1);

        return pathCount;
    }

    protected part2(): number {
        const { map, start, end } = this.parseInput();
        const pathCount = this.findPathCount(start, start, end, map, new Set([start]));

        return pathCount;
    }

    private findPathCount(
        start: number, current: number, target: number,
        map: Map<number, number[]>,
        visited: Set<number>,
        repeatedCave = 0
    ) {
        let pathCount = 0;
        const options = map.get(current)!;
        for (const next of options) {
            if (next === start) { continue; }

            let nextRepeatedCave = repeatedCave;
            if (next < 0 && visited.has(next)) {
                if (nextRepeatedCave) { continue; }
                nextRepeatedCave = next;
            }

            visited.add(next);
            if (next === target) {
                pathCount++;
            } else {
                pathCount += this.findPathCount(start, next, target, map, visited, nextRepeatedCave);
            }
            if (nextRepeatedCave !== next) { visited.delete(next); }
        }

        return pathCount;
    }

    /** Creates a map of caves where small caves are <0 and large caves are >0. */
    private parseInput() {
        const caves = regexMatches(/(\w+)-(\w+)/g, this.input).map(([, a, b]) => ({ a, b }));

        let caveCount = 0;
        const caveIds: Record<string, number> = {};
        const map = new Map<number, number[]>();
        for (const { a, b } of caves) {
            if (!caveIds[a]) { caveIds[a] = ++caveCount * (a[0].toUpperCase() === a[0] ? 1 : -1); }
            if (!caveIds[b]) { caveIds[b] = ++caveCount * (b[0].toUpperCase() === b[0] ? 1 : -1); }

            if (!map.has(caveIds[a])) { map.set(caveIds[a], []); }
            if (!map.has(caveIds[b])) { map.set(caveIds[b], []); }

            map.get(caveIds[a])!.push(caveIds[b]);
            map.get(caveIds[b])!.push(caveIds[a]);
        }

        return { map, start: caveIds['start'], end: caveIds['end'] };
    }
}
