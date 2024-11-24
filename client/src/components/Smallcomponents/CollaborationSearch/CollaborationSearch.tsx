import { useEffect, useState } from "react";
import List from "../../UI/List";
import { useCustomQuery } from "../../../hooks/useCustomQuery";

const CollaborationSearch = ({ query }: { query: string | undefined }) => {
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

  console.log(error);
  const isUpcoming = isLoading || isFetching;

  return (
    <>
      {isUpcoming ? (
        <p>Loading</p>
      ) : (
        <List
          className="py-2"
          items={data?.items || []}
          renderItem={(item: any) => (
            <li className="flex justify-between py-2 border-b border-gray-300">
              <span>{item.login}</span>
              <img
                src={item.avatar_url}
                alt={item.login}
                className="h-12 w-12 rounded-full"
              />
            </li>
          )}
        />
      )}
    </>
  );
};

export default CollaborationSearch;
