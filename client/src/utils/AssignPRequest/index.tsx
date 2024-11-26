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

    toast.success(response.data.message || "Reviewer assigned successfully!");
  } catch (error: any) {
    console.error("Error from frontend:", error);

    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data.message || "An error occurred";

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
      toast.error("Network error. Please check your connection.");
    }
  }
};
