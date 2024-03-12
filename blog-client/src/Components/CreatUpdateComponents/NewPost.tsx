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
import { DropdownMenuItem } from "@/Components/ui/dropdown-menu";
import { buttonVariants } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetAvatar } from "@/utils/reactquery/Queries";
import TokenContext from "@/TokenContext";
import {
  useCreatePostMutation,
  useEditPostMutation,
} from "@/utils/reactquery/Mutations";

interface Props {
  update?: boolean;
  title?: string;
  description?: string;
  _id?: number;
  roomId?: number;
  image?: string;
  state: any;
  setState: any;
}

// New Post Component Card - popup.
const NewPost = ({
  update,
  title,
  description,
  _id,
  roomId,
  image,
  setState,
}: Props) => {
  // State used to hold user input to create a post in the database.
  const [input, setInput] = useState<{
    userName?: string;
    title?: string;
    content?: string;
    image?: string;
  }>(
    update
      ? {
          title: title,
          content: description,
          image: image,
        }
      : {
          title: "",
          content: "",
          image: "",
        }
  );

  // Handles any input change the user makes.
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setInput((oldInput) => {
      return { ...oldInput, [name]: value };
    });
  };

  // Set up to get ready to make a POST.
  const { user } = useAuth0();
  let userName = "";
  if (user) userName = user["https://myapp.example.com/username"];
  const { token } = useContext(TokenContext);

  // Get the user.
  const getAvatarQuery = useGetAvatar(userName);
  const avatar = getAvatarQuery.data ? getAvatarQuery.data.data.imageUrl : "";

  // Mutation to edit posts.
  const editPostMutation = useEditPostMutation(
    Number(_id),
    Number(roomId),
    setState
  );

  // Mutation to create Posts.
  const createPostMutation = useCreatePostMutation(
    userName,
    avatar,
    Number(roomId)
  );

  // Call CreatePost which sends a POST request to the backend.
  const makePost = () => {
    if (user) {
      const username = user["https://myapp.example.com/username"];
      createPostMutation.mutate({
        input: {
          title: input.title,
          author: username,
          description: input.content,
          roomId: Number(roomId),
          image: input.image,
        },
        token: token,
      });
    }
  };

  if (editPostMutation.isError) {
    console.log("Error: " + editPostMutation.error);
  }
  // Call UpdatePost which sends a PUT request to the backend - update a post.
  const editPost = () => {
    if (_id == null) {
      console.log("Error Editing the Post");
      return;
    }

    editPostMutation.mutate({
      input: {
        title: input.title,
        description: input.content,
        id: _id,
      },
      token: token,
    });
    if (editPostMutation.isError) {
      console.log("Error: " + editPostMutation.error);
    }
  };

  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>{update ? "Update Post" : "Create a Post"}</CardTitle>
        <CardDescription>
          {update ? "Update an existing post." : "Make a new post."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Title</Label>
              <Input
                name="title"
                id="name"
                placeholder="Title of your post"
                value={input.title}
                onChange={handleChange}
              />
            </div>
            {!update && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  name="image"
                  id="image"
                  placeholder="URL for post image ..."
                  value={input.image}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Type your post content here."
                value={input.content}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        {update ? (
          <>
            <AlertDialogCancel className="hover:bg-black hover:text-white white bg-black">
              <DropdownMenuItem className="focus:bg-black focus:text-white white hover:cursor-pointer">
                Cancel
              </DropdownMenuItem>
            </AlertDialogCancel>
            <DropdownMenuItem
              onClick={editPost}
              className="hover:cursor-pointer"
            >
              Update
            </DropdownMenuItem>{" "}
          </>
        ) : (
          <>
            <AlertDialogCancel className={buttonVariants()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={makePost}
              className={buttonVariants({ variant: "secondary" })}
            >
              Post
            </AlertDialogAction>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default NewPost;
