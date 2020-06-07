import { Request, Response } from 'express';
import database from '../database';

export default async (request: Request, response: Response) => {
  const { city, uf, items } = request.query;

  const parsedItems = String(items)
    .split(',')
    .map((item) => item.trim());

  const points = await database('points')
    .join('point_items', 'points.id', '=', 'point_items.point_id')
    .whereIn('point_items.item_id', parsedItems)
    .where('city', String(city))
    .where('uf', String(uf))
    .distinct()
    .select('points.*');

  const serializedPoints = points.map(point => {
    return {
      id: point.id,
      image: point.image,
      name: point.name,
      email: point.email,
      whatsapp: point.whatsapp,
      latitude: point.latitude,
      longitude: point.longitude,
      city: point.city,
      uf: point.uf,
      image_url: `http://192.168.1.7:3333/uploads/${point.image}`,
    }
  })

  return response.json(serializedPoints);
};
