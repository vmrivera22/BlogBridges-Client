interface Props {
  input: {
    title?: string;
    description?: string;
    id?: number;
  };
  token: string;
}

const UpdatePost = async ({ input, token }: Props) => {
  await fetch("https://blogbridges.azurewebsites.net/api/Posts", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: input?.title,
      body: input?.description,
      image: "https://placehold.co/100",
      id: input?.id,
    }),
  });
};

export default UpdatePost;
