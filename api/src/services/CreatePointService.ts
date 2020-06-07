import { Request, Response } from 'express';
import database from '../database';

export default async (request: Request, response: Response) => {
  const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;

  const transation = await database.transaction();

  const point = {
    image: request.file.filename,
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
  };

  const insertedIds = await transation('points').insert(point);
  const point_id = insertedIds[0];

  const pointItems = items
  .split(',')
  .map((item: string) => Number(item.trim()))
  .map((item_id: number) => {
    return {
      item_id,
      point_id,
    };
  });

  await transation('point_items').insert(pointItems);

  await transation.commit();

  return response.json({ id: point_id, ...point });
};
