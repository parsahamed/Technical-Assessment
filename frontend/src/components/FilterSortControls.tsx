import type { StudyStatus } from '../types/study';

interface FilterSortControlsProps {
  statusFilter: string;
  sortBy: 'title' | 'createdAt' | 'status';
  onStatusFilterChange: (status: string) => void;
  onSortByChange: (sortBy: 'title' | 'createdAt' | 'status') => void;
  disabled?: boolean;
}

const STATUS_OPTIONS: { label: string; value: StudyStatus }[] = [
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
  { label: 'Draft', value: 'draft' },
];

export function FilterSortControls({
  statusFilter,
  sortBy,
  onStatusFilterChange,
  onSortByChange,
  disabled = false,
}: FilterSortControlsProps) {
  return (
    <div className="filter-sort-controls">
      <label htmlFor="status-filter">Status</label>
      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">All</option>
        {STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor="sort-by">Sort by</label>
      <select
        id="sort-by"
        value={sortBy}
        onChange={(e) => onSortByChange(e.target.value as FilterSortControlsProps['sortBy'])}
        disabled={disabled}
      >
        <option value="title">Title (A-Z)</option>
        <option value="createdAt">Created (newest)</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}
