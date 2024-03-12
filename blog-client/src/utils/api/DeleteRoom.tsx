interface Props {
  roomId: number;
  token: string;
}

const DeleteRoom = async ({ roomId, token }: Props) => {
  await fetch(`https://blogbridges.azurewebsites.net/api/Rooms/${roomId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return;
};

export default DeleteRoom;
