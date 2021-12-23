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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const mapInfo = this.parseInput('as normal');
        const targetHash = this.getTargetHash(mapInfo);
        const shortest = this.findCheapest(mapInfo, targetHash);

        return shortest;
    }

    protected part2(): number {
        const mapInfo = this.parseInput('add extra lines');
        const targetHash = this.getTargetHash(mapInfo);
        const shortest = this.findCheapest(mapInfo, targetHash);

        return shortest;
    }

    private getTargetHash(mapInfo: MapInfo) {
        const targetIndexes = Object.fromEntries(Object.keys(costs).map(k => [k, 0]));
        const targetHash = this.hash(mapInfo.crabs
            .map(c => ({ type: c.type, pos: mapInfo.targets[c.type][targetIndexes[c.type]++] }))
            .sort((a, b) => a.type.localeCompare(b.type))
        );

        return targetHash;
    }

    private findCheapest(mapInfo: MapInfo, targetHash: string, visited = new Map<string, number>(), cost = 0, min = Number.MAX_SAFE_INTEGER): number {
        if (cost >= min) { return min; }

        const { map, crabs, hallway, hallwaySet, targets, paths } = mapInfo;
        const hash = this.hash(crabs);
        const visitedCost = visited.get(hash);
        if (visitedCost !== undefined && visitedCost <= cost) { return min; }
        visited.set(hash, cost);
        if (hash === targetHash) { return cost; }

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

                const validCandidates = targetCandidates
                    .map(candidate => paths[crab.pos][candidate] as number[])
                    .filter(path => path !== null && path.every(p => !crabPositionsSet.has(p)));

                return { crab, paths: validCandidates };
            })
            .filter(x => x && x.paths.length > 0)
            .flatMap(({ crab, paths }) => paths.map(path => ({
                crab, path, distanceToTarget: this.manhattan(path[path.length - 1], targets[crab.type][0])
            })))
            .sort((a, b) => a.distanceToTarget - b.distanceToTarget); // prefer to go in or be closer to target

        crabMoveCandidates.forEach(({ crab, path }, index) => {
            if (cost === 0) { this.updateProgress(index / crabMoveCandidates.length); }

            const targetPos = path[path.length - 1];
            const posBefore = crab.pos;
            map[crab.pos] = EMPTY;
            map[targetPos] = crab.type;
            crab.pos = targetPos;

            const totalCost = this.findCheapest(mapInfo, targetHash, visited, cost + costs[crab.type] * path.length, min);
            if (totalCost < min) { min = totalCost; }

            crab.pos = posBefore;
            map[targetPos] = EMPTY;
            map[crab.pos] = crab.type;
        });

        return min;
    }

    private hash(crabs: { pos: number; }[]): string {
        const groupSize = crabs.length / 4;
        const groupCount = crabs.length / groupSize;
        const positions = crabs.map(x => x.pos);
        const parts = [];
        for (let i = 0; i < groupCount; i++) {
            parts.push(positions.slice(i * groupSize, (i + 1) * groupSize).sort((a, b) => a - b).join(';'));
        }

        return parts.join('|');
    }

    private parseInput(mode: 'as normal' | 'add extra lines'): MapInfo {
        const crabRegex = /[ABCD]/;
        const lines = this.inputLines.slice();
        const targetYPositions = [3, 2];
        if (mode === 'add extra lines') {
            lines.splice(3, 0, '  #D#C#B#A#', '  #D#B#A#C#');
            targetYPositions.splice(0, 0, 5, 4);
        }
        this.width = lines[0].length;
        this.height = lines.length;
        this.directions = [[1, 0], [0, 1], [-1, 0], [0, -1]].map(([x, y]) => this.toIndex(x, y));

        const map = lines.flatMap(line => line.padEnd(this.width, ' ').split(''));

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
            return [type, targetYPositions.map(y => this.toIndex(x, y))];
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

    private manhattan(i1: number, i2: number): number {
        const p1 = this.toPoint(i1);
        const p2 = this.toPoint(i2);
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }
    private toIndex(x: number, y: number): number { return y * this.width + x; }
    private toPoint(index: number): Point { return { x: index % this.width, y: Math.floor(index / this.width) }; }
}
