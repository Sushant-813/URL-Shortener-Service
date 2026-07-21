function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`
        rounded-lg border border-[var(--color-border-hairline)]
        bg-[var(--color-surface-1)] p-6 text-[var(--color-text-primary)]
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
