import "../css/Home.css";
import "../css/Room.css";
import "../css/RightRoomSideBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { DropDownMenu } from "./DropDownMenu";
import { v4 as uuid } from "uuid";
import { useGetRules } from "@/utils/reactquery/Queries";
import TokenContext from "@/TokenContext";
import { useContext } from "react";
import { useDeleteRoomMutation } from "@/utils/reactquery/Mutations";

interface Props {
  room?: Room;
}

// Component for the right sidebar in Room.
const RightRoomSideBar = ({ room }: Props) => {
  const { user } = useAuth0();
  const { token } = useContext(TokenContext);
  //const token = useAppSelector((state) => state.user.token);

  // Delete a room
  const deleteRoomMutation = useDeleteRoomMutation();

  // Call delete a room mutation.
  const handleDelete = async () => {
    if (room) {
      deleteRoomMutation.mutate({ roomId: room.id, token: token });
    }
  };

  const roomId = room ? room.id : 0;
  const getRulesQuery = useGetRules(roomId);

  // Make sure the rooms were fetched successfully
  if (String(getRulesQuery.status) === "loading") return <h1>Loading...</h1>;
  if (String(getRulesQuery.status) === "error")
    return <h1>{JSON.stringify(getRulesQuery.error)}</h1>;

  // Map the rules for the room.
  const componentRules = getRulesQuery.data?.map((rule) => {
    return (
      <li key={uuid()} className="list-decimal">
        {rule.ruleText}
      </li>
    );
  });
  return (
    <>
      <div>
        <div className="description--title">
          <h3 className="description--header z1">
            {room?.name} - {room?.user?.userName}:
          </h3>
          {user &&
            user["https://myapp.example.com/username"] ==
              room?.user?.userName && (
              <div className="ml-auto clickable">
                <DropDownMenu
                  deleteFunction={() => {
                    handleDelete();
                  }}
                  id={room?.id}
                  title={room?.name}
                  description={room?.description}
                  type="Room"
                />
              </div>
            )}
        </div>
        <p className="description--text z1">{room?.description}</p>
      </div>
      <div className="border-t my-[10px]" />
      <div className="rules">
        <div className="description--title">
          <h3>RULES</h3>
          {user &&
            user["https://myapp.example.com/username"] ==
              room?.user?.userName && (
              <div className="ml-auto clickable">
                <DropDownMenu id={room?.id} type="Rules" />
              </div>
            )}
        </div>
        <ol className="ol">{componentRules}</ol>
      </div>
    </>
  );
};

export default RightRoomSideBar;
