import React from 'react';
import InputService from './input.service';
import WorkerService from './worker.service';

export interface Container {
    workerService: WorkerService;
    inputService: InputService;
}

export const container: Container = {
    workerService: new WorkerService(),
    inputService: new InputService()
};

export const ContainerContext = React.createContext<Container>(container);
