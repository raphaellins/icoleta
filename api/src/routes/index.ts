import { Router } from 'express';
import PointRouter from './PointRouter';
import ItemRouter from './ItemRouter';

const routes = Router();

routes.use('/items', ItemRouter);
routes.use('/points', PointRouter);

export default routes;
