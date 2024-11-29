import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type RepoProps = {
  token: string;
};

const useFetchAndStoreRepos = () => {
  const mutation = useMutation({
    mutationFn: async ({ token }: RepoProps) => {
      console.log("anish");
      const response = await axios.post(
        `http://localhost:5000/repos/fetch-and-store`,
        { token }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Repositories successfully stored!");
    },
    onError: (error: any) => {
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
    },
  });

  return {
    fetchAndStoreRepos: (token: string) => mutation.mutate({ token }),
    data: mutation.data,
  };
};

export default useFetchAndStoreRepos;
