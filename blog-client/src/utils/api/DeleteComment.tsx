interface Props {
  commentId: number;
  token: string;
}

const DeleteComment = async ({ commentId, token }: Props) => {
  await fetch(`https://blogbridges.azurewebsites.net/api/Posts/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export default DeleteComment;
