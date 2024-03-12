interface Props {
  input: {
    name?: string;
    description?: string;
    _id?: number;
  };
  token: string;
}

const UpdateRoom = async ({ input, token }: Props) => {
  await fetch("https://blogbridges.azurewebsites.net/api/Rooms", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: input?.name,
      description: input?.description,
      id: input?._id,
    }),
  });
};

export default UpdateRoom;
