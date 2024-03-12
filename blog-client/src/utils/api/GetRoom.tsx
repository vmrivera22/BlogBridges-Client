import "../../lib/Structures";

interface Props {
  id: number;
  page: number;
}

const GetRoom = async ({ id, page }: Props) => {
  try {
    const rooms = await fetch(
      `https://blogbridges.azurewebsites.net/api/Rooms/${id}/${page}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return { data: (await rooms.json()) as Room, page: page };
  } catch (e: any) {
    console.log(e.message);
  }
};

export default GetRoom;
