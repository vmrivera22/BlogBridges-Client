import "../../lib/Structures";

interface Props {
  userName: string;
  page: number;
}

const GetImage = async ({ userName, page }: Props) => {
  try {
    const user = await fetch(
      `https://blogbridges.azurewebsites.net/api//Users/${userName}/${page}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return { data: (await user.json()) as User, page: page };
  } catch (e: any) {
    console.log(e.message);
  }
};

export default GetImage;
