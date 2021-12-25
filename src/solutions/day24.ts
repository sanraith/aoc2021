import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type InputInstruction = { kind: 'inp'; a: string; };
type OpInstruction = { kind: 'add' | 'mul' | 'div' | 'mod' | 'eql'; a: string; b: string; };
type Instruction = OpInstruction | InputInstruction;

type Memory = [number, number, number, number];
type Command = (m: Memory, a: string, b: string) => void;
type ALU = { memory: Memory, commands: Record<string, Command>; };
type Hit = { digits: number[]; out: number; in: Set<number>; };

const BRUTE_FORCE_MAX_Z = 1000000;

@solutionInfo({
    day: 24,
    title: 'Arithmetic Logic Unit'
})
export class Day24 extends SolutionBase {

    protected part1(): string | number {
        const program = this.parseInput();
        const possibleNumbers = this.findModelNumber(program, -1);
        const largestModelNumber = possibleNumbers.sort().reverse()[0];

        return largestModelNumber;
    }

    protected part2(): string | number {
        const program = this.parseInput();
        const possibleNumbers = this.findModelNumber(program, 1);
        const smallestModelNumber = possibleNumbers.sort()[0];

        return smallestModelNumber;
    }


    private findModelNumber(program: Instruction[], direction: 1 | -1): string[] {
        const [from, until, delta] = direction === 1 ? [1, 10, 1] : [9, 0, -1];
        const sections = program.reduce((a, x) => {
            if (x.kind === 'inp' && a[a.length - 1].length > 0) { a.push([]); }
            a[a.length - 1].push(x);
            return a;
        }, [[]] as Instruction[][]);
        const paramsBySection = this.extractParams(sections);

        let targets: Hit[] = [{ digits: [], out: 0, in: new Set([0]) }];
        let cache: Set<Hit>[] = [new Set([targets[0]])];

        for (let sectionIndex = sections.length - 1; sectionIndex >= 0; sectionIndex--) {
            this.updateProgress((sections.length - 1 - sectionIndex) / sections.length);
            const nextTargets: typeof targets = [];
            const nextCache: typeof cache = [];

            for (let input = from; input !== until; input += delta) {
                for (let zIn = 0; zIn < BRUTE_FORCE_MAX_Z; zIn++) {
                    const zOut = this.executeCompiledSection(input, zIn, paramsBySection[sectionIndex]);
                    const hits = cache[zOut];
                    if (!hits) { continue; }

                    for (const hit of hits) {
                        let nextTarget = nextTargets.find(x => x.digits[0] === input && x.out === zOut);
                        if (!nextTarget) {
                            nextTarget = {
                                digits: [input, ...hit.digits],
                                in: new Set([zIn]),
                                out: zOut
                            };
                            nextTargets.push(nextTarget);
                        } else {
                            nextTarget.in.add(zIn);
                        }

                        if (!nextCache[zIn]) { nextCache[zIn] = new Set(); }
                        nextCache[zIn].add(nextTarget);
                    }
                }
            }

            targets = nextTargets;
            cache = nextCache;
        }

        return targets.map(x => x.digits.join(''));
    }

    /** Extract the 3 variable parts of each section, derived by hand analysis. */
    private extractParams(sections: Instruction[][]): number[][] {
        const result = [];
        for (const section of sections) {
            result.push([4, 5, 15].map(x => parseInt((section[x] as OpInstruction).b)));
        }

        return result;
    }

    /** "Compiled" by hand, lol */
    private executeCompiledSection(w: number, z: number, params: number[]) {
        const [a, b, c] = params;
        let x = z % 26;
        z = Math.floor(z / a); //   1|  1|  1| 26|  1| 26| 26|  1|  1|  1| 26| 26| 26| 26
        x += b;                //  10| 14| 14|-13| 10|-13| -7| 11| 10| 13| -4| -9|-13| -9
        x = x !== w ? 1 : 0;
        z *= 25 * x + 1;
        z += (w + c) * x;      //   2| 13| 13|  9| 15|  3|  6|  5| 16|  1|  6|  3|  7|  9

        return z;
    }

    private executeInterpreted(z: number, section: Instruction[], commands: Record<string, Command>, input: string[]) {
        const memory = [0, 0, 0, z] as Memory;
        let inputIndex = 0;
        for (const instruction of section) {
            if (instruction.kind === 'inp') {
                commands[instruction.kind](memory, instruction.a, input[inputIndex++]);
            } else {
                commands[instruction.kind](memory, instruction.a, instruction.b);
            }
        }
        return memory[3];
    }

    private initALU(): ALU {
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

        return { memory: [0, 0, 0, 0], commands };
    }

    private parseInput(): Instruction[] {
        const matches = this.inputLines.map(x => x.split(' '));
        const commands = matches.map(([kind, a, b]) =>
            kind === 'inp' ? <InputInstruction>{ kind, a } : <OpInstruction>{ kind, a, b }
        );
        return commands;
    }
}
