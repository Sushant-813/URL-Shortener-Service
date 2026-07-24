const VARIANT_CLASSES = {
  primary: `
    bg-[var(--color-brand-primary)] text-white hover:bg-[var(--color-brand-hover)]
    focus:ring-[var(--color-brand-focus)] focus:ring-offset-[var(--color-surface-1)]
  `,
  secondary: `
    bg-[var(--color-surface-2)] text-[var(--color-text-primary)]
    hover:bg-[var(--color-surface-3)] focus:ring-[var(--color-brand-focus)]
    focus:ring-offset-[var(--color-surface-1)]
  `,
};

function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
  ...props
}) {
  const variantClasses = VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        min-h-11 rounded-md px-4 py-2 text-sm font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed
        disabled:opacity-50 ${variantClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
