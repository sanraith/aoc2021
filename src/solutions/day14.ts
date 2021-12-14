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

    protected part2(): number {
        const { template, rules } = this.parseInput();
        const letters = [...new Set([...rules.flatMap(x => x.pair.split('')), ...rules.map(x => x.newElement)])];
        const combinations = letters.flatMap(a => letters.map(b => a + b)).sort((a, b) => a.localeCompare(b));
        const letterCounts = Object.fromEntries(letters.map(x => [x, 0]));
        const combinationCounts = Object.fromEntries(combinations.map(x => [x, 0]));

        template.split('').forEach((c, i, a) => {
            letterCounts[c]++;
            if (i < a.length - 1) {
                combinationCounts[c + a[i + 1]]++;
            }
        });

        const extendedRules = Object.fromEntries(rules.map(r => ({
            ...r,
            affects: [r.pair[0] + r.newElement, r.newElement + r.pair[1]]
        })).map(r => [r.pair, r]));
        for (let step = 0; step < 40; step++) {
            for (const [key, count] of Object.entries(combinationCounts).filter(([, count]) => count > 0)) {
                const { affects, newElement } = extendedRules[key];
                if (!affects) { continue; }

                letterCounts[newElement] += count;
                combinationCounts[key] -= count;
                affects.forEach(x => {
                    combinationCounts[x] += count;
                });
            }
        }

        const commonality = Object.entries(letterCounts)
            .map(([char, count]) => ({ char, count }))
            .sort((a, b) => a.count - b.count);

        const leastCommon = commonality[0].count;
        const mostCommon = commonality[commonality.length - 1].count;

        return mostCommon - leastCommon;
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
