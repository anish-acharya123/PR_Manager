import Button from "../../UI/Button";
import { useState } from "react";
import CollaborationSearch from "../CollaborationSearch/CollaborationSearch";

const SearchPopup = ({
  setPopup,
}: {
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [query, setQuery] = useState<string | undefined>();

  return (
    <div className="absolute top-1/2 left-1/2 transform text-start px-4 py-2 font-medium -translate-x-1/2 -translate-y-1/2 bg-black w-1/2 border rounded-md transition-all">
      <div className="flex justify-between">
        <p>Add people to Repo-1</p>
        <Button
          label="X"
          variant="secondary"
          className="px-2"
          onclick={() => setPopup(false)}
        />
      </div>
      <p>Search by username, full name, or email</p>

      <input
        type="search"
        className="w-full mt-4 px-2 py-2 rounded-full focus:outline-none bg-transparent border"
        onChange={(e) => setQuery(e.target.value)}
      />

      <CollaborationSearch query={query} />
    </div>
  );
};

export default SearchPopup;
