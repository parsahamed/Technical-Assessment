import { VALID_STATUSES, VALID_PHASES, defaultStatus, defaultPhase } from '../config.js';

/**
 * Validates study body for POST (create). Attaches sanitized payload to req.validatedBody.
 */
export function validateCreateStudy(req, res, next) {
  const body = req.body ?? {};
  const errors = [];

  const title =
    typeof body.title === 'string' ? body.title.trim() : '';
  if (!title) {
    errors.push('title is required and must be non-empty');
  }

  const status = body.status ?? defaultStatus;
  if (!VALID_STATUSES.includes(status)) {
    errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
  }

  const phase = body.phase ?? defaultPhase;
  if (!VALID_PHASES.includes(phase)) {
    errors.push(`phase must be one of: ${VALID_PHASES.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join('; '), details: errors });
  }

  req.validatedBody = { title, status, phase };
  next();
}

/**
 * Validates study body for PUT (update). Attaches sanitized payload to req.validatedBody.
 * Only validates fields that are present.
 */
export function validateUpdateStudy(req, res, next) {
  const body = req.body ?? {};
  const payload = {};
  const errors = [];

  if (body.title !== undefined) {
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    if (!title) {
      errors.push('title must be non-empty when provided');
    } else {
      payload.title = title;
    }
  }

  if (body.status !== undefined) {
    if (!VALID_STATUSES.includes(body.status)) {
      errors.push(`status must be one of: ${VALID_STATUSES.join(', ')}`);
    } else {
      payload.status = body.status;
    }
  }

  if (body.phase !== undefined) {
    if (!VALID_PHASES.includes(body.phase)) {
      errors.push(`phase must be one of: ${VALID_PHASES.join(', ')}`);
    } else {
      payload.phase = body.phase;
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join('; '), details: errors });
  }

  req.validatedBody = payload;
  next();
}
