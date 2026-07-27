import Card from "../ui/Card";

function StatisticCard({ title, value, description, index = 0 }) {
  return (
    <article
      className="h-full motion-safe:animate-[fadeSlideUp_300ms_ease-out_both]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Card hoverable className="flex h-full flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">
            {title}
          </h3>
          <p className="mt-3 text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
            {value}
          </p>
        </div>

        {description && (
          <p className="mt-6 text-sm text-[var(--color-text-muted)]">
            {description}
          </p>
        )}
      </Card>
    </article>
  );
}

export default StatisticCard;
