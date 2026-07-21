import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { type = "text", placeholder = "", value, onChange, className = "", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        min-h-11 w-full rounded-md border border-[var(--color-border-hairline)]
        bg-[var(--color-surface-1)] px-3 py-2 text-sm text-[var(--color-text-primary)]
        placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand-primary)]
        focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-focus)]
        disabled:cursor-not-allowed disabled:opacity-50 ${className}
      `}
      {...props}
    />
  );
});

export default Input;
