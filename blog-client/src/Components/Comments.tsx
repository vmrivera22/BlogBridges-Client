import "../css/Comments.css";
import arrow from "../assets/reply.png";
import { useAuth0 } from "@auth0/auth0-react";
import NewComment from "./CreatUpdateComponents/NewComment";
import { v4 as uuid } from "uuid";
import "../lib/Structures";
import AlertTrigger from "./AlertTrigger";
import UserAvatar from "./UserAvatar";
import { useGetComments } from "@/utils/reactquery/Queries";

interface Props {
  postId: number;
}

// Component that is used to display comments for a post.
const Comments = ({ postId }: Props) => {
  const { user } = useAuth0();

  // Fetch the comments from the database.
  const getCommentsQuery = useGetComments(postId);
  if (String(getCommentsQuery.status) === "loading") return <h1>Loading...</h1>;
  if (String(getCommentsQuery.status) === "error")
    return <h1>{JSON.stringify(getCommentsQuery.error)}</h1>;

  // Create the comment structure recursively.
  const comm = getCommentsQuery.data?.map((item) => {
    return callbackFunction(item, 0, postId, user);
  });
  return <div className="comments--container">{comm}</div>;
};

// Recursively called function to display comments and their children.
const callbackFunction = (
  item: Comment,
  level: number = 0,
  postId: number,
  user: any
) => {
  let commentStyle;

  // Style to proprly structure comments. Indent if not the root comment.
  if (level != 0) {
    commentStyle = {
      borderLeft: `1px solid rgb(130, 130, 130)`,
      paddingLeft: `10px`,
      marginLeft: `20px`,
      marginTop: `7px`,
      marginBottom: `7px`,
    };
  }
  return (
    <div key={uuid()} className="comment" style={commentStyle}>
      <div className="comment--creator">
        <UserAvatar selfUser={false} propsImageUri={item.user.imageUrl} />{" "}
        {item.user.userName}
      </div>
      <div className="comment--content">{item.content}</div>
      <div className="comment--buttons">
        <AlertTrigger
          content={
            <NewComment
              reply={true}
              postId={Number(postId)}
              parentAuthor={item.user.userName}
              parentContent={item.content}
              parentId={item.id}
            />
          }
          trigger={
            <label className="comment--reply">
              <img src={arrow} /> Reply
            </label>
          }
          type="reply"
        />
      </div>
      {item.comments &&
        item.comments.map((i) => callbackFunction(i, level + 1, postId, user))}
    </div>
  );
};

export default Comments;
