import admin, { db } from '../config/firebase.js';
import { Router } from 'express';
import { verifyFirebaseToken } from '../middlewares/auth.js';
import { reportSchema } from '../utils/validators.js';
import { nanoid } from 'nanoid';

const router = Router();
const COL = 'reports';

router.get('/', async (req, res) => {
  const { areaId } = req.query;
  let ref = db.collection(COL);
  if (areaId) ref = ref.where('areaId', '==', areaId);
  const snap = await ref.orderBy('createdAt', 'desc').limit(200).get();
  const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  res.json(data);
});

router.post('/', verifyFirebaseToken, async (req, res) => {
  const { error, value } = reportSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ error: error.details.map(d=>d.message) });
  const id = nanoid(12);
  const payload = { ...value, id, createdAt: new Date(), cleanedBy: req.user.uid };
  await db.collection(COL).doc(id).set(payload);
  // increment points
  await db.collection('users').doc(req.user.uid).set({ points: 0 }, { merge: true });
  await db.collection('users').doc(req.user.uid).update({ points: admin.firestore.FieldValue.increment(10) }).catch(()=>{});
  res.status(201).json(payload);
});

export default router;
