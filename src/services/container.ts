import React from 'react';
import InputService from './input.service';
import RouterService from './router.service';
import RuntimeSolutionService from './runtimeSolution.service';
import WorkerService from './worker.service';

export interface IContainer {
    workerService: WorkerService;
    inputService: InputService;
    runtimeSolutionService: RuntimeSolutionService;
    routerService: RouterService;
}

const inputService = new InputService();
const workerService = new WorkerService();
const runtimeSolutionService = new RuntimeSolutionService(inputService, workerService);
const routerService = new RouterService();

export const container: IContainer = {
    workerService, inputService, runtimeSolutionService, routerService
};

export const ContainerContext = React.createContext<IContainer>(container);
