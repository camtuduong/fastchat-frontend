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
            className="block text-sm font-medium text-(--gray-3)"
          >
            {props.label}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          className={cn(
            "mt-1 w-full rounded-md border border-(--border-input) px-3 py-2 focus:border-(--color-plum) focus:outline-none",
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
