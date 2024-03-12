import "../../lib/Structures";

interface Props {
  postId: number;
}

const GetComments = async ({ postId }: Props) => {
  try {
    const posts = await fetch(
      `https://blogbridges.azurewebsites.net/api/Comments/${postId}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return (await posts.json()) as Comment[];
  } catch (e: any) {
    console.log(e.message);
  }
};

export default GetComments;
