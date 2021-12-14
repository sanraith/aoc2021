import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Rule = { pair: string; newElement: string; };

@solutionInfo({
    day: 14,
    title: 'Extended Polymerization'
})
export class Day14 extends SolutionBase {

    protected part1(): number {
        const { template, rules } = this.parseInput();

        let polymer = template;
        for (let i = 0; i < 10; i++) {
            this.updateProgress(i / 10);
            polymer = this.step(polymer, rules);
        }

        const commonality = Object
            .entries(polymer.split('').reduce((a, x) => {
                if (!a[x]) { a[x] = 0; }
                a[x]++;
                return a;
            }, {} as Record<string, number>))
            .map(([char, count]) => ({ char, count }))
            .sort((a, b) => a.count - b.count);
        const leastCommon = commonality[0].count;
        const mostCommon = commonality[commonality.length - 1].count;

        return mostCommon - leastCommon;
    }

    protected part2(): string | number {
        this.noSolution();
    }

    private step(polymer: string, rules: Rule[]) {
        const area: string[] = [];
        for (let i = 0; i < polymer.length - 1; i++) {
            const rule = rules.find(r => r.pair[0] === polymer[i] && r.pair[1] === polymer[i + 1]);
            if (rule) {
                area.push(polymer[i], rule.newElement);
            } else {
                area.push(polymer[i]);
            }
        }
        area.push(polymer[polymer.length - 1]);

        return area.join('');
    }

    private parseInput() {
        const template = (this.input).match(/^\w+/m)?.[0] ?? '';
        const rules = regexMatches(/(\w{2}) -> (\w)/g, this.input)
            .map(([, pair, newElement]) => ({ pair, newElement }));

        return { template, rules };
    }
}
