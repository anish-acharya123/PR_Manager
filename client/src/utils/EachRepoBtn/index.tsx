import useCustomSearchParams from "../../hooks/useCustomSearchparams";

const EachRepoBtn = () => {
  const user = useCustomSearchParams("user");
  const repo = useCustomSearchParams("repo");
  console.log(user, repo);

  const navigateToRepoSetting = () => {
    window.location.href = `https://github.com/${user}/${repo}/settings`;
  };
  const navigateToGithub = () => {
    window.location.href = `https://github.com/${user}/${repo}`;
  };
  return { navigateToRepoSetting, navigateToGithub };
};

export default EachRepoBtn;
