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
    case 'POST':
      const { action, password, oldPassword, newPassword } = req.body;

      if (action === 'login') {
        if (password === db.admin.password) {
          return res.status(200).json({ success: true });
        }
        return res.status(401).json({ error: 'Invalid password' });
      }

      if (action === 'change-password') {
        if (oldPassword === db.admin.password) {
          db.admin.password = newPassword;
          saveDB(db);
          return res.status(200).json({ success: true });
        }
        return res.status(401).json({ error: 'Invalid old password' });
      }

      return res.status(400).json({ error: 'Invalid action' });

    default:
      res.setHeader('Allow', ['POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
