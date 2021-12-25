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
        const { commands } = this.initALU();
        const program = this.parseInput();
        const sections = program.reduce((a, x) => {
            if (x.kind === 'inp' && a[a.length - 1].length > 0) { a.push([]); }
            a[a.length - 1].push(x);
            return a;
        }, [[]] as Instruction[][]);

        const map = '999x9xx999xxxx';
        // const map = 'xxx9x99xxx9999';
        // const map = '9999999xxxxxxx';
        const inputs = this.generateInputs(map.split(''));

        // console.log(inputs.map(x => x.join('')).join('\n'));

        inputs.forEach((input, index) => {
            if (index % 10000 === 0) { this.updateProgress(index / inputs.length); }

            const memory = [0, 0, 0, 0] as Memory;
            let inputIndex = 0;
            for (const instruction of program) {
                if (instruction.kind === 'inp') {
                    commands[instruction.kind](memory, instruction.a, input[inputIndex++]);
                } else {
                    commands[instruction.kind](memory, instruction.a, instruction.b);
                }
            }

            if (memory[3] === 0) {
                console.log();
                console.log(input.join(''));
                console.log();
            }
        });

        // const sectionMatches: string[][][] = [];
        // sections.forEach((section, sectionIndex) => {
        //     section.forEach((command, commandIndex) => {
        //         const { kind, a, b } = command as Operator;
        //         [kind, a, b].forEach((x, i) => {
        //             if (!sectionMatches[commandIndex]) { sectionMatches[commandIndex] = []; }
        //             if (!sectionMatches[commandIndex][i]) { sectionMatches[commandIndex][i] = []; }
        //             sectionMatches[commandIndex][i].push(x);
        //         });
        //     });
        // });
        // console.log(sectionMatches);
        // console.log(sectionMatches.map(x => x.map(y => y.map(z => (z ?? '').padStart(3, ' ')).join('|')).join('\n')).join('\n\n'));



        this.noSolution();
    }

    private generateInputs(map: string[], result: string[] = [], results: string[][] = []): string[][] {
        if (result.length === map.length) {
            results.push(result.slice());
            return results;
        }

        const current = map[result.length];
        if (current === 'x') {
            for (let i = 9; i > 0; i--) {
                result.push(i.toString());
                this.generateInputs(map, result, results);
                result.pop();
            }
        } else {
            result.push(current);
            this.generateInputs(map, result, results);
            result.pop();
        }

        return results;
    }

    // private solve(map: string[], sections: Instruction[][], originalMemory: Memory, commands: Record<string, Command>) {
    //     const mappedInput = map.shift()!;
    //     const section = sections.shift()!;
    //     if (mappedInput === 'x') {
    //         for (let i = 9; i > 0; i--) {
    //             const input = i.toString();
    //             const memory = originalMemory.slice() as Memory;
    //             this.executeSection(input, section, memory, commands);
    //             if (sections.length === 0 && memory[0] === 0) {
    //                 return;
    //             }
    //         }
    //     } else {
    //         this.executeSection(mappedInput, section, originalMemory, commands);
    //     }

    //     map.unshift(mappedInput);
    //     sections.unshift(section);
    // }

    // private executeSection(input: string, section: Instruction[], memory: Memory, commands: Record<string, Command>) {

    // }

    private test(input: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9) {
        let [wInput, x, y, z] = [0, 0, 0, 0];
        wInput = input;
        x = z % 26;
        x += 10;                  //  10| 14| 14|-13| 10|-13| -7| 11| 10| 13| -4| -9|-13| -9
        x = x !== wInput ? 1 : 0; //   1|  1|  1|  ?|  1|  ?|  ?|  1|  1|  1|  ?|  ?|  ?|  ?

        z = Math.floor(z / 1);    //   1|  1|  1| 26|  1| 26| 26|  1|  1|  1| 26| 26| 26| 26
        z *= 25 * x + 1;
        y = (wInput + 2) * x;     //   2| 13| 13|  9| 15|  3|  6|  5| 16|  1|  6|  3|  7|  9
        z += y;

        // if (x === 0) {
        //     z2 = z + 1;
        // } else {
        //     
        // }

        // z2 = (z mod 26 + a) / b * 25 + 1 + 
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
        const matches = this.inputLines.map(x => x.split(' '));
        const commands = matches.map(([kind, a, b]) =>
            kind === 'inp' ? <InputInstruction>{ kind, a } : <Operator>{ kind, a, b }
        );
        return commands;
    }
}
