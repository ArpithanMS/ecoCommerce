// api/delete.js
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { imagePath } = req.body;

  if (!imagePath || !imagePath.startsWith('/uploads/')) {
    return res.status(400).json({ error: 'Invalid image path.' });
  }

  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Failed to delete image.' });
      }
      return res.status(200).json({ success: true });
    });
  } catch (err) {
    return res.status(500).json({ error: 'Unexpected error.' });
  }
}
