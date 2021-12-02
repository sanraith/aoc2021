/**
 * Executes the regular expression over and over on the given text until all matches are found.
 * @param regex The regular expression.
 * @param text The text.
 */
function regexMatches(regex: RegExp, text: string): RegExpExecArray[] {
    const results: RegExpExecArray[] = [];
    let record: RegExpExecArray | null;

    while ((record = regex.exec(text))) {
        results.push(record);
    }

    return results;
}

function* regexMatchesLazy(regex: RegExp, text: string): Generator<RegExpExecArray, void, unknown> {
    let record: RegExpExecArray | null;
    while ((record = regex.exec(text))) {
        yield record;
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertNever(value: never, shouldThrow = true): void | never {
    if (shouldThrow) {
        throw new Error('Coding error! This path should never be reached!');
    }
}

function get2DigitDay(day: number): string {
    return day.toString().padStart(2, '0');
}

export {
    assertNever,
    regexMatches,
    regexMatchesLazy,
    get2DigitDay
};

