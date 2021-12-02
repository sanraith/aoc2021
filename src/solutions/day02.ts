import { regexMatches } from '../core/helpers';
import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

@solutionInfo({
    day: 2,
    title: 'Dive!'
})
export class Day02 extends SolutionBase {

    protected part1(): number {
        const sub = { hor: 0, dep: 0 };
        this.parseInput().forEach(command => {
            sub.hor += command.hor;
            sub.dep += command.dep;
        });

        return sub.hor * sub.dep;
    }

    protected part2(): number {
        const sub = { hor: 0, dep: 0, aim: 0 };
        this.parseInput().forEach(command => {
            sub.aim += command.dep;
            sub.hor += command.hor;
            sub.dep += sub.aim * command.hor;
        });

        return sub.hor * sub.dep;
    }

    private parseInput() {
        return regexMatches(/([a-z]+) (\d+)/g, this.input).map(match => {
            const [, commandStr, valueStr] = match;
            const value = parseInt(valueStr);
            const command = { hor: 0, dep: 0 };
            switch (commandStr) {
                case 'forward': command.hor += value; break;
                case 'down': command.dep += value; break;
                case 'up': command.dep -= value; break;
                default: throw new Error('Invalid input!');
            }
            return command;
        });
    }
}
