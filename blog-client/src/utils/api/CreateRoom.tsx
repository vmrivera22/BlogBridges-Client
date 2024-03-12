interface Props {
  input: {
    name?: string;
    description?: string;
    creator?: string;
  };
  token: string;
}

interface Room {
  id: number;
}

const CreateRoom = async ({ input, token }: Props) => {
  const room = await fetch("https://blogbridges.azurewebsites.net/api/Rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: input.name,
      userName: input.creator,
      description: input.description,
    }),
  });
  const stringifiedRoom = (await room.json()) as Room;
  return stringifiedRoom.id;
};

export default CreateRoom;
