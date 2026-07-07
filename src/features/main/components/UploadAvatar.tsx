import { useUploadAvatar } from "@/features/main/hooks/useUploadAvatar";
import { Camera } from "lucide-react";

export const UploadAvatar = () => {
  const { mutateAsync: uploadAvatar } = useUploadAvatar();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await uploadAvatar(formData);
    }
  };

  return (
    <label className="absolute right-0 bottom-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-300">
      <Camera size={20} className="pointer-events-none" />
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </label>
  );
};
