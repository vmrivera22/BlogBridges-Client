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
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Textarea } from "../ui/textarea";
import TokenContext from "@/TokenContext";
import {
  useCreateRoomMutation,
  useEditRoomMutation,
} from "@/utils/reactquery/Mutations";

interface Props {
  update?: boolean;
  title?: string;
  description?: string;
  _id?: number;
}

// New Room Component Card - popup.
const NewRoom = ({ update, title, description, _id }: Props) => {
  // State used to hold user input to create a room in the database.
  const [input, setInput] = useState<{
    title?: string;
    description?: string;
  }>(
    update
      ? {
          title: title,
          description: description,
        }
      : {
          title: "",
          description: "",
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
  const { token } = useContext(TokenContext);
  const { user } = useAuth0();

  // Mutation to create and edit a room.
  const createRoomMutation = useCreateRoomMutation();
  const editRoomMutation = useEditRoomMutation();

  // Call CreateRoom which sends a POST requst to the backend.
  const makeRoom = () => {
    if (user) {
      const username = user["https://myapp.example.com/username"];
      createRoomMutation.mutate({
        input: {
          name: input.title,
          creator: username,
          description: input.description,
        },
        token: token,
      });
    }
  };

  // Call to edit a room.
  const editRoom = () => {
    if (user) {
      editRoomMutation.mutate({
        input: {
          name: input.title,
          description: input.description,
          _id: _id,
        },
        token: token,
      });
    }
  };

  return (
    <Card className="w-[100%]">
      <CardHeader>
        <CardTitle>{update ? "Update a Room" : "Create a Room"}</CardTitle>
        <CardDescription>
          {update ? "Update an existing room." : "Make a new room."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Room Name</Label>
              <Input
                name="title"
                id="name"
                placeholder="Name of your room ..."
                value={input.title}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Room Description</Label>
              <Textarea
                name="description"
                id="name"
                placeholder="Room's description ..."
                value={input.description}
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
        {update ? (
          <AlertDialogAction
            onClick={editRoom}
            className={buttonVariants({ variant: "secondary" })}
          >
            Update
          </AlertDialogAction>
        ) : (
          <AlertDialogAction
            onClick={makeRoom}
            className={buttonVariants({ variant: "secondary" })}
          >
            Create
          </AlertDialogAction>
        )}
      </CardFooter>
    </Card>
  );
};

export default NewRoom;
