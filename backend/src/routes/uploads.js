import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { nanoid } from 'nanoid';
import { bucket } from '../config/firebase.js';
import { verifyFirebaseToken } from '../middlewares/auth.js';

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: (parseInt(process.env.MAX_UPLOAD_MB || '12', 10)) * 1024 * 1024 }
});

router.post('/image', verifyFirebaseToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const ext = path.extname(req.file.originalname || '').toLowerCase() || '.jpg';
    const filename = `uploads/${req.user.uid}/${Date.now()}-${nanoid(8)}${ext}`;
    const blob = bucket.file(filename);
    await blob.save(req.file.buffer, {
      resumable: false,
      contentType: req.file.mimetype,
      metadata: { cacheControl: 'public,max-age=31536000' }
    });
    await blob.makePublic().catch(()=>{});
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    res.status(201).json({ url: publicUrl, path: filename });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Upload failed', details: e.message });
  }
});

export default router;
