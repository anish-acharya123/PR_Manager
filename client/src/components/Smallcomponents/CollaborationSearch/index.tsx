import List from "../../UI/List";
import FetchSearchCollaborator from "../../../utils/FetchSearchCollaborator";
import SendCollaborationRequest from "../../../utils/SendCollaborationRequest";
import Button from "../../UI/Button";
import { useState } from "react";

const CollaborationSearch = ({ query }: { query: string | undefined }) => {
  const { isUpcoming, data, error } = FetchSearchCollaborator(query);
  const { handleCollabBtn } = SendCollaborationRequest();
  const [selected, setSelected] = useState<string>("");

  console.log(error);

  return (
    <>
      {isUpcoming ? (
        <p>Loading</p>
      ) : (
        <div>
          <List
            className="py-2"
            items={data?.items || []}
            renderItem={(item: any) => (
              <li
                className={`
                 ${selected == item.login && "bg-green-700 hover:bg-green-700"}
                  flex items-center  justify-between py-2 border-b border-gray-300 cursor-pointer hover:bg-gray-700 px-2 rounded-md active:bg-gray-700`}
                onClick={() => setSelected(item.login)}
              >
                <span className="text-blue-400">{item.login}</span>
                <img
                  src={item.avatar_url}
                  alt={item.login}
                  className="h-10 w-10 rounded-full"
                />
              </li>
            )}
          />
          {selected?.length > 0 && (
            <div className="flex justify-end gap-4">
              <Button
                label="Cancel"
                className="px-2 py-2"
                variant="secondary"
                onclick={() => setSelected("")}
              />
              <Button
                label="Add Collaborator"
                className="px-2 py-2"
                onclick={() => handleCollabBtn(selected)}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CollaborationSearch;
