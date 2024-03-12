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
    return (await rooms.json()) as Room[];
  } catch (e: any) {
    console.log(e.message);
  }
};

export default GetRooms;
