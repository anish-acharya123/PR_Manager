import { useNavigate } from "react-router-dom";

const useCustomNavigation = () => {
  const navigate = useNavigate();
  const goTo = (path: string) => {
    navigate(path);
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  return { goTo, goBack, goForward };
};

export default useCustomNavigation;
