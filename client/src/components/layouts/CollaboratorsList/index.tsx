import { useState, useEffect } from "react";
import axios from "axios";
import { useTokenContext } from "../../../context/TokenContext";
import useCustomSearchParams from "../../../hooks/useCustomSearchparams";

const CollaboratorsList = () => {
  const { token } = useTokenContext();
  console.log(token);
  const repoOwner = useCustomSearchParams("user");
  const repoName = useCustomSearchParams("repo");
  const repoId = useCustomSearchParams("id");

  const [collaborators, setCollaborators] = useState<any>([]);

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
    <div className="pt-2 ">
      <h1 className="text-2xl font-semibold mb-4">Collaborators :</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {collaborators.map((collaborator: any) => (
          <div
            key={collaborator._id}
            className="border shadow-md rounded-lg p-4 flex items-center gap-4 hover:bg-gray-800 cursor-pointer"
          >
            <figure className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <img
                src={
                  collaborator.inviteeAvatar || "https://via.placeholder.com/64"
                }
                alt={collaborator.inviteeName}
                className="w-full h-full rounded-full object-cover"
              />
            </figure>
            <div>
              <a href={collaborator.inviteeGithub} target="_blank">
                <h2 className=" font-medium text-blue-400 hover:underline">
                  {collaborator.inviteeName.toUpperCase()}
                </h2>
              </a>
              <p className="text-sm text-gray-500">
                Status: {collaborator.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorsList;
