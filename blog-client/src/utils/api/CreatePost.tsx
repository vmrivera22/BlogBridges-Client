import "../../lib/Structures";

interface Props {
  input: {
    title?: string;
    description?: string;
    image?: string;
    roomId: number;
    author: string;
  };
  token: string;
}

const CreatePost = async ({ input, token }: Props) => {
  const post = await fetch("https://blogbridges.azurewebsites.net/api/Posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      author: input.author,
      title: input.title,
      body: input.description,
      image: input.image,
      roomId: input.roomId,
    }),
  });
  const stringifiedPost = (await post.json()) as Post;
  return stringifiedPost.id;
};

export default CreatePost;
