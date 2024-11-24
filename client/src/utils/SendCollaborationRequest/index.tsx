import { useMutation } from "@tanstack/react-query";
import { useTokenContext } from "../../context/TokenContext";
import useCustomSearchParams from "../../hooks/useCustomSearchparams";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SendCollaborationProps } from "./index.types";

const SendCollaborationRequest = () => {
  const repoName = useCustomSearchParams("repo");
  const repoOwner = useCustomSearchParams("user");
  const { token } = useTokenContext();

  const SendCollaboration = async ({
    repoOwner,
    repoName,
    token,
    collaboratorUsername,
  }: SendCollaborationProps) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/collaborator/add-collaborator`,
        { repoOwner, repoName, token, collaboratorUsername }
      );
      return response;
    } catch (error) {
      console.log("Error while sending collab request", error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationFn: SendCollaboration,
    onSuccess: (data: any) => {
      console.log(data);
      if (data.status === 201) {
        toast.success("Collaboration request sent successfully!");
      }
    },
    onError: (error: any) => {
      toast.error("Failed to send collaboration request. Please try again.");
      console.log(error);
    },
  });

  const handleCollabBtn = (collaboratorUsername: string) => {
    if (repoOwner && repoName && token) {
      mutation.mutate({ repoOwner, repoName, token, collaboratorUsername });
    }
  };

  return { handleCollabBtn };
};

export default SendCollaborationRequest;
