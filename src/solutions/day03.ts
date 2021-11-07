import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Pos = {
    x: number,
    y: number
}

@solutionInfo({
    day: 3,
    title: 'Toboggan Trajectory'
})
export class Day03 extends SolutionBase {

    protected part1(): number {
        const slope = { x: 3, y: 1 };
        const treeCount = this.getTreeCount(slope);

        return treeCount;
    }

    protected part2(): number {
        const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].map(p => ({ x: p[0], y: p[1] }));
        const treeCounts = slopes.map(p => this.getTreeCount(p));
        const result = treeCounts.reduce((a, c) => a * c, 1);

        return result;
    }

    private getTreeCount(slope: Pos): number {
        const map = this.inputLines;
        const width = map[0].length;
        const height = map.length;

        let pos = { x: 0, y: 0 };
        let treeCount = 0;
        while (pos.y < height) {
            const isTree = map[pos.y][pos.x % width] === '#';
            if (isTree) {
                treeCount++;
            }
            pos = this.add(pos, slope);
        }

        return treeCount;
    }

    private add(a: Pos, b: Pos): Pos {
        return { x: a.x + b.x, y: a.y + b.y };
    }
}
