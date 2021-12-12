import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type CaveSystem = { map: Map<number, number[]>; start: number; end: number; };

@solutionInfo({
    day: 12,
    title: 'Passage Pathing'
})
export class Day12 extends SolutionBase {

    protected part1(): number {
        return this.findPathCount(this.parseCaveSystem(), 1);
    }

    protected part2(): number {
        return this.findPathCount(this.parseCaveSystem());
    }

    private findPathCount(caveSystem: CaveSystem, repeatedCave = 0, current?: number, visited?: Set<number>): number {
        const { map, start, end } = caveSystem;
        if (!current || !visited) {
            return this.findPathCount(caveSystem, repeatedCave, start, new Set([start]));
        }

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
            if (next === end) {
                pathCount++;
            } else {
                pathCount += this.findPathCount(caveSystem, nextRepeatedCave, next, visited);
            }
            if (nextRepeatedCave !== next) { visited.delete(next); }
        }

        return pathCount;
    }

    /** Creates a map of caves where small caves are <0 and large caves are >0. */
    private parseCaveSystem(): CaveSystem {
        let caveCount = 0;
        const connections = regexMatches(/(\w+)-(\w+)/g, this.input).map(([, a, b]) => [a, b]);
        const caves = [...new Set(connections.flat())];
        const caveIds = Object.fromEntries(caves.map(c => [c, ++caveCount * (c[0].toUpperCase() === c[0] ? 1 : -1)]));
        const map = new Map<number, number[]>(caves.map(x => [caveIds[x], []]));
        for (const [a, b] of connections) {
            map.get(caveIds[a])!.push(caveIds[b]);
            map.get(caveIds[b])!.push(caveIds[a]);
        }

        return { map, start: caveIds['start'], end: caveIds['end'] };
    }
}
