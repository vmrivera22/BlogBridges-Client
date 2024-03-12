interface Props {
  input: {
    userName: string;
    imageUrl: string;
  };
  token: string;
}

const UpdateImage = async ({ input, token }: Props) => {
  await fetch("https://blogbridges.azurewebsites.net/api/Users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userName: input.userName,
      imageUrl: input.imageUrl,
    }),
  });
};

export default UpdateImage;
