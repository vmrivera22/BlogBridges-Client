import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  AlertDialogCancel,
  AlertDialogAction,
} from "@/Components/ui/alert-dialog";
import { buttonVariants } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TokenContext from "@/TokenContext";
import "../../css/Comments.css";
import { Textarea } from "../ui/textarea";
import { useCreateCommentMutation } from "@/utils/reactquery/Mutations";

interface Props {
  postId: number;
  reply?: boolean;
  parentAuthor?: string;
  parentContent?: string;
  parentId?: number;
}

// New Comment Component Card - popup.
const NewComment = ({
  postId,
  reply,
  parentAuthor,
  parentContent,
  parentId,
}: Props) => {
  // State used to hold user input to create a comment in the database.
  const [input, setInput] = useState<{ content: string }>({ content: "" });

  // Handles any input change the user makes.
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setInput((oldInput) => {
      return { ...oldInput, [name]: value };
    });
  };

  // Set up to get ready to make a POST.
  const { token } = useContext(TokenContext);
  const { user } = useAuth0();

  // Mutation to make a comment.
  const createCommentMutation = useCreateCommentMutation(Number(postId));
  const makeComment = () => {
    if (user) {
      const username = user["https://myapp.example.com/username"];
      createCommentMutation.mutate({
        input: {
          content: input.content,
          author: username,
          postId: postId,
          parentId: parentId,
        },
        token: token,
      });
    }
  };

  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>{"Create a Comment"}</CardTitle>
        <CardDescription>
          {reply ? "Replying to:" : "Make a new Comment"}
        </CardDescription>
        {reply && (
          <>
            <div className="replying--to">
              <h4>{parentAuthor}</h4>
              <p className="replying--to--content">{parentContent}</p>
            </div>
          </>
        )}
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Comment</Label>
              <Textarea
                name="content"
                id="name"
                placeholder="comment ..."
                value={input.content}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AlertDialogCancel className={buttonVariants()}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={makeComment}
          className={buttonVariants({ variant: "secondary" })}
        >
          Create
        </AlertDialogAction>
      </CardFooter>
    </Card>
  );
};

export default NewComment;
