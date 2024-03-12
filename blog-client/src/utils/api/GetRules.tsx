import "../../lib/Structures";

interface Props {
  roomId: number;
}

const GetRules = async ({ roomId }: Props) => {
  try {
    const posts = await fetch(
      `https://blogbridges.azurewebsites.net/api/Rules/${roomId}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return (await posts.json()) as Rule[];
  } catch (e: any) {
    console.log(e.message);
  }
};

export default GetRules;
