interface Props {
  postId: number;
  token: string;
}

const DeletePost = async ({ postId, token }: Props) => {
  await fetch(`https://blogbridges.azurewebsites.net/api/Posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return;
};

export default DeletePost;
