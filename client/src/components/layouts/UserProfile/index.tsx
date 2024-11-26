import { Icon } from "@iconify/react/dist/iconify.js";
import { useCustomQuery } from "../../../hooks/useCustomQuery";
import { useTokenContext } from "../../../context/TokenContext";
import { GitHubUser } from "./index.types";
import UserProfileSkeleton from "../UserProfileSkeleton";

const UserProfile = () => {
  const { token } = useTokenContext();

  const { data, isLoading, isFetching, error } = useCustomQuery<
    GitHubUser | undefined
  >(["userdata"], "https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const isUpcoming = isLoading || isFetching;
    if (isUpcoming) {
      return <UserProfileSkeleton />;
    }

  console.log(error);

  return (
    <div className="space-y-3">
      <figure data-aos="fade-right" data-aos-duration="1000">
        <img src={data?.avatar_url} alt={data?.name} className="rounded-lg " />
      </figure>

      <h1
        className="text-2xl font-bold uppercase text-glow"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        Welcome, {data?.name}
      </h1>

      <p data-aos="fade-right" data-aos-duration="1000">
        {data?.bio}
      </p>

      <p data-aos="fade-right" data-aos-duration="1000">
        {data?.location}
      </p>

      <div className="flex gap-4">
        <p
          data-aos="fade-right"
          data-aos-duration="1000"
          className="text-gray-300 flex items-center justify-center gap-2"
        >
          <Icon icon="pepicons-pencil:persons" className="text-lg" />
          <a href={data?.followers_url}>
            <span>Followers: {data?.followers || "0"}</span>
          </a>
        </p>
        <p
          data-aos="fade-right"
          data-aos-duration="1000"
          className="text-gray-300 flex items-center justify-center gap-2"
        >
          <Icon icon="simple-line-icons:user-following" className="text-lg" />
          <a href={data?.following_url}>
            <span>Following: {data?.following || "0"}</span>
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
