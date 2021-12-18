import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type SnailGroup = {
    kind: 'group';
    items: SnailNumber[];
    parent?: SnailGroup;
    sideInParent?: 0 | 1;
};

type SnailValue = {
    kind: 'value';
    value: number;
    parent: SnailGroup;
    sideInParent: 0 | 1;
};

type SnailNumber = SnailGroup | SnailValue;

@solutionInfo({
    day: 18,
    title: 'Snailfish'
})
export class Day18 extends SolutionBase {

    protected part1(): number {
        const snailNumbers = this.parseInput();
        const sum = snailNumbers.reduce((a, x) => this.add(a, x));
        const magnitude = this.magnitude(sum);

        return magnitude;
    }

    protected part2(): number {
        let maxMagnitude = Number.MIN_SAFE_INTEGER;
        for (let i = 0; i < this.inputLines.length; i++) {
            this.updateProgress(i / this.inputLines.length);
            for (let j = 0; j < this.inputLines.length; j++) {
                if (i === j) { continue; }

                // the 'add' operation mutates, so it is easier to just re-parse the numbers
                const snailNumbers = this.parseInput();
                const magnitude = this.magnitude(this.add(snailNumbers[i], snailNumbers[j]));
                maxMagnitude = Math.max(maxMagnitude, magnitude);
            }
        }

        return maxMagnitude;
    }

    private magnitude(sn: SnailNumber): number {
        if (sn.kind === 'value') { return sn.value; }
        return this.magnitude(sn.items[0]) * 3 + this.magnitude(sn.items[1]) * 2;
    }

    private add(sn1: SnailNumber, sn2: SnailNumber): SnailGroup {
        const result: SnailGroup = this.createSnailGroup([sn1, sn2]);
        sn1.parent = result;
        sn1.sideInParent = 0;
        sn2.parent = result;
        sn2.sideInParent = 1;

        let hasReduced = true;
        while (hasReduced) {
            hasReduced = this.explodeIfNeeded(result);
            if (hasReduced) { continue; }
            hasReduced = this.splitIfNeeded(result);
        }

        return result;
    }

    private splitIfNeeded(sn: SnailNumber): boolean {
        if (sn.kind === 'value') {
            if (sn.value >= 10) {
                this.split(sn);
                return true;
            }
            return false;
        }

        for (const child of sn.items) {
            if (this.splitIfNeeded(child)) { return true; }
        }

        return false;
    }

    private explodeIfNeeded(sn: SnailNumber, level = 0): boolean {
        if (sn.kind === 'value') { return false; }

        if (level === 4) {
            this.explode(sn);
            return true;
        }

        for (const child of sn.items) {
            if (this.explodeIfNeeded(child, level + 1)) { return true; }
        }

        return false;
    }

    private explode(sn: SnailGroup): void {
        for (const side of [0, 1] as const) {
            const neighbor = this.findRegularNeighbor(sn.items[side] as SnailValue, side);
            if (neighbor) { neighbor.value += (sn.items[side] as SnailValue).value; }
        }

        if (!sn.parent) { throw new Error('No parent for exploding pair!'); }
        sn.parent.items[sn.sideInParent!] = this.createSnailValue(0, sn.parent, sn.sideInParent!);
    }

    private split(sn: SnailValue): void {
        const group = sn as unknown as SnailGroup; // Convert into group
        group.kind = 'group';
        group.items = [Math.floor(sn.value / 2), Math.ceil(sn.value / 2)]
            .map((value, sideInParent) => this.createSnailValue(value, group, sideInParent));
    }

    private findRegularNeighbor(sv: SnailValue, side: 0 | 1): SnailValue | null {
        // go up until we can step towards the given side
        let sn: SnailNumber = sv;
        let neighbor: SnailNumber | undefined = undefined;
        while (!neighbor) {
            if (!sn.parent) { return null; }
            if (sn.sideInParent !== side) {
                neighbor = sn.parent.items[side];
            } else {
                sn = sn.parent;
            }
        }

        // Go down until we find a value
        const sideInverse = side === 0 ? 1 : 0;
        while (neighbor.kind !== 'value') {
            neighbor = neighbor.items[sideInverse];
        }

        return neighbor;
    }

    private parseInput(): SnailNumber[] {
        return this.inputLines.map(line => this.parseSnailNumber(line));
    }

    private parseSnailNumber(text: string) {
        const stack: SnailGroup[] = [];
        let prevPair: SnailGroup;
        let pair: SnailGroup = this.createSnailGroup([]);
        for (const char of text) {
            switch (char) {
                case '[':
                    prevPair = pair;
                    stack.push(prevPair);
                    pair = this.createSnailGroup([], prevPair, prevPair.items.length);
                    prevPair.items.push(pair);
                    break;
                case ']': pair = stack.pop()!; break;
                case ',': break;
                default: pair.items.push(this.createSnailValue(parseInt(char), pair, pair.items.length)); break;
            }
        }

        pair.items[0].parent = undefined;
        return pair.items[0];
    }

    private createSnailGroup(items: SnailNumber[], parent?: SnailGroup, sideInParent?: number) {
        return <SnailGroup>{ kind: 'group', items, parent, sideInParent };
    }

    private createSnailValue(value: number, parent: SnailGroup, sideInParent: number) {
        return <SnailValue>{ kind: 'value', value, parent, sideInParent };
    }

    private asString(sn: SnailNumber): string {
        if (sn.kind === 'value') {
            return sn.value.toString();
        } else {
            return '[' + sn.items.map(x => this.asString(x)).join(',') + ']';
        }
    }
}
