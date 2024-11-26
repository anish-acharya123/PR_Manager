import DynamicSkeleton from "../../UI/Skeletons";

const UserReposSkeleton = () => {
  return (
    <div className="text-center space-y-4 flex flex-col items-center">
      <h2 className="text-2xl font-medium border-b-2 pb-6">
        Select a repository to start managing pull requests.
      </h2>

      <ul className="text-start w-full flex justify-between flex-col">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={index}
            className="flex justify-between py-4 border-b-2 border-gray-500"
          >
            <div className="space-y-4">
              <DynamicSkeleton
                variant="text"
                width="15rem"
                height="2rem"
                className=""
              />
              <div className="flex gap-4">
                <DynamicSkeleton variant="text" width="40%" height="1rem" />
                <DynamicSkeleton variant="text" width="40%" height="1rem" />
              </div>
            </div>

            <DynamicSkeleton
              variant="rectangular"
              width="3rem"
              height="4rem"
              className="rounded-md"
            />
          </li>
        ))}
      </ul>

      <div className="flex">
        <DynamicSkeleton
          variant="text"
          width="5rem"
          height="2rem"
          className="inline-block bg-gray-400"
        />
        <DynamicSkeleton
          variant="text"
          width="5rem"
          height="2rem"
          className="inline-block bg-gray-400 ml-4"
        />
      </div>
    </div>
  );
};

export default UserReposSkeleton;
