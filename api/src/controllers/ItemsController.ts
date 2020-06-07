import { Response, Request } from 'express';
import ListItemsService from '../services/ListItemsService';

class PointsController {
  async index(req: Request, res: Response) {
    const response = await ListItemsService(req, res);
    return response;
  }
}

export default new PointsController();
