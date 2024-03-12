import "../css/Home.css";
import "../css/LeftSideBar.css";
import { Link, useParams } from "react-router-dom";
import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/Components/ui/sheet";
import NewRoom from "./CreatUpdateComponents/NewRoom";
import { useAuth0 } from "@auth0/auth0-react";
import { v4 as uuid } from "uuid";
import "../lib/Structures";
import useGetWindow from "../utils/hooks/useGetWindow";
import AlertTrigger from "./AlertTrigger";
import { useGetRooms } from "@/utils/reactquery/Queries";
import { motion } from "framer-motion";

// Transition variants for the left sidebar rooms.
const liVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        stiffness: 50,
        velocity: -500,
        duration: 0.6,
      },
    },
  },
};

const ulVariants = {
  open: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

// Component for the left sidebar.
const LeftSideBar = () => {
  const { roomId } = useParams();
  const windowDimension = useGetWindow();
  let windowSizeSmall = windowDimension.windowWidth <= 650 ? true : false;

  const getRoomsQuery = useGetRooms(); // Get the list of rooms.

  // Create the room buttons on the sidebar.
  const allRooms = getRoomsQuery.data?.map((r) => {
    let styleClass = "my-[5px] blue left--sidebar--list--link";
    if (roomId != null && Number(roomId) == r.id) {
      // If the room is the room the user is on give it a blue background.
      styleClass = "bg--blue left--sidebar--list--link";
    }
    return (
      <motion.li
        key={uuid()}
        variants={liVariants}
        initial={{ y: "100vh" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={styleClass}
      >
        {!windowSizeSmall ? (
          <Link
            className="w-full h-full side--link px-[5px]"
            to={`/room/${r.id}`}
          >
            {r.name}
          </Link>
        ) : (
          <SheetClose key={r.id} asChild>
            <Link
              className="w-full h-full side--link px-[5px]"
              to={`/room/${r.id}`}
            >
              {r.name}
            </Link>
          </SheetClose>
        )}
      </motion.li>
    );
  });

  // const open to pass in to alert trigger
  const { isAuthenticated } = useAuth0();
  return (
    <>
      {!windowSizeSmall ? (
        <div className="left--sidebar--container top-[70px] border-r">
          <div className="left--sidebar--content">
            {isAuthenticated && (
              <AlertTrigger
                content={<NewRoom />}
                trigger={<button>Create Room</button>}
                type="button"
              />
            )}
            <h2 className="underline mb-[15px]">Rooms: </h2>
            {getRoomsQuery.isSuccess && (
              <motion.ul
                initial={true}
                animate={"open"}
                variants={ulVariants}
                custom={100}
                className="left--sidebar--list"
              >
                {allRooms}
              </motion.ul>
            )}
            <div className="mb-[40px]" />
          </div>
        </div>
      ) : (
        <SheetContent side="left" className="w-4/5 max-w-[300px]">
          <SheetHeader>
            <SheetTitle>Rooms</SheetTitle>
          </SheetHeader>
          <motion.ul
            initial={false}
            animate={"open"}
            variants={ulVariants}
            custom={100}
          >
            {allRooms}
          </motion.ul>
        </SheetContent>
      )}
    </>
  );
};

export default LeftSideBar;
