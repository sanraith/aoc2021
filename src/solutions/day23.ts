import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Point = { x: number; y: number; };
type Crab = { type: string; pos: number; };
type MapInfo = {
    map: string[];
    crabs: Crab[];
    validPositions: Set<number>,
    hallway: number[],
    hallwaySet: Set<number>,
    targets: Record<string, number[]>;
    paths: (number[] | null)[][];
};

const EMPTY = '.' as const;
const [RIGHT, DOWN, LEFT, UP] = [0, 1, 2, 3] as const;
const costs: Record<string, number> = { 'A': 1, 'B': 10, 'C': 100, 'D': 1000 } as const;

@solutionInfo({
    day: 23,
    title: 'Amphipod'
})
export class Day23 extends SolutionBase {
    private width = 0;
    private height = 0;
    private directions: number[] = [];

    protected part1(): number {
        const mapInfo = this.parseInput();

        const targetHash = this.hash([
            { /*type: 'A',*/ pos: this.toIndex(3, 2) },
            { /*type: 'A',*/ pos: this.toIndex(3, 3) },
            { /*type: 'B',*/ pos: this.toIndex(5, 2) },
            { /*type: 'B',*/ pos: this.toIndex(5, 3) },
            { /*type: 'C',*/ pos: this.toIndex(7, 2) },
            { /*type: 'C',*/ pos: this.toIndex(7, 3) },
            { /*type: 'D',*/ pos: this.toIndex(9, 2) },
            { /*type: 'D',*/ pos: this.toIndex(9, 3) },
        ]); // 2931333542444648

        const shortest = this.findShortest(mapInfo, targetHash);
        return shortest;
    }

    protected part2(): string | number {
        this.noSolution();
    }

    private findShortest(mapInfo: MapInfo, targetHash: number, visited = new Map<number, number>(), cost = 0, min = Number.MAX_SAFE_INTEGER): number {
        if (cost >= min) { return min; }

        const { map, crabs, hallway, hallwaySet, targets, paths } = mapInfo;
        const hash = this.hash(crabs);
        const visitedCost = visited.get(hash);
        if (visitedCost !== undefined && visitedCost <= cost) {
            return min;
        }
        visited.set(hash, cost);
        if (hash === targetHash) {
            return cost;
        }

        const crabPositionsSet = new Set(crabs.map(x => x.pos));

        const crabMoveCandidates = crabs
            .map((crab) => {
                const { type, pos } = crab;
                let targetCandidates: number[] = [];
                if (hallwaySet.has(pos)) {
                    // Move into target room if there is room available and no crab of different type is in the room
                    if (targets[type].every(p => map[p] === EMPTY || map[p] === type)) {
                        const target = targets[type].filter(p => map[p] === EMPTY)[0]; // fills bottom up
                        if (target !== undefined) { targetCandidates = [target]; }
                    }
                } else {
                    // Move out of the room to the hallway, if no other crab is blocking it
                    if (map[crab.pos + this.directions[UP]] === EMPTY && !targets[crab.type].every(p => map[p] === crab.type)) {
                        targetCandidates = hallway.filter(p => map[p] === EMPTY);
                    }
                }

                return { crab, targetCandidates };
            })
            .map(({ crab, targetCandidates }) => {
                const validCandidates = targetCandidates
                    .map(candidate => paths[crab.pos][candidate] as number[])
                    .filter(path => path !== null && path.every(p => !crabPositionsSet.has(p)));
                return { crab, paths: validCandidates };
            })
            .filter(x => x && x.paths.length > 0)
            .flatMap(({ crab, paths }) => paths.map(path => ({ crab, path })))
            .sort((a, b) => a.path.length - b.path.length); // TODO use target?

        for (const { crab, path } of crabMoveCandidates) {
            const targetPos = path[path.length - 1];
            const posBefore = crab.pos;
            map[crab.pos] = EMPTY;
            map[targetPos] = crab.type;
            crab.pos = targetPos;

            const totalCost = this.findShortest(mapInfo, targetHash, visited, cost + costs[crab.type] * path.length, min);
            if (totalCost < min) {
                min = totalCost;
            }

            crab.pos = posBefore;
            map[targetPos] = EMPTY;
            map[crab.pos] = crab.type;
        }

        return min;
    }

    private hash(crabs: { pos: number; }[]): number {
        const c = crabs.map(x => x.pos);
        const hash = [[c[0], c[1]], [c[2], c[3]], [c[4], c[5]], [c[6], c[7]]]
            .reduce((sum, [a, b]) => sum * 10000 + Math.min(a, b) * 100 + Math.max(a, b), 0);

        return hash;
    }

    private parseInput(): MapInfo {
        const crabRegex = /[ABCD]/;
        this.width = this.inputLines[0].length;
        this.height = this.inputLines.length;
        this.directions = [[1, 0], [0, 1], [-1, 0], [0, -1]].map(([x, y]) => this.toIndex(x, y));

        const map = this.inputLines.flatMap(line => line.padEnd(this.width, ' ').split(''));

        const crabs = map.map((type, pos) => ({ type, pos }))
            .filter(({ type }) => crabRegex.test(type))
            .sort((a, b) => a.type.localeCompare(b.type));

        const validPositions = map.map((type, index) => ({ type, index }))
            .filter(({ type, index }) =>
                crabRegex.test(type) ||
                (type === '.' && !crabRegex.test(map[index + this.directions[DOWN]]))
            ).map(({ index }) => index);

        const hallway = validPositions.filter(p => this.toPoint(p).y === 1);

        const targets = Object.fromEntries(crabs.map(({ type }) => {
            const typeIndex = type.charCodeAt(0) - 65;
            const x = 3 + typeIndex * 2;
            return [type, [3, 2].map(y => this.toIndex(x, y))];
        }));

        const paths = Array(map.length).fill(0).map(() => Array(map.length).fill(null));
        validPositions.forEach((start, vpIndex) => {
            for (const end of validPositions.slice(vpIndex + 1)) {
                const path = this.findPath(map, start, end);
                paths[start][end] = path?.slice(1) ?? null;
                paths[end][start] = path?.reverse().slice(1) ?? null;
            }
        });

        return {
            map, crabs, targets, hallway, paths,
            validPositions: new Set(validPositions),
            hallwaySet: new Set(hallway)
        };
    }

    private findPath(map: string[], start: number, end: number): number[] | null {
        const visited = new Set<number>();
        const validCells = new Set('.ABCD');
        const queue = [{ current: start, path: [start] as number[] }];

        while (queue.length > 0) {
            const { current, path } = queue.shift()!;
            if (current === end) { return path; }

            for (const dir of this.directions) {
                const next = current + dir;
                if (!visited.has(next) && validCells.has(map[next])) {
                    queue.push({ current: next, path: [...path, next] });
                    visited.add(next);
                }
            }
        }

        return null;
    }

    private visualize(map: string[]) {
        const line = map.reduce((a, char, index) => {
            if (index % this.width === 0) {
                a += '\n';
            }
            return a + char;
        }, '');
        console.log(line);
    }

    private toIndex(x: number, y: number): number { return y * this.width + x; }
    private toPoint(index: number): Point { return { x: index % this.width, y: Math.floor(index / this.width) }; }
}
