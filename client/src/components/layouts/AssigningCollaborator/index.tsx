import { useState } from "react";
import Button from "../../UI/Button";
import SearchPopup from "../../Smallcomponents/PopUp/SearchPopup";
import CollaboratorsList from "../CollaboratorsList";
import SendPrRequest from "../../Smallcomponents/SendPrRequest";

const AssigningCollaborator = () => {
  const [popUp, setPopup] = useState(false);
  const { handlebtn } = SendPrRequest();

  return (
    <>
      {popUp && (
        <div className="absolute inset-0  bg-opacity-50  pointer-events-auto" />
      )}
      <div className=" text-start py-4 space-y-2">
        <h2 className="text-xl">(Assigning Collaborator to Pull Requests)</h2>
        <div className="flex gap-4 items-end">
          <Button
            className="flex items-center gap-2 px-2 py-1"
            icon="wpf:collaborator"
            label="Add Collaborator"
            variant="primary"
            onclick={() => setPopup(!popUp)}
          />
          <Button
            className="flex items-center gap-2 px-2 py-1"
            icon="material-symbols:add-box-outline"
            label="Assign Reviewer Randomly"
            variant="secondary"
            onclick={() => handlebtn()}
          />
        </div>

        <CollaboratorsList />
      </div>
      {popUp && <SearchPopup setPopup={setPopup} />}
    </>
  );
};

export default AssigningCollaborator;
