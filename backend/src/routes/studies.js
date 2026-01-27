import { Router } from 'express';
import {
  getAllStudies,
  getStudyById,
  createStudy,
  updateStudy,
  deleteStudy,
  getWorkspaceConfig,
} from '../data/store.js';
import { validateCreateStudy, validateUpdateStudy } from '../middleware/validateStudy.js';

export const studiesRouter = Router();

studiesRouter.get('/', (req, res) => {
  const list = getAllStudies();
  res.json(list);
});


studiesRouter.get('/:id', (req, res) => {
  const study = getStudyById(req.params.id);
  if (!study) return res.status(404).json({ error: 'Study not found' });
  res.json(study);
});

studiesRouter.post('/', validateCreateStudy, (req, res) => {
  const { title, status, phase } = req.validatedBody;
  const study = createStudy({ title, status, phase });
  res.status(201).json(study);
});

studiesRouter.put('/:id', validateUpdateStudy, (req, res) => {
  const study = getStudyById(req.params.id);
  if (!study) return res.status(404).json({ error: 'Study not found' });
  const updated = updateStudy(req.params.id, req.validatedBody);
  res.json(updated);
});

studiesRouter.delete('/:id', (req, res) => {
  const deleted = deleteStudy(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Study not found' });
  res.status(204).send();
});

studiesRouter.get('/workspace-config', (req, res) => {
  const data = getWorkspaceConfig();
  res.json({ data });
});
