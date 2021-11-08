/// <reference lib="webworker" />

import { lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import solutionManager from '../core/solutionManager';
import { SolutionResult } from '../core/solutionState';
import SolveRequest from './solveRequest';

const solutionInfos = solutionManager.getSolutionsByDay();

interface WorkerRequest {
    data: SolveRequest;
}

addEventListener('message', async ({ data }: WorkerRequest) => {
    const solutionInfo = solutionInfos.get(data.day);
    if (!solutionInfo) { return; }

    const solution = solutionInfo.create();
    solution.init(data.input);

    for (const part of [1, 2] as const) {
        const observable = solution.solveWithProgress(part);
        await lastValueFrom(observable.pipe(
            tap(state => postMessage(state))
        ));
    }

    // Post an invalid result to mark the end of the work.
    postMessage(new SolutionResult(-1, null, 0));
});
