import { useSearchParams } from "react-router-dom";
const useCustomSearchParams = (searchquery: string) => {
  const [searchParams] = useSearchParams();

  return searchParams.get(searchquery);
};
export default useCustomSearchParams;
