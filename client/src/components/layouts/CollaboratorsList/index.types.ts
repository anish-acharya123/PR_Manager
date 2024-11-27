export type CollaboratorDetails = {
  repoOwner: string;
  repoId: number;
  inviteeGithub: string;
  inviteeName: string;
  inviteeAvatar: string;
  email: string;
  status: string;
  _id: number;
};

export type CollaboratorProps = {
  collaborators: CollaboratorDetails[];
};
