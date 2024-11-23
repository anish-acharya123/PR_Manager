import FetchUserRepos from "../../../utils/FetchUserRepo";

const RepoPegination = () => {
  const { repos, setPage, page } = FetchUserRepos();

  const handleNext = () => {
    setPage((prevPage: number) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prevPage: number) => prevPage - 1);
    }
  };
  return (
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
        disabled={repos && repos.length < 5}
        className="p-2 disabled:text-gray-500 text-blue-400"
      >
        Next {">"}
      </button>
    </div>
  );
};

export default RepoPegination;
