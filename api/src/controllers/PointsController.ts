import { Request, Response } from 'express';

import CreatePointService from '../services/CreatePointService';
import ListSinglePointService from '../services/ListSinglePointService';
import ListAllPointsWithFilter from '../services/ListAllPointsWithFilter';

class PointsController {
  async store(req: Request, res: Response) {
    const response = await CreatePointService(req, res);
    return response;
  }

  async show(req: Request, res: Response) {
    const response = await ListSinglePointService(req, res);
    return response;
  }

  async index(req: Request, res: Response) {
    const response = await ListAllPointsWithFilter(req, res);
    return response;
  }
}

export default new PointsController();
