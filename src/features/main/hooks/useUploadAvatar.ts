import { uploadAvatar } from "@/features/main/api/uploadAvatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => uploadAvatar(formData),

    onSuccess: (data) => {
      toast.success("Avatar uploaded successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (error) => {
      console.error("Error uploading avatar:", error);
      toast.error("Error uploading avatar. Please try again.");
    },
  });
};
