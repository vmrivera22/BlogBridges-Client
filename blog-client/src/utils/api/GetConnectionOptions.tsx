interface Props {
  token: string;
  domain: string;
  connectionId: string;
}

const GetConnection = async ({ token, domain }: Props) => {
  try {
    const posts = await fetch(
      `https://${domain}/api/v2/connections/CONNECTION-ID?fields=options`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return (await posts.json()) as Post[];
  } catch (e: any) {
    console.log(e.message);
  }
};

export default GetConnection;
