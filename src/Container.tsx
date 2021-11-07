import React from 'react';
import WorkerService from './services/worker.service';

export interface Container {
    workerService: WorkerService;
}

export const container: Container = {
    workerService: new WorkerService()
};

export const ContainerContext = React.createContext<Container>(container);
