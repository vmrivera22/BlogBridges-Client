import "../css/Home.css";
import Post from "../Components/Post";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import "../lib/Structures";
import usePageBottom from "@/utils/hooks/usePageBottom";
import { useGetPosts } from "@/utils/reactquery/Queries";
import AnimatedLayout from "../AnimatedLayout";

// Component for Home page (Route).
const Home = () => {
  const bottom = usePageBottom(); // Hook to check if the bottom of the page has been scrolled to.

  const posts = useGetPosts(-1); // Get posts - (-1) means any room.
  if (String(posts.status) === "loading") return <h1>Loading...</h1>;
  if (String(posts.status) === "error")
    return <h1>{JSON.stringify(posts.error)}</h1>;

  // When the bottom of the page is scrolled to - fetch more posts.
  useEffect(() => {
    bottom && posts.fetchNextPage();
  }, [bottom]);

  // Map through the array of posts and create Post components.
  const postData = posts.data?.pages
    .flatMap((data) => data?.data)
    .map((post) => {
      let formatDate = "";
      if (post) {
        let arrDate = post.datePosted.split("-");
        let day = arrDate[2].split("T");
        formatDate = `${arrDate[1]}/${day[0]}/${arrDate[0]}`;
        const userName = post.user?.userName as string;
        return (
          <Post
            key={post.id}
            _id={post.id}
            title={post.title}
            body={post.body}
            author={userName}
            image={post.image}
            date={formatDate}
            avatar={post.user?.imageUrl}
          />
        );
      }
    });

  return (
    <AnimatedLayout>
      <div className="main--container auto--margin">{postData}</div>
      <Outlet />
    </AnimatedLayout>
  );
};

export default Home;
