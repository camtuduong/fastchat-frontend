import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-field placeholder:text-muted-foreground disabled:bg-field-disabled aria-invalid:border-field-invalid-border aria-invalid:ring-field-invalid-ring align-center flex field-sizing-content min-h-16 w-full min-w-0 resize-none rounded-lg border px-4 py-2 text-base transition-colors outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
