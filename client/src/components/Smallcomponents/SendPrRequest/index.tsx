import { useMutation } from "@tanstack/react-query";
import useCustomSearchParams from "../../../hooks/useCustomSearchparams";
import { AssignPRequest } from "../../../utils/AssignPRequest";

const SendPrRequest = () => {
  const repo = useCustomSearchParams("repo");
  const repoOwner = useCustomSearchParams("user");
  const repoId = useCustomSearchParams("id");
  const mutation = useMutation({
    mutationFn: AssignPRequest,
    onSuccess: (data: string) => {
      console.log(data);
    },
  });

  const handlebtn = () => {
    if (repoOwner && repo && repoId) {
      mutation.mutate({ repoOwner, repo, repoId });
    }
  };

  return { handlebtn };
};

export default SendPrRequest;
