// Reusable section header for Landing page sections.
//
// Props:
//   badge       - optional pill text (e.g. "Features", "Architecture")
//   title       - primary section heading
//   description - supporting body text
//   centered    - alignment flag (defaults to true)
function LandingSectionHeader({
  badge,
  title,
  description,
  centered = true,
}) {
  return (
    <div className={`space-y-3 ${centered ? "text-center mx-auto max-w-3xl" : ""}`}>
      {badge && (
        <span className="inline-block rounded border border-[var(--color-border-hairline)] bg-[var(--color-surface-2)] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-hover)]">
          {badge}
        </span>
      )}
      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)] sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export default LandingSectionHeader;
