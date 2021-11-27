import * as childProcess from 'child_process';

export async function runChildProcessAsync(command: string, pipeOutput?: boolean): Promise<void> {
    pipeOutput = pipeOutput ?? true;
    return new Promise<void>(resolve => {
        const child = childProcess.exec(command);
        if (pipeOutput) {
            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        }
        child.on('exit', () => resolve());
    });
}
