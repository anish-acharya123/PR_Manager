import axios from "axios";
import { toast } from "react-toastify";

export type AssignPRprops = {
  repoOwner: string | null;
  repo: string | null;
  repoId: string | null;
};

export const AssignPRequest = async ({
  repoOwner,
  repo,
  repoId,
}: AssignPRprops): Promise<any> => {
  try {
    const response = await axios.post(
      `http://localhost:5000/reviewer/assign-reviewer/${repoOwner}/${repoId}`,
      { repoOwner, repo, repoId }
    );

    // If successful, show a success toast
    toast.success(response.data.message || "Reviewer assigned successfully!");
  } catch (error: any) {
    console.error("Error from frontend:", error);

    // If the error has a response, handle specific status codes
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data.message || "An error occurred";

      // Handle errors based on status codes
      if (statusCode === 400) {
        toast.error(`Bad Request: ${errorMessage}`);
      } else if (statusCode === 401) {
        toast.error(`Unauthorized: ${errorMessage}`);
      } else if (statusCode === 404) {
        toast.error(`Not Found: ${errorMessage}`);
      } else if (statusCode === 500) {
        toast.error(`Server Error: ${errorMessage}`);
      } else {
        toast.error(errorMessage);
      }
    } else {
      // Handle errors without a response object (e.g., network issues)
      toast.error("Network error. Please check your connection.");
    }
  }
};
