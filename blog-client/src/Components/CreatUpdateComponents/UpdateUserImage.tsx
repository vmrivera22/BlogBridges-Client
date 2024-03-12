import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { buttonVariants } from "@/Components/ui/button";

import {
  AlertDialogCancel,
  AlertDialogAction,
} from "@/Components/ui/alert-dialog";
import { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetAvatar } from "@/utils/reactquery/Queries";
import TokenContext from "@/TokenContext";
import { useEditAvatarMutation } from "@/utils/reactquery/Mutations";

// Component to update User Profile Picture.
const UpdateUserImage = () => {
  const { user } = useAuth0();
  let userName = user && user["https://myapp.example.com/username"];

  // Get the current user.
  const getAvatarQuery = useGetAvatar(userName);

  const imageUri = getAvatarQuery.data ? getAvatarQuery.data.data.imageUrl : "";

  // State to keep track of the user URL input.
  const [input, setInput] = useState<{ uri: string }>({
    uri: imageUri,
  });

  // Function to update user input.
  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setInput((oldInput) => {
      return { ...oldInput, [name]: value };
    });
  };

  // Mutation to change the user Profile image.
  const updateAvatarMutation = useEditAvatarMutation();

  // Call the mutation to change the image in the Database.
  const { token } = useContext(TokenContext);
  const editImage = () => {
    if (user) {
      updateAvatarMutation.mutate({
        token: token,
        input: { userName: userName, imageUrl: input.uri },
      });
    }
  };
  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>Change Profile Image</CardTitle>
        <CardDescription>Update your avatar - profile image</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Image URI</Label>
              <Input
                name="uri"
                id="image"
                placeholder="Image URI ..."
                value={input.uri}
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
          onClick={editImage}
          className={buttonVariants({ variant: "secondary" })}
        >
          Update
        </AlertDialogAction>
      </CardFooter>
    </Card>
  );
};

export default UpdateUserImage;
