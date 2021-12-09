import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

const neighbors = [[-1, 0], [0, -1], [1, 0], [0, 1]].map(p => ({ x: p[0], y: p[1] }));

@solutionInfo({
    day: 9,
    title: 'Smoke Basin'
})
export class Day09 extends SolutionBase {

    protected part1(): number {
        const { heightMap, width, height } = this.parseInput();
        let sum = 0;
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const current = heightMap[y][x];
                const isLowest = neighbors
                    .map(n => heightMap[y + n.y] && heightMap[y + n.y][x + n.x])
                    .every(n => n === undefined || current < n);
                if (isLowest) {
                    sum += 1 + current;
                }
            }
        }

        return sum;
    }

    protected part2(): number {
        this.noSolution();
    }

    private parseInput() {
        const heightMap = this.inputLines.map(line => regexMatches(/\d/g, line).map(x => parseInt(x[0])));

        return {
            heightMap,
            width: heightMap[0].length,
            height: heightMap.length
        };
    }
}
