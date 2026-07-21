function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        min-h-11 rounded-md bg-[var(--color-brand-primary)] px-4 py-2
        text-sm font-medium text-white transition-colors
        hover:bg-[var(--color-brand-hover)] focus:outline-none
        focus:ring-2 focus:ring-[var(--color-brand-focus)] focus:ring-offset-2
        focus:ring-offset-[var(--color-surface-1)] disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
