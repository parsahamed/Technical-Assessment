import type { Study, CreateStudyInput } from '../types/study';

interface StudyFormProps {
  /** When provided, form is in "edit" mode. Task 2. */
  initialStudy?: Study | null;
  onSubmit: (input: CreateStudyInput & { id?: string }) => void;
  onCancel?: () => void;
}

const STATUS_OPTIONS = ['draft', 'active', 'completed'] as const;
const PHASE_OPTIONS = ['Phase 1', 'Phase 2', 'Phase 3'] as const;

/**
 * Task 2: Implement create and edit behavior.
 * - Use initialStudy to prefill when editing.
 * - Validate: title required and non-empty; show inline or summary errors.
 * - On submit, call onSubmit with { title, status?, phase? } (and id when editing).
 * - Ensure form is accessible (labels, error announcements, focus management).
 */
export function StudyForm({ initialStudy, onSubmit, onCancel }: StudyFormProps) {
  const isEdit = Boolean(initialStudy?.id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement)?.value?.trim();
    const status = (form.elements.namedItem('status') as HTMLSelectElement)?.value;
    const phase = (form.elements.namedItem('phase') as HTMLSelectElement)?.value;

    if (!title) {
      // TODO Task 2: show validation error
      return;
    }

    onSubmit({
      ...(isEdit && initialStudy && { id: initialStudy.id }),
      title,
      status: (status as CreateStudyInput['status']) ?? undefined,
      phase: phase || undefined,
    });
  };

  return (
    <section aria-label={isEdit ? 'Edit study' : 'Add new study'}>
      <h2>{isEdit ? 'Edit Study' : 'New Study'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="study-title">Title *</label>
          <input
            id="study-title"
            name="title"
            type="text"
            required
            defaultValue={initialStudy?.title}
            aria-describedby="title-error"
          />
          <span id="title-error" role="alert" aria-live="polite">
            {/* TODO Task 2: show validation error when title is empty */}
          </span>
        </div>
        <div>
          <label htmlFor="study-status">Status</label>
          <select id="study-status" name="status" defaultValue={initialStudy?.status ?? 'draft'}>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="study-phase">Phase</label>
          <select id="study-phase" name="phase" defaultValue={initialStudy?.phase ?? 'Phase 1'}>
            {PHASE_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit">{isEdit ? 'Save' : 'Create'}</button>
          {onCancel && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
