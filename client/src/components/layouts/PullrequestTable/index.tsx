import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useCustomSearchParams from "../../../hooks/useCustomSearchparams";
import { FetchPullRequest } from "../../../utils/FetchPullRequest";
import Table from "../../UI/Table";
import { Column, PullRequest } from "../../UI/Table/index.types";
import { Icon } from "@iconify/react/dist/iconify.js";

const PullrequestTable = () => {
  const [pullrequest, setPullrequest] = useState<PullRequest[]>();
  const repoId = useCustomSearchParams("id");

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
          className="text-blue-500 hover:underline"
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
          className="text-blue-500 hover:underline"
        >
          View PR
        </a>
      ),
    },

    { header: "Status", accessor: "status" },
    {
      header: "Created At",
      accessor: "createdAt",
      render: (value) => new Date(value).toLocaleString(),
    },
    {
      header: "Updated At",
      accessor: "updatedAt",
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  return (
    <div className="py-4  space-y-4">
      <div className="flex justify-between ">
        <h1 className="text-2xl font-medium mb-4 text-start underline ">
          Pull Requests {"( "}Total:{" "}
          <span className="">{pullrequest?.length}</span>
          {" )"}
        </h1>
        {pullrequest && pullrequest?.length > 0 && (
          <div className="flex items-center justify-center border  rounded-full px-2 ">
            <Icon icon="weui:search-outlined" className="text-3xl" />
            <input
              type="search"
              id="search"
              className=" bg-transparent px-4  focus:outline-none "
              placeholder="Search here"
            />
          </div>
        )}
      </div>
      {pullrequest?.length === 0 ? (
        <div>There is No Pull request Right Now</div>
      ) : (
        <Table data={pullrequest} columns={columns} />
      )}
    </div>
  );
};

export default PullrequestTable;
