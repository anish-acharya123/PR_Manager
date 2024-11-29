import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type CollaboratorEmailProps = {
  collaboratorId: string;
  email: string;
  token: string | null;
};

const useUpdateCollaboratorEmail = () => {
  const mutation = useMutation({
    mutationFn: async ({
      collaboratorId,
      email,
      token,
    }: CollaboratorEmailProps) => {
      const response = await axios.patch(
        `http://localhost:5000/collaborator/update-email`,
        { collaboratorId, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Email successfully updated!");
    },
    onError: (error: any) => {
      console.error("Error updating collaborator email:", error);

      if (error.response) {
        const errorMessage = error.response.data.message || "An error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("Network error. Please check your connection.");
      }
    },
  });

  return {
    updateCollaboratorEmail: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default useUpdateCollaboratorEmail;
