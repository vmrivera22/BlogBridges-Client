interface Props {
  input: {
    content: string;
    author: string;
    parentId?: number;
    postId: number;
  };
  token: string;
}

interface Comment {
  id: number;
}

const CreateComment = async ({ input, token }: Props) => {
  const fechedComment = await fetch(
    "https://blogbridges.azurewebsites.net/api/Comments",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: input.content,
        author: input.author,
        parentId: input.parentId,
        postId: input.postId,
      }),
    }
  );
  const strigifiedComment = (await fechedComment.json()) as Comment;
  return strigifiedComment.id;
};

export default CreateComment;
