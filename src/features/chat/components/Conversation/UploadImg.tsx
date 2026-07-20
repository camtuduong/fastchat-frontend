import { Upload } from "lucide-react";

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
};

export const UploadImg = ({ onChange, className, disabled }: Props) => {
  return (
    <label className={className}>
      <Upload size={20} />
      <input
        type="file"
        className="hidden"
        accept="image/*"
        disabled={disabled}
        multiple
        onChange={onChange}
      />
    </label>
  );
};
