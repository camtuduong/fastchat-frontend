import { Upload } from "lucide-react";

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const UploadImg = ({ onChange, className }: Props) => {
  return (
    <label className={className}>
      <Upload size={20} />
      <input
        type="file"
        className="hidden"
        accept="image/*"
        multiple
        onChange={onChange}
      />
    </label>
  );
};
