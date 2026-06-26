import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const CustomTextArea = ({ className }: Props) => {
  return <Textarea className={cn("max-h-48 min-h-12", className)} />;
};
