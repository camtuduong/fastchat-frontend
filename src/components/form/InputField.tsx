import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const InputField = forwardRef<HTMLInputElement, Props>(
  ({ className, label, error, ...props }, ref) => {
    const isCheckbox = props.type === "checkbox";

    return (
      <div className={cn("w-full", isCheckbox && "w-auto")}>
        {label && (
          <label
            htmlFor={props.id}
            className="text-muted-foreground block text-xs font-semibold tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          autoComplete="one-time-code"
          ref={ref}
          {...props}
          aria-invalid={error ? true : props["aria-invalid"]}
          className={cn(
            "border-input bg-field text-input-field-foreground placeholder:text-muted-foreground focus:border-field-focus-border disabled:bg-field-disabled disabled:text-muted-foreground aria-invalid:border-field-invalid-border mt-1 w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none",
            className,
          )}
        />
        {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
      </div>
    );
  },
);
