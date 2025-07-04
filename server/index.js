// server/index.js
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Polyfill __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload handler
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ path: `/uploads/${req.file.filename}` });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.delete('/delete-image', (req, res) => {
  const { imagePath } = req.body;

  if (imagePath && imagePath.startsWith('/uploads/')) {
    const fullPath = path.join(__dirname,'..', 'uploads', path.basename(imagePath));

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Failed to delete image.' });
      }

      res.json({ success: true });
    });
  } else {
    res.status(400).json({ error: 'Invalid image path.' });
  }
});
