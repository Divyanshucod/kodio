import { Application } from 'express';
import { mainRouter } from './mainRouter';

export const routesSetup = (app: Application) => {
    app.use('/api/v1',mainRouter)
}