// api/upload.js
import formidable from 'formidable';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

export const config = {
  api: {
    bodyParser: false,
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tempUploadDir = path.join(__dirname, '../../uploads');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({ uploadDir: tempUploadDir, keepExtensions: true });

  try {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Form parsing error' });
      }

      const file = files.image;
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const inputPath = file[0].filepath;
      const webpFilename = `${Date.now()}.webp`;
      const outputPath = path.join(tempUploadDir, webpFilename);

      try {
        await sharp(inputPath)
          .resize(1200)
          .webp({ quality: 80 })
          .toFile(outputPath);

        await unlink(inputPath); // Clean up original

        return res.status(200).json({ path: `/uploads/${webpFilename}` });
      } catch (conversionErr) {
        return res.status(500).json({ error: 'Image conversion failed' });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}
