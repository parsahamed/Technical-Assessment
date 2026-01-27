import type { Study } from '../types/study';

interface StudyListProps {
  /** Studies to display. Task 1: wire this from API with loading/error states. */
  studies: Study[];
  /** Optional: called when user selects a study for editing. Task 2. */
  onEdit?: (study: Study) => void;
  /** Optional: filter by status. Task 3. */
  statusFilter?: string;
  /** Optional: sort order. Task 3. */
  sortBy?: 'title' | 'createdAt' | 'status';
}

/**
 * Task 1: Display the list of studies.
 * - Show loading and error states when data is fetched from API.
 * - Render each study (title, status, phase, createdAt in a readable format).
 *
 * Task 3: Add client-side filtering by status and/or sorting (e.g. by title or date).
 */
export function StudyList({ studies, onEdit, statusFilter, sortBy }: StudyListProps) {
  // TODO Task 1 & 3: implement loading/error handling in parent, filtering/sorting here or in parent
  return (
    <section aria-label="Research studies list">
      <h2>Studies</h2>
      {studies.length === 0 ? (
        <p>No studies to show.</p>
      ) : (
        <ul>
          {studies.map((s) => (
            <li key={s.id}>
              <strong>{s.title}</strong> — {s.status} · {s.phase} · {new Date(s.createdAt).toLocaleDateString()}
              {onEdit && (
                <button type="button" onClick={() => onEdit(s)}>
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
