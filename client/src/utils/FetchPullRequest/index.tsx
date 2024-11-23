import axios from "axios";

export const FetchPullRequest = async (repoId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/repos/${repoId}/pull-requests`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetch data from mb", error);
  }
};
