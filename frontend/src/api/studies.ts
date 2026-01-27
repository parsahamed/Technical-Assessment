import type { Study, CreateStudyInput, UpdateStudyInput } from '../types/study';

const BASE = '/api/studies';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

/** Fetch all studies. Used in Task 1. */
export async function fetchStudies(): Promise<Study[]> {
  const res = await fetch(BASE);
  return handleResponse<Study[]>(res);
}

/** Fetch a single study by id. */
export async function fetchStudy(id: string): Promise<Study | null> {
  const res = await fetch(`${BASE}/${id}`);
  if (res.status === 404) return null;
  return handleResponse<Study>(res);
}

/** Create a new study. Used in Task 2. */
export async function createStudy(input: CreateStudyInput): Promise<Study> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handleResponse<Study>(res);
}

/** Update an existing study. Used in Task 2. */
export async function updateStudy(id: string, input: UpdateStudyInput): Promise<Study> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handleResponse<Study>(res);
}

/** Delete a study. Optional in assessment. */
export async function deleteStudy(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  await handleResponse<void>(res);
}
