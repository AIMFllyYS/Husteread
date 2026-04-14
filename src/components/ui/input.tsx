import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full px-3 py-2 rounded-lg text-sm transition-all duration-200",
            "border outline-none",
            "focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]",
            "placeholder:text-[var(--muted)]",
            error
              ? "border-[var(--error)] focus:ring-[var(--error)]"
              : "border-[var(--border)]",
            className
          )}
          style={{
            backgroundColor: "var(--card)",
            color: "var(--foreground)",
          }}
          {...props}
        />
        {error && (
          <p className="text-xs" style={{ color: "var(--error)" }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export { Input };
export type { InputProps };
