import "../css/Post.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { DropDownMenu } from "./DropDownMenu";
import comment from "../assets/comment.png";
import UserAvatar from "./UserAvatar";
import TokenContext from "@/TokenContext";
import { useContext } from "react";
import { useDeletePostMutation } from "@/utils/reactquery/Mutations";

interface Props {
  title: string;
  body: string;
  author: string;
  image?: string;
  _id: number;
  roomId?: number;
  date: string;
  indiv?: boolean;
  avatar?: string;
}

// Component for a post.
const Post = ({
  title,
  body,
  author,
  image,
  _id,
  date,
  indiv,
  avatar,
  roomId,
}: Props) => {
  const { token } = useContext(TokenContext); // Get the token from Auth0
  const { user } = useAuth0();
  const navigate = useNavigate();

  //const parseLines = (value: string) => value.replace(/\n/g, "{/n}");

  //const nBody = parseLines(body);
  // Delete a post.
  const deletePostMutation = useDeletePostMutation(Number(roomId), indiv);

  // Calls delete mutation
  const handleDelete = async () => {
    await deletePostMutation.mutateAsync({ postId: _id, token: token });
  };

  // Go to post page if the post is clicked.
  const toPost = () => {
    const room = roomId ? Number(roomId) : -1;
    !indiv && navigate(`/post/${room}/${_id}`);
  };

  // Style chnages depending if we have a single post or a list of posts - Home/Room routes
  const imgContStyle = indiv
    ? "post--image--container max-h-[80vh]"
    : "post--image--container max-h-[400px]";
  const imgStyle = indiv
    ? "max-w-full object-contain"
    : "post--image object-cover";

  return (
    <div className="post--container border">
      <div className="post--created">
        <UserAvatar selfUser={false} propsImageUri={avatar} />
        <p>{author}</p>
        <li>
          <span className="date">{date}</span>
        </li>
        {user && user["https://myapp.example.com/username"] == author && (
          <div className="ml-auto clickable">
            <DropDownMenu
              deleteFunction={() => {
                handleDelete();
              }}
              id={_id}
              title={title}
              description={body}
              type="Post"
              roomId={roomId}
            />
          </div>
        )}
      </div>
      <div className={indiv ? "" : "clickable"} onClick={toPost}>
        <h1 className="post--title border-b">{title}</h1>
        {image && (
          <div className={imgContStyle}>
            <img className={imgStyle} src={image} />
          </div>
        )}
        <p className="my-[20px] post--body">{body}</p>
      </div>
      {!indiv && (
        <div className="post--icons">
          <img className="w-[17px] clickable" src={comment} onClick={toPost} />
        </div>
      )}
    </div>
  );
};

export default Post;
