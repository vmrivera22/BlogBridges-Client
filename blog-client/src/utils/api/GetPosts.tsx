import "../../lib/Structures";

interface Props {
  roomId: number;
  postId: number;
  page: number;
}

const GetPosts = async ({ roomId, postId, page }: Props) => {
  try {
    const posts = await fetch(
      `https://blogbridges.azurewebsites.net/api/Posts/${roomId}/${postId}/${page}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return { data: (await posts.json()) as Post[], page: page };
  } catch (e: any) {
    console.log(e.message);
  }
};

export default GetPosts;
