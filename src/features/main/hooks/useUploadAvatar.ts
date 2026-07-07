import { uploadAvatar } from "@/features/main/api/uploadAvatar";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: (formData: FormData) => uploadAvatar(formData),

    onSuccess: (data) => {
      toast.success("Avatar uploaded successfully:", data);
    },
    onError: (error) => {
      console.error("Error uploading avatar:", error);
      toast.error("Error uploading avatar. Please try again.");
    },
  });
};
