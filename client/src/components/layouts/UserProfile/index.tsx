import { Icon } from "@iconify/react/dist/iconify.js";
import { useCustomQuery } from "../../../hooks/useCustomQuery";
import { useTokenContext } from "../../../context/TokenContext";
import { GitHubUser } from "./index.types";

const UserProfile = () => {
  const { token } = useTokenContext();

  const { data, isLoading, isFetching, error } = useCustomQuery<
    GitHubUser | undefined
  >(["userdata"], "https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data, isLoading, isFetching, error);
  return (
    <div className="space-y-3  ">
      <figure>
        <img src={data?.avatar_url} alt={data?.name} className="rounded-lg" />
      </figure>
      <h1 className="text-2xl font-bold uppercase text-glow">
        Welcome, {data?.name}
      </h1>
      <p>{data?.bio}</p>
      <p>{data?.location}</p>
      <div className="flex  gap-4">
        <p className="text-gray-300 flex items-center justify-center gap-2">
          <Icon icon="pepicons-pencil:persons" className="text-lg" />
          <span>Followers: {data?.followers}</span>
        </p>
        <p className="text-gray-300 flex items-center justify-center gap-2">
          <Icon icon="simple-line-icons:user-following" className="text-lg" />
          <span>Following: {data?.following}</span>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
