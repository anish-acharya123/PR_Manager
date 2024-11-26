import DynamicSkeleton from "../../UI/Skeletons";

const UserProfileSkeleton = () => {
  return (
    <div className="space-y-3">
      <DynamicSkeleton
        variant="circular"
        width="20rem"
        height="20rem"
        style={{
          borderRadius: "1rem",
        }}
        className="bg-gray-400"
      />

      <DynamicSkeleton
        variant="text"
        width="80%"
        height="2rem"
        className="bg-gray-400"
      />

      <DynamicSkeleton
        variant="text"
        width="80%"
        className="bg-gray-400"
        style={{ height: "1.2rem" }}
      />

      <DynamicSkeleton
        variant="text"
        width="50%"
        className="bg-gray-400"
        style={{ height: "1rem" }}
      />

      <div className="flex gap-4">
        <DynamicSkeleton
          variant="text"
          width="40%"
          className="bg-gray-400"
          style={{ height: "1rem" }}
        />
        <DynamicSkeleton
          variant="text"
          width="40%"
          className="bg-gray-400"
          style={{ height: "1rem" }}
        />
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
