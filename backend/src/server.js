import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { studiesRouter } from './routes/studies.js';
import { loadWorkspaceConfig } from './middleware/workspaceHandler.js';

const app = express();

app.set('env', config.env);
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api/studies', studiesRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Assessment API running at http://localhost:${config.port}`);
  loadWorkspaceConfig();
});
