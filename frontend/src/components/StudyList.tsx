import type { Study, StudyStatus } from '../types/study';

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

const STATUS_ORDER: StudyStatus[] = ['draft', 'active', 'completed'];

/**
 * Task 1: Display the list of studies.
 * - Show loading and error states when data is fetched from API.
 * - Render each study (title, status, phase, createdAt in a readable format).
 *
 * Task 3: Add client-side filtering by status and/or sorting (e.g. by title or date).
 */
export function StudyList({ studies, onEdit, statusFilter, sortBy }: StudyListProps) {
  const isFiltered = Boolean(statusFilter);
  const filtered = isFiltered ? studies.filter((study) => study.status === statusFilter) : studies;

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'createdAt':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'status':
        return STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status);
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <section aria-label="Research studies list">
      {sorted.length === 0 ? (
        <p>{isFiltered ? 'No studies match the selected status.' : 'No studies to show.'}</p>
      ) : (
        <ul className="study-list">
          {sorted.map((study) => (
            <li key={study.id} className="study-item">
              <div className="study-details">
                <strong>{study.title}</strong> - {study.status} - {study.phase} -{' '}
                {new Date(study.createdAt).toLocaleDateString()}
              </div>
              {onEdit && (
                <button type="button" className="link-button" onClick={() => onEdit(study)}>
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
