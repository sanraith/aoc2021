import React from 'react';
import InputService from './input.service';
import RuntimeSolutionService from './runtimeSolution.service';
import WorkerService from './worker.service';

export interface IContainer {
    workerService: WorkerService;
    inputService: InputService;
    runtimeSolutionService: RuntimeSolutionService;
}

const inputService = new InputService();
const workerService = new WorkerService();
const runtimeSolutionService = new RuntimeSolutionService(inputService, workerService);

export const container: IContainer = {
    workerService, inputService, runtimeSolutionService
};

export const ContainerContext = React.createContext<IContainer>(container);
