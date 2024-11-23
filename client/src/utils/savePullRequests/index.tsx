import axios from "axios";

export type SavePullRequestsParams = {
  owner: string | null;
  repo: string | null;
  token: string | null;
  repoId: string | null;
};

export const savePullRequests = async ({
  owner,
  repo,
  token,
  repoId,
}: SavePullRequestsParams): Promise<any> => {
  try {
    console.log("rrequest");
    const response = await axios.post(
      ` http://localhost:5000/api/repos/${owner}/${repo}/pull-requests`,
      { owner, repo, token, repoId }
    );

    const data = response.data.message;
    return data;
  } catch (error) {
    console.log("Error from frontend", error);
  }
};
