import verticalMenu from "../assets/vertical-menu.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";
import NewPost from "@/Components/CreatUpdateComponents/NewPost";
import "../css/SharedStyles.css";
import NewRoom from "./CreatUpdateComponents/NewRoom";
import NewRules from "./CreatUpdateComponents/NewRules";
import AlertTrigger from "./AlertTrigger";
import { useState } from "react";

interface Props {
  id?: number;
  description?: string;
  title?: string;
  deleteFunction?: () => void;
  type: string;
  roomId?: number;
}

// Component displays drop down menu to edit and delete posts.
export function DropDownMenu({
  id,
  description,
  title,
  deleteFunction,
  type,
  roomId,
}: Props) {
  // Delete a post - passed on from parent component.
  const handleDelete = () => {
    deleteFunction && deleteFunction();
  };

  const [open, setOpen] = useState(false);
  const AlertContent =
    type == "Room" ? (
      <NewRoom update={true} title={title} description={description} _id={id} />
    ) : type == "Post" ? (
      <NewPost
        update={true}
        title={title}
        description={description}
        _id={id}
        state={open}
        setState={setOpen}
        roomId={roomId}
      />
    ) : (
      <NewRules roomId={id} />
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img className="w-[13px]" src={verticalMenu} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50">
        <DropdownMenuLabel>{type}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AlertTrigger
          content={AlertContent}
          trigger={<div className="w-[full]">Edit</div>}
          type="dropDown"
          state={open}
          stateFunc={setOpen}
        />
        {type != "Rules" && (
          <DropdownMenuItem
            className="red focus:text-red focus:cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
