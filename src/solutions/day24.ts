import { cpuUsage } from 'process';
import { memo } from 'react';
import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type InputInstruction = {
    kind: 'inp';
    a: string;
};
type Operator = {
    kind: 'add' | 'mul' | 'div' | 'mod' | 'eql';
    a: string; b: string;
};
type Instruction = Operator | InputInstruction;
// type Memory = Record<string, number>;
type Memory = [number, number, number, number];//Record<string, number>;
type Command = (m: Memory, a: string, b: string) => void;
type ALU = { memory: Memory, commands: Record<string, Command>; };
@solutionInfo({
    day: 24,
    title: 'Arithmetic Logic Unit'
})
export class Day24 extends SolutionBase {

    protected part1(): string | number {
        const alu = this.initALU();
        const program = this.parseInput();
        const sections = program.reduce((a, x) => {
            if (x.kind === 'inp' && a[a.length - 1].length > 0) { a.push([]); }
            a[a.length - 1].push(x);
            return a;
        }, [[]] as Instruction[][]);

        const sectionMatches: string[][][] = [];
        sections.forEach((section, sectionIndex) => {
            section.forEach((command, commandIndex) => {
                const { kind, a, b } = command as Operator;
                [kind, a, b].forEach((x, i) => {
                    if (!sectionMatches[commandIndex]) { sectionMatches[commandIndex] = []; }
                    if (!sectionMatches[commandIndex][i]) { sectionMatches[commandIndex][i] = []; }
                    sectionMatches[commandIndex][i].push(x);
                });
            });
        });
        console.log();
        console.log(sectionMatches.map(x => x.map(y => y.map(z => (z ?? '').padStart(3, ' ')).join('|')).join('\n')).join('\n\n'));

        this.noSolution();
    }

    protected part2(): string | number {
        this.noSolution();
    }

    private initALU() {
        const i = (a: string) => a.charCodeAt(0) - 119; // i as index
        const v = (m: Memory, a: string) => m[a.charCodeAt(0) - 119] ?? parseInt(a); // v as value
        const commands: Record<string, Command> = {
            'inp': (m, a, b) => m[i(a)] = v(m, b),
            'add': (m, a, b) => m[i(a)] += v(m, b),
            'mul': (m, a, b) => m[i(a)] *= v(m, b),
            'div': (m, a, b) => m[i(a)] = Math.floor(m[i(a)] / v(m, b)),
            'mod': (m, a, b) => m[i(a)] %= v(m, b),
            'eql': (m, a, b) => m[i(a)] = m[i(a)] === v(m, b) ? 1 : 0
        };

        return { memory: [0, 0, 0, 0], commands, memoryIndex: i, getValue: v };
    }

    private parseInput(): Instruction[] {
        const matches = regexMatches(/(\w{3}) (\w)(?: (\w|-?\d+))?/g, this.input);
        const commands = matches.map(([, kind, a, b]) =>
            kind === 'inp' ? <InputInstruction>{ kind, a } : <Operator>{ kind, a, b }
        );
        return commands;
    }
}
