import { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'db.json');

const getDB = () => {
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
};

const saveDB = (data: any) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  const db = getDB();

  switch (method) {
    case 'GET':
      const { status } = req.query;
      if (status === 'approved') {
        return res.status(200).json(db.blogs.filter((b: any) => b.status === 'approved'));
      }
      return res.status(200).json(db.blogs);

    case 'POST':
      const newBlog = {
        ...req.body,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
      };
      db.blogs.push(newBlog);
      saveDB(db);
      return res.status(201).json(newBlog);

    case 'PUT':
      const { id } = req.body;
      const index = db.blogs.findIndex((b: any) => b.id === id);
      if (index === -1) return res.status(404).json({ error: 'Not found' });
      db.blogs[index] = { ...db.blogs[index], ...req.body };
      saveDB(db);
      return res.status(200).json(db.blogs[index]);

    case 'DELETE':
      const { id: delId } = req.query;
      db.blogs = db.blogs.filter((b: any) => b.id !== delId);
      saveDB(db);
      return res.status(200).json({ success: true });

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
