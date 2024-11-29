import { useMutation } from "@tanstack/react-query";
import PullrequestTable from "../../components/layouts/PullrequestTable";
import MaxwidthContainer from "../../components/wrapper/Maxwidth";
import useCustomSearchParams from "../../hooks/useCustomSearchparams";
import { savePullRequests } from "../../utils/savePullRequests";
import { useTokenContext } from "../../context/TokenContext";
import { useEffect } from "react";
import AssigningCollaborator from "../../components/layouts/AssigningCollaborator";
import { Icon } from "@iconify/react/dist/iconify.js";

const EachPullRequest = () => {
  const repo = useCustomSearchParams("repo");
  const owner = useCustomSearchParams("user");
  const repoId = useCustomSearchParams("id");
  // const { goBack } = useCustomNavigation();
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
    <section className="py-5 ">
      <MaxwidthContainer>
        <div className=" flex items-center  justify-center ">
          <div className="text-center  w-[80%] relative  ">
            <div className="flex items-end justify-center gap-2">
              <Icon icon="iconoir:folder" className="text-5xl mb-1" />
              <h1 className="text-4xl  text-start   font-medium  underline underline-offset-4 border-gray-500 py-2 ">
                Repository:{" "}
                <span className="text-blue-300 text-glow text-4xl">
                  {repo}
                </span>
              </h1>
            </div>
            <PullrequestTable />
            <AssigningCollaborator />
          </div>
        </div>
      </MaxwidthContainer>
    </section>
  );
};

export default EachPullRequest;
