import { Request, Response } from 'express';
import database from '../database';

export default async (request: Request, response: Response) => {
  const { id } = request.params;

  const point = await database('points').where('id', id).first();

  if (!point) return response.status(404).json({ error: 'Point not found' });

  const serializedPoints = {
    ...point,
    image_url: `http://192.168.1.7:3333/uploads/${point.image}`
  }

  const items = await database('items')
    .join('point_items', 'items.id', '=', 'point_items.item_id')
    .where('point_items.point_id', id)
    .select('items.title');

  return response.json({ point: serializedPoints, items });
};
