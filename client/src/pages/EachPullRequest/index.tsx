import { useMutation } from "@tanstack/react-query";
import PullrequestTable from "../../components/layouts/PullrequestTable";
import Button from "../../components/UI/Button";
import MaxwidthContainer from "../../components/wrapper/Maxwidth";
import useCustomSearchParams from "../../hooks/useCustomSearchparams";
import { savePullRequests } from "../../utils/savePullRequests";
import { useTokenContext } from "../../context/TokenContext";
import { useEffect } from "react";
import useCustomNavigation from "../../hooks/useCustomNavigation";

const EachPullRequest = () => {
  const { query } = useCustomSearchParams();
  const repo = query("repo");
  const owner = query("user");
  const repoId = query("id");
  const { goBack } = useCustomNavigation();
  const { token } = useTokenContext();

  const mutation = useMutation({
    mutationFn: savePullRequests,
    onSuccess: (data: string) => {
      console.log(data);
    },
  });

  useEffect(() => {
    if (owner && repo && token && repoId) {
      mutation.mutate({ owner, repo, token, repoId });
    }
  }, [owner, repo, token, repoId]);

  return (
    <section className="py-16 ">
      {
        <MaxwidthContainer>
          <Button label="← back" variant="outline" onclick={() => goBack()} />
          <div className="flex  items-center justify-center text-center flex-col ">
            <h1 className="text-4xl   font-medium underline underline-offset-4 border-gray-500 py-2 ">
              Repository:{" "}
              <span className="text-green-400 text-glow">{repo}</span>
            </h1>
            <div>
              <PullrequestTable />
            </div>
          </div>
        </MaxwidthContainer>
      }
    </section>
  );
};

export default EachPullRequest;
