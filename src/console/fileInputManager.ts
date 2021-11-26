import * as fs from 'fs';
import * as path from 'path';
import { get2DigitDay } from '../core/helpers';

export default class FileInputManager {
    private inputPath: string;

    constructor(inputPath?: string) {
        this.inputPath = inputPath ?? './public/input/';
    }

    loadInputAsync(day: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const filePath = path.join(this.inputPath, `day${get2DigitDay(day)}.txt`);
            fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
