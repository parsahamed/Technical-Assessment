import { useState } from 'react';
import { StudyList } from './components/StudyList';
import { StudyForm } from './components/StudyForm';
import { fetchStudies, createStudy, updateStudy } from './api/studies';
import type { Study, CreateStudyInput } from './types/study';

/**
 * App shell. Candidates implement Task 1–3 by:
 * - Fetching studies on load, passing loading/error + data to StudyList (Task 1)
 * - Adding create/edit UI and calling createStudy/updateStudy (Task 2)
 * - Adding filter/sort controls and passing them to StudyList (Task 3)
 */
function App() {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Study | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'title' | 'createdAt' | 'status'>('title');

  // TODO Task 1: load studies on mount (and after create/update/delete)
  // useEffect(() => { ... fetchStudies() ... }, []);

  const handleSubmit = async (input: CreateStudyInput & { id?: string }) => {
    try {
      if (input.id) {
        await updateStudy(input.id, { title: input.title, status: input.status, phase: input.phase });
      } else {
        await createStudy({ title: input.title, status: input.status, phase: input.phase });
      }
      setEditing(null);
      // TODO Task 1 & 2: refetch studies after create/update
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed');
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24 }}>
      <h1>Revalia — Studies</h1>

      {/* TODO Task 1: show loading spinner or skeleton when loading */}
      {/* TODO Task 1: show error message when error is set */}
      {error && <p role="alert">{error}</p>}

      <StudyList
        studies={studies}
        onEdit={setEditing}
        statusFilter={statusFilter}
        sortBy={sortBy}
      />

      {/* TODO Task 3: add filter by status and sort controls above the list */}

      {editing ? (
        <StudyForm
          initialStudy={editing}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      ) : (
        <StudyForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default App;
