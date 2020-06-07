import { Request, Response } from 'express';
import database from '../database';

interface Item {
  id: number;
  title: string;
  image: string;
}

export default async (request: Request, response: Response) => {
  const items = await database('items').select('*');

  const serealizedItems = items.map((item: Item) => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://192.168.1.7:3333/uploads/${item.image}`,
    };
  });

  return response.json(serealizedItems);
};
