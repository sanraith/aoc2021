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
        const program = this.parseInput();
        const sections = program.reduce((a, x) => {
            if (x.kind === 'inp' && a[a.length - 1].length > 0) { a.push([]); }
            a[a.length - 1].push(x);
            return a;
        }, [[]] as Instruction[][]);
        // console.log(sections);

        const alu = this.initALU();
        this.trySection(sections[0], alu.memory, alu.commands);

        const states = this.trySection(sections[0], alu.memory, alu.commands);
        const states2 = [];
        for (const state of states) {
            states2.push(...this.trySection(sections[1], state, alu.commands));
        }

        const states2Set = new Set<string>();
        states2.forEach(x => states2Set.add(x.join(';')));


        // console.log(states.length);
        // console.log(states2.length);
        console.log(states);
        console.log(states2);
        console.log(states2Set.size);
        // console.log(program);
        this.noSolution();
    }

    protected part2(): string | number {
        this.noSolution();
    }

    private trySection(section: Instruction[], originalMemory: Memory, commands: Record<string, Command>) {
        // const statesSet = new Set<string>();
        const states: Memory[] = [];
        for (let i = 1; i <= 9; i++) {
            const memory = originalMemory.slice() as Memory;
            section.forEach(cmd => {
                if (cmd.kind === 'inp') {
                    commands[cmd.kind](memory, cmd.a, i.toString());
                    return;
                }
                commands[cmd.kind](memory, cmd.a, cmd.b);
            });

            // const state = memory.join(';');
            // if (!statesSet.has(state)) {
            states.push(memory);
            // }
            // statesSet.add(state);
        }
        return states;
    }

    private initALU() {
        // const m: Memory = Object.fromEntries('wxyz'.split('').map(x => [x, 0]));
        const m: Memory = [0, 0, 0, 0];//Object.fromEntries('wxyz'.split('').map(x => [x, 0]));
        const i = (a: string) => a.charCodeAt(0) - 119;
        const v = (m: Memory, a: string) => m[a.charCodeAt(0) - 119] ?? parseInt(a);
        const commands = {
            'inp': (m: Memory, a: string, b: string) => m[i(a)] = v(m, b),
            'add': (m: Memory, a: string, b: string) => m[i(a)] += v(m, b),
            'mul': (m: Memory, a: string, b: string) => m[i(a)] *= v(m, b),
            'div': (m: Memory, a: string, b: string) => m[i(a)] = Math.floor(m[i(a)] / v(m, b)),
            'mod': (m: Memory, a: string, b: string) => m[i(a)] %= v(m, b),
            'eql': (m: Memory, a: string, b: string) => m[i(a)] = m[i(a)] === v(m, b) ? 1 : 0
        };

        return { memory: m, commands };
    }

    private parseInput(): Instruction[] {
        const matches = regexMatches(/(\w{3}) (\w)(?: (\w|-?\d+))?/g, this.input);
        const commands = matches.map(([, kind, a, b]) =>
            kind === 'inp' ? <InputInstruction>{ kind, a } : <Operator>{ kind, a, b }
        );
        return commands;
    }
}
