import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const credsEnv = process.env.SERVICE_ACCOUNT_JSON || null;
const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || './serviceAccountKey.json';

if (!credsEnv && !fs.existsSync(credsPath)) {
  console.warn(`[firebase] Service account not provided. Set SERVICE_ACCOUNT_JSON or add serviceAccountKey.json`);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: (credsEnv 
      ? admin.credential.cert(JSON.parse(credsEnv)) 
      : (credsPath && fs.existsSync(credsPath) 
          ? admin.credential.cert(JSON.parse(fs.readFileSync(credsPath, 'utf8'))) 
          : admin.credential.applicationDefault())),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    projectId: process.env.FIREBASE_PROJECT_ID
  });
}

export const db = admin.firestore();
export const bucket = admin.storage().bucket();
export const auth = admin.auth();
export default admin;
