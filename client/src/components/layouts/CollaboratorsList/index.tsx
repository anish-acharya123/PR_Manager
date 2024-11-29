import { useState, useEffect } from "react";
import axios from "axios";
import { useTokenContext } from "../../../context/TokenContext";
import useCustomSearchParams from "../../../hooks/useCustomSearchparams";
import Button from "../../UI/Button";
import { collboratorProps } from "./index.types";
import useUpdateCollaboratorEmail from "../../../utils/useUpdateCollaboratorEmail";

const CollaboratorsList = () => {
  const { token } = useTokenContext();
  const repoOwner = useCustomSearchParams("user");
  const repoName = useCustomSearchParams("repo");
  const repoId = useCustomSearchParams("id");

  const [collaborators, setCollaborators] = useState<collboratorProps[]>([]);
  const { updateCollaboratorEmail } = useUpdateCollaboratorEmail();

  const handleUpdateEmail = (collaboratorId: string) => {
    const email = prompt("Enter email for this collaborator:");
    if (email) {
      updateCollaboratorEmail(
        { collaboratorId, email, token },
        {
          onSuccess: (data) => {
            console.log(data);
            setCollaborators((prevCollaborators) =>
              prevCollaborators.map((collab) =>
                collab.collaborator._id === collaboratorId
                  ? {
                      ...collab,
                      collaborator: { ...collab.collaborator, email },
                    }
                  : collab
              )
            );
          },
        }
      );
    }
  };

  const fetchCollaborators = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/collaborator/pullrequest/totalcollaborators?repoOwner=${repoOwner}&repoName=${repoName}&repoId=${repoId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCollaborators(response.data.collaborators);
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, [repoOwner, repoName, repoId, token]);

  return (
    <div className="pt-2">
      <h1 className="text-2xl font-semibold mb-4">Collaborators :</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborators.map(({ collaborator, status }) => (
          <div
            key={collaborator._id}
            className="border shadow-md rounded-lg p-4 flex-wrap flex justify-between items-center"
          >
            <div className="flex items-center gap-4 hover:bg-gray-800 cursor-pointer">
              <figure className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <img
                  src={
                    collaborator.avatarUrl || "https://via.placeholder.com/64"
                  }
                  alt={collaborator.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </figure>
              <div>
                <a
                  href={collaborator.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <h2 className="font-medium text-blue-400 hover:underline">
                    {collaborator.name.toUpperCase()}
                  </h2>
                </a>
                <p className="text-sm text-gray-500">Status: {status}</p>
              </div>
            </div>
            <div>
              <Button
                icon={`${
                  collaborator.email?.split("@")[1] === "gmail.com"
                    ? "line-md:email-check"
                    : "line-md:email-plus"
                }`}
                iconClass="text-3xl text-red-500 hover:text-green-500 cursor-pointer"
                variant="normal"
                onclick={() => handleUpdateEmail(collaborator._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorsList;
