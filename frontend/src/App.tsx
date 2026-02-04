import { useCallback, useEffect, useRef, useState } from 'react';
import { StudyList } from './components/StudyList';
import { StudyForm } from './components/StudyForm';
import { ErrorState } from './components/ErrorState';
import { FilterSortControls } from './components/FilterSortControls';
import { StudyListSkeleton } from './components/StudyListSkeleton';
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
  const [listError, setListError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Study | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<'title' | 'createdAt' | 'status'>('title');
  const lastActiveElement = useRef<HTMLElement | null>(null);

  const loadStudies = useCallback(async () => {
    try {
      setLoading(true);
      setListError(null);
      const data = await fetchStudies();
      setStudies(data);
    } catch (e) {
      setListError(e instanceof Error ? e.message : 'Failed to load studies');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadStudies();
  }, [loadStudies]);

  useEffect(() => {
    if (!editing && lastActiveElement.current) {
      lastActiveElement.current.focus();
    }
  }, [editing]);

  const handleSubmit = async (input: CreateStudyInput & { id?: string }) => {
    try {
      setFormError(null);
      if (input.id) {
        await updateStudy(input.id, { title: input.title, status: input.status, phase: input.phase });
      } else {
        await createStudy({ title: input.title, status: input.status, phase: input.phase });
      }
      setEditing(null);
      await loadStudies();
      return true;
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Request failed');
      return false;
    }
  };

  const handleEdit = (study: Study) => {
    lastActiveElement.current = document.activeElement as HTMLElement | null;
    setFormError(null);
    setEditing(study);
  };

  return (
    <div className="app-shell">
      <h1>Revalia - Studies</h1>

      <div className="app-content">
        <section className="list-panel" aria-label="Studies list panel">
          <FilterSortControls
            statusFilter={statusFilter}
            sortBy={sortBy}
            onStatusFilterChange={setStatusFilter}
            onSortByChange={setSortBy}
            disabled={loading || Boolean(listError)}
          />

          <h2>Studies</h2>

          <div className="list-scroll">
            {loading && (
              <>
                <StudyListSkeleton />
              </>
            )}
            {!loading && listError && <ErrorState message={listError} onRetry={loadStudies} />}
            {!loading && !listError && (
              <StudyList studies={studies} onEdit={handleEdit} statusFilter={statusFilter} sortBy={sortBy} />
            )}
          </div>
        </section>

        <section className="form-panel" aria-label="Study form panel">
          {editing ? (
            <StudyForm
              initialStudy={editing}
              onSubmit={handleSubmit}
              onCancel={() => {
                setEditing(null);
                setFormError(null);
              }}
              submitError={formError}
            />
          ) : (
            <StudyForm onSubmit={handleSubmit} submitError={formError} />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
