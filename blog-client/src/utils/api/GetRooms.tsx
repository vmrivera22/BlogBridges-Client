import "../../lib/Structures";

const GetRooms = async () => {
  try {
    const rooms = await fetch(
      "https://blogbridges.azurewebsites.net/api/Rooms",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (rooms) {
      return (await rooms.json()) as Room[];
    }
    return;
  } catch (e: any) {
    console.log(e.message);
    return;
  }
};

export default GetRooms;
