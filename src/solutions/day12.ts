import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 12,
    title: 'Passage Pathing'
})
export class Day12 extends SolutionBase {

    protected part1(): number {
        const { numberMap, start, end } = this.parseInput();
        this.noSolution();
    }

    protected part2(): number {
        this.noSolution();
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
