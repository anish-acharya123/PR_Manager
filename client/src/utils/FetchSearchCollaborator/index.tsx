import { useEffect, useState } from "react";
import { useCustomQuery } from "../../hooks/useCustomQuery";

const FetchSearchCollaborator = (query: string | undefined) => {
  const [debouncedQuery, setDebouncedQuery] = useState<string | undefined>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const { data, isLoading, isFetching, error } = useCustomQuery<
    any | undefined
  >(
    ["userSearch", debouncedQuery],
    debouncedQuery
      ? `https://api.github.com/search/users?q=${debouncedQuery}&per_page=5&page=1`
      : ""
  );

  const isUpcoming = isLoading || isFetching;

  return { data, isUpcoming, error };
};

export default FetchSearchCollaborator;
