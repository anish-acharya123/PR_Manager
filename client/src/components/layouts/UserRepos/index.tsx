import Button from "../../UI/Button";
import List from "../../UI/List";
import useCustomNavigation from "../../../hooks/useCustomNavigation";
import useCustomSearchParams from "../../../hooks/useCustomSearchparams";
import { useState } from "react";
import { useTokenContext } from "../../../context/TokenContext";
import { useCustomQuery } from "../../../hooks/useCustomQuery";
// import RepoPegination from "../../Smallcomponents/RepoPagination";

const UserRepos = () => {
  const { goTo } = useCustomNavigation();
  const pageNumber = useCustomSearchParams("page");
  const [page, setPage] = useState(parseInt(pageNumber ?? "1"));
  const { token } = useTokenContext();

  const { data, isLoading, isFetching, error } = useCustomQuery<
    any[] | undefined
  >(["userRepo", page], "https://api.github.com/user/repos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      per_page: 5,
      page,
      sort: "updated",
      direction: "desc",
    },
  });

  console.log(data, isLoading, isFetching, error);

  const handleNext = () => {
    goTo(`/dashboard?page=${page + 1}`);
    setPage((prevPage: number) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      goTo(`/dashboard?page=${page - 1}`);
      setPage((prevPage: number) => prevPage - 1);
    }
  };
  return (
    <div className=" text-center space-y-4">
      <h2 className="text-2xl font-medium border-b-2 pb-6">
        Select a repository to start managing pull requests.
      </h2>
      <List
        items={data}
        className="text-start"
        renderItem={(item: any) => (
          <li className="flex justify-between py-4 border-b-2 border-gray-500">
            <div className="space-y-4">
              <p className="space-x-4">
                <a
                  href={item.html_url}
                  target="_blank"
                  className=" text-lg text-blue-400 hover:underline"
                >
                  <span>{item.name}</span>
                </a>
                <span className="text-xs border-2 rounded-full px-2 text-gray-400 border-gray-400">
                  {item.visibility}
                </span>
              </p>
              <p className="text-sm text-gray-400 space-x-4">
                <span>{item.language}</span>
                <span>{item.pushed_at.split("T")[0]}</span>
              </p>
            </div>
            <Button
            className="px-4 py-2"
              icon="codicon:git-pull-request-go-to-changes"
              onclick={() =>
                goTo(
                  `/mangae-pullrequest?user=${item.owner.login}&repo=${item.name}&id=${item.id}`
                )
              }
            />
          </li>
        )}
      />

      {/* <RepoPegination /> */}
      <div>
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="p-2 disabled:text-gray-500 text-blue-400"
        >
          {"< "}Previous
        </button>
        <button
          onClick={handleNext}
          disabled={data && data.length < 5}
          className="p-2 disabled:text-gray-500 text-blue-400"
        >
          Next {">"}
        </button>
      </div>
    </div>
  );
};

export default UserRepos;
