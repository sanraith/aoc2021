import { memo } from 'react';
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
type Memory = [number, number, number, number];
type Command = (m: Memory, a: string, b: string) => void;
type ALU = { memory: Memory, commands: Record<string, Command>; };
@solutionInfo({
    day: 24,
    title: 'Arithmetic Logic Unit'
})
export class Day24 extends SolutionBase {

    protected part1(): string | number {
        const { commands } = this.initALU();
        const program = this.parseInput();
        const sections = program.reduce((a, x) => {
            if (x.kind === 'inp' && a[a.length - 1].length > 0) { a.push([]); }
            a[a.length - 1].push(x);
            return a;
        }, [[]] as Instruction[][]);

        type Hit = { digits: number[]; out: number; in: Set<number>; };
        type Asd = Hit[];
        let targets: Asd = [];
        targets.push({
            digits: [],
            out: 0,
            in: new Set([0])
        });


        const params = this.extractParams(sections);
        // console.log(params);
        // return '';

        const MAX = 1000000;

        // let targets = new Set([0]);
        let hitCache: Set<Hit>[] = [];
        hitCache[0] = new Set([targets[0]]);

        for (let sectionIndex = sections.length - 1; sectionIndex >= 0; sectionIndex--) {
            const section = sections[sectionIndex];
            const nextTargets: typeof targets = [];
            const nextHitCache: typeof hitCache = [];
            for (let input = 9; input > 0; input--) {
                const inputStr = input.toString();
                const inputs = [inputStr];

                for (let zIn = 0; zIn < MAX; zIn++) {
                    // const zOut = this.execute(zIn, section, commands, inputs);
                    const zOut = this.test2(input, zIn, params[sectionIndex]);

                    // const hits = targets.filter(x => x.in.has(zOut));
                    const hits = hitCache[zOut];

                    for (const hit of hits ?? []) {
                        let hit2 = nextTargets.find(x => x.digits[0] === input && x.out === zOut);
                        if (!hit2) {
                            hit2 = {
                                digits: [input, ...hit.digits],
                                in: new Set([zIn]),
                                out: zOut
                            };
                            nextTargets.push(hit2);
                        } else {
                            hit2.in.add(zIn);
                        }
                        if (!nextHitCache[zIn]) { nextHitCache[zIn] = new Set(); }
                        nextHitCache[zIn].add(hit2);
                    }

                    // if (targets.has(zOut)) {
                    //     console.log({ sectionIndex, inputNumber: input, zIn, zOut });
                    //     nextTargets.add(zIn);
                    // }
                }
            }
            targets = nextTargets;

            // const duplicates = new Set<string>();
            // targets = targets.map(item => ({ item, hash: item.out + '|' + [...item.in].join(',') }))
            //     .filter(x => {
            //         if (duplicates.has(x.hash)) { return false; }
            //         duplicates.add(x.hash); return true;
            //     }).map(x => x.item);
            console.log(sectionIndex, targets.length);
            hitCache = nextHitCache;
            // const results = targets.map(x => x.digits.join('')).sort((a, b) => b.localeCompare(a));
            // console.log(results);

            // console.log(targets.map(x => ({ digits: x.digits.join(''), in: [...x.in].join(','), out: x.out })));

            // if (sectionIndex < 13) { break; }
        }
        // console.log(targets.map(x => x.digits.join('')).join('\n'));

        const results = targets.map(x => x.digits.join('')).sort((a, b) => b.localeCompare(a));
        console.log(results);

        return results[0];

        // 93997996694192 too low
        // 93997999296912
    }

    protected part2(): string | number {
        //83997999296911 too high
        this.noSolution();
    }

    private extractParams(sections: Instruction[][]): number[][] {
        const result = [];
        for (const section of sections) {
            result.push([4, 5, 15].map(x => parseInt((section[x] as Operator).b)));
        }

        return result;
    }


    private execute(z: number, section: Instruction[], commands: Record<string, Command>, input: string[]) {
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

    private test2(w: number, zIn: number, params: number[]) {
        const [a, b, c] = params;
        let [x, y, z] = [0, 0, zIn];
        x = z % 26;
        z = Math.floor(z / a);   //   1|  1|  1| 26|  1| 26| 26|  1|  1|  1| 26| 26| 26| 26
        x += b;                  //  10| 14| 14|-13| 10|-13| -7| 11| 10| 13| -4| -9|-13| -9
        x = x !== w ? 1 : 0;     //   1|  1|  1|  ?|  1|  ?|  ?|  1|  1|  1|  ?|  ?|  ?|  ?
        z *= 25 * x + 1;
        y = (w + c) * x;         //   2| 13| 13|  9| 15|  3|  6|  5| 16|  1|  6|  3|  7|  9
        z += y;

        return z;
    }

    private test(input: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9, m = [0, 0, 0, 0]) {
        let [wInput, x, y, z] = m;
        wInput = input;
        x = z % 26;
        x += -9;                  //  10| 14| 14|-13| 10|-13| -7| 11| 10| 13| -4| -9|-13| -9
        x = x !== wInput ? 1 : 0; //   1|  1|  1|  ?|  1|  ?|  ?|  1|  1|  1|  ?|  ?|  ?|  ?

        z = Math.floor(z / 26);   //   1|  1|  1| 26|  1| 26| 26|  1|  1|  1| 26| 26| 26| 26
        z *= 25 * x + 1;
        y = (wInput + 9) * x;     //   2| 13| 13|  9| 15|  3|  6|  5| 16|  1|  6|  3|  7|  9
        z += y;

        // console.log({ x, y, z });
        return z;
    }

    // wInput = input;
    // x = z % 26;               //   1|  2|  3|   |   |   |   |   |   |   |   |   |   |   
    // x += 10;                  //  10| 14| 14|-13| 10|-13| -7| 11| 10| 13| -4| -9|-13| -9
    // x = x !== wInput ? 1 : 0; //   0|  0|  0|  ?|  0|  ?|  ?|  0|  0|  0|  ?|  ?|  ?|  ?

    // z = Math.floor(z / 1);    //   1|  1|  1| 26|  1| 26| 26|  1|  1|  1| 26| 26| 26| 26
    // z *= 25 * x + 1;
    // y = (wInput + 2) * x;     //   2| 13| 13|  9| 15|  3|  6|  5| 16|  1|  6|  3|  7|  9
    // z += y;

    // w = input;
    // x = 0;//x *= 0;
    // x += z;
    // x %= 26;
    // z = Math.floor(z / 1); //   1|  1|  1| 26|  1| 26| 26|  1|  1|  1| 26| 26| 26| 26
    // x += 10;               //  10| 14| 14|-13| 10|-13| -7| 11| 10| 13| -4| -9|-13| -9
    // //x = x === w ? 1 : 0;
    // x = x !== w ? 1 : 0;//x = x === 0 ? 1 : 0;
    // y = 0; //y *= 0;
    // y += 25;
    // y *= x;
    // y += 1;
    // z *= y;
    // y = 0;//y *= 0;
    // y += w;
    // y += 2;                //   2| 13| 13|  9| 15|  3|  6|  5| 16|  1|  6|  3|  7|  9
    // y *= x;
    // z += y;


    // w = input;
    // x = 0;//x *= 0;
    // x += z;
    // x %= 26;
    // // z = Math.floor(z / 1);
    // x += 10;
    // //x = x === w ? 1 : 0;
    // x = x !== w ? 1 : 0;//x = x === 0 ? 1 : 0;
    // y = 0; //y *= 0;
    // y += 25;
    // y *= x;
    // y += 1;
    // z *= y;
    // y = 0;//y *= 0;
    // y += w;
    // y += 2;
    // y *= x;
    // z += y;

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
        const matches = this.inputLines.map(x => x.split(' '));
        const commands = matches.map(([kind, a, b]) =>
            kind === 'inp' ? <InputInstruction>{ kind, a } : <Operator>{ kind, a, b }
        );
        return commands;
    }
}
