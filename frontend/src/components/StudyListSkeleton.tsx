interface StudyListSkeletonProps {
  count?: number;
}

export function StudyListSkeleton({ count = 4 }: StudyListSkeletonProps) {
  const items = Array.from({ length: count }, (_, index) => index);

  return (
    <section aria-label="Loading studies">
      <ul className="skeleton-list" aria-hidden="true">
        {items.map((item) => (
          <li key={item} className="skeleton-item">
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </li>
        ))}
      </ul>
    </section>
  );
}
