import { auth as adminAuth } from '../config/firebase.js';

export async function verifyFirebaseToken(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'Missing Bearer token' });
    const decoded = await adminAuth.verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('verifyFirebaseToken error', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
