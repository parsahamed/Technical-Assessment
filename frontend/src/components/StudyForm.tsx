import { useEffect, useRef, useState, type FormEvent } from 'react';
import type { Study, CreateStudyInput, StudyStatus } from '../types/study';

interface StudyFormProps {
  /** When provided, form is in "edit" mode. Task 2. */
  initialStudy?: Study | null;
  onSubmit: (input: CreateStudyInput & { id?: string }) => Promise<boolean> | boolean;
  onCancel?: () => void;
  submitError?: string | null;
}

const STATUS_OPTIONS: StudyStatus[] = ['draft', 'active', 'completed'];
const PHASE_OPTIONS = ['Phase 1', 'Phase 2', 'Phase 3'] as const;

/**
 * Task 2: Implement create and edit behavior.
 * - Use initialStudy to prefill when editing.
 * - Validate: title required and non-empty; show inline or summary errors.
 * - On submit, call onSubmit with { title, status?, phase? } (and id when editing).
 * - Ensure form is accessible (labels, error announcements, focus management).
 */
export function StudyForm({ initialStudy, onSubmit, onCancel, submitError }: StudyFormProps) {
  const isEdit = Boolean(initialStudy?.id);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<StudyStatus>('draft');
  const [phase, setPhase] = useState<string>('Phase 1');
  const [titleError, setTitleError] = useState<string>('');
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTitle(initialStudy?.title ?? '');
    setStatus(initialStudy?.status ?? 'draft');
    setPhase(initialStudy?.phase ?? 'Phase 1');
    setTitleError('');
    setTouched(false);
  }, [initialStudy?.id]);

  useEffect(() => {
    titleRef.current?.focus();
  }, [initialStudy?.id]);

  const validateTitle = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return 'Title is required.';
    }
    return '';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const error = validateTitle(title);
    setTitleError(error);
    if (error) {
      titleRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    let success = false;
    try {
      success = await Promise.resolve(
        onSubmit({
          ...(isEdit && initialStudy && { id: initialStudy.id }),
          title: title.trim(),
          status,
          phase,
        })
      );
    } catch {
      success = false;
    } finally {
      setIsSubmitting(false);
    }

    if (success && !isEdit) {
      setTitle('');
      setStatus('draft');
      setPhase('Phase 1');
      setTitleError('');
      setTouched(false);
    }
  };

  return (
    <section aria-label={isEdit ? 'Edit study' : 'Add new study'}>
      <h2>{isEdit ? 'Edit Study' : 'New Study'}</h2>
      <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting} className="study-form">
        <div className="form-field">
          <label htmlFor="study-title">Title *</label>
          <input
            ref={titleRef}
            id="study-title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (touched) {
                setTitleError(validateTitle(e.target.value));
              }
            }}
            onBlur={() => {
              setTouched(true);
              setTitleError(validateTitle(title));
            }}
            aria-invalid={Boolean(titleError)}
            aria-describedby="title-error"
            required
            disabled={isSubmitting}
          />
          <span id="title-error" role="alert" aria-live="polite" className="field-error">
            {titleError}
          </span>
        </div>
        <div className="form-field">
          <label htmlFor="study-status">Status</label>
          <select
            id="study-status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as StudyStatus)}
            disabled={isSubmitting}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="study-phase">Phase</label>
          <select
            id="study-phase"
            name="phase"
            value={phase}
            onChange={(e) => setPhase(e.target.value)}
            disabled={isSubmitting}
          >
            {PHASE_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        {submitError && (
          <div className="form-error" role="alert" aria-live="polite">
            {submitError}
          </div>
        )}
        <div className="form-actions">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (isEdit ? 'Saving...' : 'Creating...') : isEdit ? 'Save' : 'Create'}
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
