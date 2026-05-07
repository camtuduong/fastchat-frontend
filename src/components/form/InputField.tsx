import { cn } from "@/libs/utils";

type Props = {
  className?: string;
  type: string;
  id?: string;
  placeholder?: string;
};

export default function InputField({
  className,
  type,
  id,
  placeholder,
}: Props) {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className={cn(
        "border-(--border-input) text-[0.875rem] accent-(--color-plum) placeholder:text-(--gray-5)",
        className,
      )}
    />
  );
}
