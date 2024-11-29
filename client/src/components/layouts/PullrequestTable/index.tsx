import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useCustomSearchParams from "../../../hooks/useCustomSearchparams";
import { FetchPullRequest } from "../../../utils/FetchPullRequest";
import Table from "../../UI/Table";
import { Column, PullRequest } from "../../UI/Table/index.types";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../UI/Button";
import EachRepoBtn from "../../../utils/EachRepoBtn";

const PullrequestTable = () => {
  const [pullrequest, setPullrequest] = useState<PullRequest[]>();
  const repoId = useCustomSearchParams("id");
  const { navigateToRepoSetting, navigateToGithub } = EachRepoBtn();

  const mutation = useMutation({
    mutationFn: FetchPullRequest,
    onSuccess: (data: PullRequest[]) => {
      setPullrequest(data);
    },
  });

  useEffect(() => {
    if (repoId) {
      mutation.mutate(repoId);
    }
  }, [repoId]);

  console.log(pullrequest);

  const columns: Column<PullRequest>[] = [
    { header: "Title", accessor: "title" },
    {
      header: "PR Author",
      accessor: "authorLink",
      render: (_, row) => (
        <a
          href={row.authorLink}
          target="_blank"
          className="text-blue-400 hover:underline"
        >
          {row.authorName}
        </a>
      ),
    },
    {
      header: "PR Link",
      accessor: "prLink",
      render: (value) => (
        <a
          href={value}
          target="_blank"
          className="text-blue-400 hover:underline"
        >
          View PR
        </a>
      ),
    },

    {
      header: "Status",
      accessor: "status",
      render: (_, row) => (
        <div className="flex items-center  gap-1">
          {row.status === "open" ? (
            <Icon icon="fluent-emoji-flat:green-circle" />
          ) : (
            <Icon icon="mingcute:close-circle-fill" />
          )}
          <span>{row.status}</span>
        </div>
      ),
    },
    {
      header: "Reviewer",
      accessor: "reviewer",
      render: (_, row) => {
        if (
          row.reviewer?.name.length > 0 &&
          row.reviewer?.githubUrl.length > 0
        ) {
          return (
            <a
              href={row.reviewer.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:underline"
            >
              {row.reviewer.name}
            </a>
          );
        }

        return (
          <span className="text-gray-500 italic">No reviewer assigned</span>
        );
      },
    },
  ];

  return (
    <div className="py-4  space-y-4">
      <div className="flex justify-between  ">
        <div className="font-medium mb-4 text-start  space-y-2 ">
          <p className="underline text-2xl ">
            {" "}
            Pull Requests : {pullrequest?.length}
          </p>

          <div className="flex gap-2">
            <Button
              className="flex items-end px-2 py-1 gap-1 "
              labelClass="text-sm"
              iconClass="text-xl"
              label="Setting"
              variant="outline"
              icon="weui:setting-outlined"
              onclick={() => navigateToRepoSetting()}
            />
            <Button
              className="flex items-end px-2 py-1 gap-1 "
              labelClass="text-sm"
              iconClass="text-xl"
              label="View on GitHub"
              variant="outline"
              icon="hugeicons:github-01"
              onclick={() => navigateToGithub()}
            />
          </div>
        </div>
        {pullrequest && pullrequest?.length > 0 && (
          <div className="flex items-center justify-center gap-4">
            <p className="text-xl">Filter By:</p>
            <Button
              variant="outline"
              label="Open"
              className="px-2 py-1 text-sm"
            />
            <Button
              variant="outline"
              label="Close"
              className="px-2 py-1 text-sm"
            />
            <div className="flex items-center justify-center border  rounded-full px-2 h-8 text-sm ">
              <Icon icon="weui:search-outlined" className="text-2xl" />
              <input
                type="search"
                id="search"
                className=" bg-transparent px-4  focus:outline-none "
                placeholder="Search here"
              />
            </div>
          </div>
        )}
      </div>
      {/* <div>anish</div> */}
      {pullrequest?.length === 0 ? (
        <div>There is No Pull request Right Now</div>
      ) : (
        <Table data={pullrequest} columns={columns} />
      )}
    </div>
  );
};

export default PullrequestTable;
