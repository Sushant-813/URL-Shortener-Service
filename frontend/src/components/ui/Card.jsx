function Card({ children, className = "", hoverable = false, ...props }) {
  return (
    <div
      className={`
        rounded-lg border border-[var(--color-border-hairline)]
        bg-[var(--color-surface-1)] p-6 text-[var(--color-text-primary)]
        ${
          hoverable
            ? "transition-colors duration-150 hover:border-[var(--color-border-strong)] motion-safe:transition-colors"
            : ""
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
