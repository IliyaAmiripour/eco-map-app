import { Router } from 'express';
import { db } from '../config/firebase.js';
const router = Router();

router.get('/', async (req, res) => {
  const snap = await db.collection('users').orderBy('points', 'desc').limit(100).get();
  const data = snap.docs.map(d => ({ uid: d.id, ...d.data() }));
  res.json(data);
});

export default router;
