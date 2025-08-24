import { Router } from 'express';
import { db } from '../config/firebase.js';
import { verifyFirebaseToken } from '../middlewares/auth.js';
import { areaSchema } from '../utils/validators.js';
import { nanoid } from 'nanoid';

const router = Router();
const COL = 'areas';

router.get('/', async (req, res) => {
  const snap = await db.collection(COL).orderBy('createdAt', 'desc').limit(200).get();
  const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.json(data);
});

router.post('/', verifyFirebaseToken, async (req, res) => {
  const { error, value } = areaSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ error: error.details.map(d=>d.message) });
  const id = nanoid(12);
  const payload = { ...value, id, createdAt: new Date(), createdBy: req.user.uid };
  await db.collection(COL).doc(id).set(payload);
  res.status(201).json(payload);
});

router.delete('/:id', verifyFirebaseToken, async (req, res) => {
  const id = req.params.id;
  const ref = db.collection(COL).doc(id);
  const doc = await ref.get();
  if (!doc.exists) return res.status(404).json({ error: 'Not found' });
  const data = doc.data();
  if (data.createdBy !== req.user.uid) return res.status(403).json({ error: 'Not owner' });
  await ref.delete();
  res.json({ ok: true });
});

export default router;
