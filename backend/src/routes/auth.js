import { Router } from 'express';
import { verifyFirebaseToken } from '../middlewares/auth.js';
const router = Router();
router.get('/me', verifyFirebaseToken, async (req, res) => {
  res.json({ uid: req.user.uid, email: req.user.email, name: req.user.name || null });
});
export default router;
