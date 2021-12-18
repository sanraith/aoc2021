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
        result.items.forEach((sn, i) => {
            sn.parent = result;
            sn.sideInParent = i as 0 | 1;
        });

        let isReduceNeeded = true;
        while (isReduceNeeded) {
            isReduceNeeded = this.explodeIfNeeded(result);
            if (isReduceNeeded) { continue; }
            isReduceNeeded = this.splitIfNeeded(result);
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

        return sn.items.some(child => this.splitIfNeeded(child));
    }

    private explodeIfNeeded(sn: SnailNumber, level = 0): boolean {
        if (sn.kind === 'value') { return false; }

        if (level === 4) {
            this.explode(sn);
            return true;
        }

        return sn.items.some(child => this.explodeIfNeeded(child, level + 1));
    }

    private explode(sn: SnailGroup): void {
        for (const side of [0, 1] as const) {
            const sibling = this.findValueSibling(sn.items[side] as SnailValue, side);
            if (sibling) { sibling.value += (sn.items[side] as SnailValue).value; }
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

    private findValueSibling(sv: SnailValue, side: 0 | 1): SnailValue | null {
        // go up until we can step towards the given side
        let sn: SnailNumber = sv;
        let sibling: SnailNumber | undefined = undefined;
        while (!sibling) {
            if (!sn.parent) { return null; }
            if (sn.sideInParent !== side) {
                sibling = sn.parent.items[side];
            } else {
                sn = sn.parent;
            }
        }

        // Go down until we find a value
        const sideInverse = side === 0 ? 1 : 0;
        while (sibling.kind !== 'value') {
            sibling = sibling.items[sideInverse];
        }

        return sibling;
    }

    private parseInput(): SnailNumber[] {
        return this.inputLines.map(line => this.parseSnailNumber(line));
    }

    private parseSnailNumber(text: string): SnailNumber {
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

    private clone(sn: SnailNumber, parent?: SnailGroup): SnailNumber {
        parent ??= sn.parent;
        if (sn.kind === 'value') {
            return this.createSnailValue(sn.value, parent!, sn.sideInParent);
        }

        const clonedGroup = this.createSnailGroup([], parent, sn.sideInParent);
        sn.items.forEach(x => clonedGroup.items.push(this.clone(x, clonedGroup)));

        return clonedGroup;
    }

    private createSnailGroup(items: SnailNumber[], parent?: SnailGroup, sideInParent?: number): SnailGroup {
        return <SnailGroup>{ kind: 'group', items, parent, sideInParent };
    }

    private createSnailValue(value: number, parent: SnailGroup, sideInParent: number): SnailValue {
        return <SnailValue>{ kind: 'value', value, parent, sideInParent };
    }
}
