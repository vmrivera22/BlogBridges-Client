import { useNavigate, useParams } from "react-router-dom";
import Comments from "@/Components/Comments";
import NewComment from "@/Components/CreatUpdateComponents/NewComment";
import "../lib/Structures";
import Post from "@/Components/Post";
import AlertTrigger from "@/Components/AlertTrigger";
import back from "../assets/back.png";
import "../css/AlertTrigger.css";
import { useGetPost } from "@/utils/reactquery/Queries";
import AnimatedLayout from "@/AnimatedLayout";

// Component for the page - route of a individual Post.
const IndividualPost = () => {
  const { id, room } = useParams();

  // Get posts from the db.
  const getPostQuery = useGetPost(Number(id));
  if (String(getPostQuery.status) === "loading") return <h1>Loading...</h1>;
  if (String(getPostQuery.status) === "error")
    return <h1>{JSON.stringify(getPostQuery.error)}</h1>;

  const navigate = useNavigate();
  let componentPost;

  // Create a Post component -- check to make sure all needed data is present so no error is thrown
  if (
    getPostQuery.isSuccess &&
    getPostQuery.data &&
    getPostQuery.data.data.length >= 1
  ) {
    const post = getPostQuery.data.data[0];
    let author = "";
    let profileAvatar = "";
    let arrDate = post.datePosted.split("-");
    let day = arrDate[2].split("T");
    const formatDate = `${arrDate[1]}/${day[0]}/${arrDate[0]}`;
    if (post.user) {
      author = post.user.userName;
      profileAvatar = post.user.imageUrl;
    }
    componentPost = (
      <Post
        indiv={true}
        title={post.title}
        body={post.body}
        author={author}
        image={post.image}
        _id={post.id}
        date={formatDate}
        avatar={profileAvatar}
        roomId={Number(room)}
      />
    );
  }

  return (
    <AnimatedLayout>
      <div className="p-[40px] h-full">
        <img
          onClick={() => navigate(-1)}
          src={back}
          className="w-[35px] clickable"
        />
        <div className="individual--post">{componentPost}</div>
        <AlertTrigger
          content={
            <NewComment postId={Number(getPostQuery.data?.data[0].id)} />
          }
          trigger={<div className="w-full trig--bg">New Comment</div>}
          type="comment"
        />
        <div className="comments--container">
          <Comments postId={Number(id)} />
        </div>
      </div>
    </AnimatedLayout>
  );
};

export default IndividualPost;
