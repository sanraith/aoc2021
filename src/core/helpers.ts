/**
 * Executes the regular expression over and over on the given text until all matches are found.
 * @param regex The regular expression.
 * @param text The text.
 */
function regexAll(regex: RegExp, text: string): RegExpExecArray[] {
    const results: RegExpExecArray[] = [];
    let record: RegExpExecArray | null;

    while ((record = regex.exec(text))) {
        results.push(record);
    }

    return results;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function assertNever(value: never, shouldThrow = true): void | never {
    if (shouldThrow) {
        throw new Error('Coding error! This path should never be reached!');
    }
}

export {
    assertNever,
    regexAll
};

