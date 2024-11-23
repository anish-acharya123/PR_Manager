import { useSearchParams } from "react-router-dom";
const useCustomSearchParams = () => {
  const [searchParams] = useSearchParams();
  const query = (searchquery: string) => {
    return searchParams.get(searchquery);
  };
  return { query };
};
export default useCustomSearchParams;
