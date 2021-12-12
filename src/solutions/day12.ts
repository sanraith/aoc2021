import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 12,
    title: 'Passage Pathing'
})
export class Day12 extends SolutionBase {

    protected part1(): number {
        const { numberMap, start, end/*, cavesAsNumbers*/ } = this.parseInput();
        const paths = this.findPaths(start, end, numberMap, new Set([start]), []);
        // console.log(paths);
        // console.log(paths.map(p => p.map(x => Object.entries(cavesAsNumbers).find(e => e[1] === x)![0])));
        // this.noSolution();
        return paths.length;
    }

    protected part2(): number {
        const { numberMap, start, end/*, cavesAsNumbers*/ } = this.parseInput();
        const paths = this.findPaths2(start, start, end, numberMap, [start], []);
        // console.log(paths.map(path =>
        //     path.map(cave => Object.entries(cavesAsNumbers).find(e => e[1] === cave)![0])
        //         .join(',')
        // ).sort());

        return paths.length;
    }

    private findPaths(start: number, target: number, numberMap: Map<number, number[]>,
        visited: Set<number>,
        results: number[][]
    ) {
        const options = numberMap.get(start)!;
        for (const next of options) {
            if (next < 0 && visited.has(next)) { continue; }

            visited.add(next);
            if (next === target) {
                results.push([...visited.values()]);
            } else {
                this.findPaths(next, target, numberMap, visited, results);
            }
            visited.delete(next);
        }

        return results;
    }

    private findPaths2(
        start: number, current: number, target: number,
        numberMap: Map<number, number[]>,
        visited: number[],
        results: number[][],
        twiceIn = 0
    ) {
        const options = numberMap.get(current)!;
        for (const next of options) {
            if (next === start) { continue; }

            let twice = twiceIn;
            if (next < 0 && visited.includes(next)) {
                if (twice !== 0) {
                    continue;
                }
                twice = next;
            }

            visited.push(next);
            if (next === target) {
                results.push([...visited.values()]);
            } else {
                this.findPaths2(start, next, target, numberMap, visited, results, twice);
            }
            visited.pop();
        }

        return results;
    }

    private parseInput() {
        const caves = regexMatches(/(\w+)-(\w+)/g, this.input).map(lineMatch => {
            const [, a, b] = lineMatch;
            return { a, b };
        });

        let count = 1;
        const asNumbers: Record<string, number> = {};
        const map: Record<string, string[]> = {};
        const numberMap = new Map<number, number[]>();
        for (const { a, b } of caves) {
            !map[a] && (map[a] = []);
            !map[b] && (map[b] = []);
            !map[a].includes(b) && map[a].push(b);

            !asNumbers[a] && (asNumbers[a] = count++ * (a[0].toUpperCase() === a[0] ? 1 : -1));
            !asNumbers[b] && (asNumbers[b] = count++ * (b[0].toUpperCase() === b[0] ? 1 : -1));
            !numberMap.has(asNumbers[a]) && numberMap.set(asNumbers[a], []);
            !numberMap.has(asNumbers[b]) && numberMap.set(asNumbers[b], []);
            numberMap.get(asNumbers[a])!.push(asNumbers[b]);
            numberMap.get(asNumbers[b])!.push(asNumbers[a]);
        }

        // console.log(map);
        // console.log(asNumbers);
        // console.log(numberMap);

        return {
            caves,
            numberMap: numberMap,
            cavesAsNumbers: asNumbers,
            start: asNumbers['start'],
            end: asNumbers['end']
        };
    }
}
