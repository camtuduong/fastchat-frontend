import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const InputField = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <div className="w-full">
        {props.label && (
          <label
            htmlFor={props.id}
            className="text-gray-3 block text-sm font-medium"
          >
            {props.label}
          </label>
        )}
        <input
          autoComplete="one-time-code"
          ref={ref}
          {...props}
          className={cn(
            "border-gray-3 focus:border-plum text-input-field-foreground mt-1 w-full rounded-md border px-3 py-2 focus:outline-none",
            className,
          )}
        />
        {props.error && (
          <p className="mt-1 text-sm text-red-500">{props.error}</p>
        )}
      </div>
    );
  },
);
