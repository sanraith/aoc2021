import SolutionBase from '../core/solutionBase';
import { solutionInfo } from '../core/solutionInfo';

type Validator = {
    field: string,
    validate: (value: string) => boolean;
};

@solutionInfo({
    day: 4,
    title: 'Passport Processing'
})
export class Day04 extends SolutionBase {

    private fieldValidators: Validator[] = [
        ['byr', this.createYearValidator(1920, 2002)],
        ['iyr', this.createYearValidator(2010, 2020)],
        ['eyr', this.createYearValidator(2020, 2030)],
        ['hgt', this.heightValidator],
        ['hcl', (v: string) => /^#[0-9a-f]{6}$/g.test(v)],
        ['ecl', (v: string) => /^(amb|blu|brn|gry|grn|hzl|oth)$/g.test(v)],
        ['pid', this.createNumberValidator(9)]
    ].map(x => <Validator>{ field: x[0], validate: x[1] });

    protected part1(): number {
        const validCount = this.getPassports()
            .filter(p => this.fieldValidators.every(v => p.has(v.field)))
            .length;

        return validCount;
    }

    protected part2(): number {
        const validCount = this.getPassports()
            .filter(p => this.fieldValidators.every(v => p.has(v.field)))
            .filter(p => this.fieldValidators.every(v => v.validate(p.get(v.field)!)))
            .length;

        return validCount;
    }

    private createNumberValidator(digits: number) {
        return (value: string) => new RegExp(`^[0-9]{${digits}}$`).test(value);
    }

    private createYearValidator(min: number, max: number) {
        const isFourDigitNumber = this.createNumberValidator(4);
        return (value: string) => {
            if (!isFourDigitNumber(value)) { return false; }

            const number = parseInt(value);
            return number >= min && number <= max;
        };
    }

    private heightValidator(value: string) {
        const heightRegex = /^([0-9]+)(?:cm|in)$/;
        if (!heightRegex.test(value)) { return false; }

        const number = parseInt(heightRegex.exec(value)![1]);
        if (value.indexOf('cm') >= 0) {
            return number >= 150 && number <= 193;
        }
        return number >= 59 && number <= 76; // 'in'
    }

    private getPassports(): Map<string, string>[] {
        const passportRegex = /([a-z]{3}):(\S+)/g;
        const doubleNewLineRegex = /\r\n\r\n|\n\n/g;
        const passportStrings = this.input.split(doubleNewLineRegex);
        const passports: Map<string, string>[] = [];

        for (const passportString of passportStrings) {
            const passport = new Map();
            let record: RegExpExecArray;
            while ((record = passportRegex.exec(passportString)!)) {
                const [, key, value] = record;
                passport.set(key, value);
            }
            passports.push(passport);
        }

        return passports;
    }
}
