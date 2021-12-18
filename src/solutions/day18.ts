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
        const numbers = this.parseInput();
        const sum = numbers.reduce((a, x) => this.add(a, x));
        const magnitude = this.magnitude(sum);

        return magnitude;
    }

    protected part2(): number {
        let maxMagnitude = Number.MIN_SAFE_INTEGER;
        const numbers = this.parseInput();
        for (let i = 0; i < this.inputLines.length; i++) {
            this.updateProgress(i / this.inputLines.length);
            for (let j = 0; j < this.inputLines.length; j++) {
                if (i === j) { continue; }
                const a = this.clone(numbers[i]);
                const b = this.clone(numbers[j]);
                const magnitude = this.magnitude(this.add(a, b));
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

    private split(sv: SnailValue): void {
        const sg = sv as unknown as SnailGroup; // Convert into group
        sg.kind = 'group';
        sg.items = [Math.floor(sv.value / 2), Math.ceil(sv.value / 2)]
            .map((value, sideInParent) => this.createSnailValue(value, sg, sideInParent));
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

    private clone(sn: SnailNumber, parent?: SnailGroup) {
        parent ??= sn.parent;
        if (sn.kind === 'value') {
            return this.createSnailValue(sn.value, parent!, sn.sideInParent);
        }

        const clonedGroup = this.createSnailGroup([], parent, sn.sideInParent);
        sn.items.forEach(x => clonedGroup.items.push(this.clone(x, clonedGroup)));

        return clonedGroup;
    }

    private createSnailGroup(items: SnailNumber[], parent?: SnailGroup, sideInParent?: number) {
        return <SnailGroup>{ kind: 'group', items, parent, sideInParent };
    }

    private createSnailValue(value: number, parent: SnailGroup, sideInParent: number) {
        return <SnailValue>{ kind: 'value', value, parent, sideInParent };
    }
}
