import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const ORIGIN = process.env.ORIGIN || '*';
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
import health from './routes/health.js';
import auth from './routes/auth.js';
import areas from './routes/areas.js';
import reports from './routes/reports.js';
import leaderboard from './routes/leaderboard.js';
import uploads from './routes/uploads.js';

app.use('/health', health);
app.use('/auth', auth);
app.use('/areas', areas);
app.use('/reports', reports);
app.use('/leaderboard', leaderboard);
app.use('/uploads', uploads);

// 404
app.use((req, res) => res.status(404).json({ error: 'FILE NOT FOUND' }));

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 API running on http://localhost:${port}`);
});
