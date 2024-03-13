import Post from "@/Components/Post";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import NewPost from "../Components/CreatUpdateComponents/NewPost";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/Room.css";
import useGetWindow from "@/utils/hooks/useGetWindow";
import RightRoomSideBar from "@/Components/RoomAbout";
import "../lib/Structures";
import AlertTrigger from "@/Components/AlertTrigger";
import usePageBottom from "@/utils/hooks/usePageBottom";
import { useGetRoom } from "@/utils/reactquery/Queries";
import AnimatedLayout from "@/AnimatedLayout";
import { AnimatePresence, motion } from "framer-motion";

// Component for a room page - route.
const Room = () => {
  const windowDimensions = useGetWindow();
  const { isAuthenticated } = useAuth0();
  const { roomId } = useParams();
  const bottom = usePageBottom(); // Hook to know when the bottom of the page has been scrolled to.

  const room = useGetRoom(Number(roomId));
  if (String(room.status) === "loading") return <h1>Loading...</h1>;
  if (String(room.status) === "error")
    return <h1>{JSON.stringify(room.error)}</h1>;

  // Any time the bottom of the page has been reached fetch a new page.
  useEffect(() => {
    bottom && room.fetchNextPage();
  }, [bottom]);

  // Create Post comonents from the fetched post data.
  const postData = room.data?.pages.flatMap((data) =>
    data?.data.posts?.map((post) => {
      let formatDate = "";
      if (post) {
        let arrDate = post.datePosted.split("-");
        let day = arrDate[2].split("T");
        formatDate = `${arrDate[1]}/${day[0]}/${arrDate[0]}`;
        const userName = post.user?.userName as string;
        return (
          <Post
            key={post.id}
            _id={post.id}
            roomId={Number(roomId)}
            title={post.title}
            body={post.body}
            author={userName}
            image={post.image}
            date={formatDate}
            avatar={post.user?.imageUrl}
          />
        );
      }
    })
  );

  const windowLarge = windowDimensions.windowWidth >= 1000 ? true : false;

  let currRoom;
  if (room.data && room.data.pages.length > 0) {
    currRoom = room.data.pages[0] && room.data.pages[0].data;
  }

  // State to keep track of what tab the user is on.
  const [tab, setTab] = useState("feed");
  const onTabChange = (value: any) => {
    setTab(value);
  };

  // Set the tab to "feed" if the window grows in size - tabs no logner visable.
  useEffect(() => {
    if (windowLarge) {
      setTab("feed");
    }
  }, [windowLarge]);

  const [open, setOpen] = useState(false);

  // Style to make the right sidebar sticky - if the window is large.
  const mainDivStyle = windowLarge
    ? "room--container main--container"
    : "room--container overflow-hidden main--container";
  return (
    <>
      <AnimatedLayout>
        <Tabs
          value={tab}
          onValueChange={onTabChange}
          defaultValue="feed"
          className="w-full"
        >
          <div className={mainDivStyle}>
            <div className="room--header">
              <h1 className="room--title">{currRoom?.name}</h1>
              {isAuthenticated && (
                <div className="create--container">
                  <AlertTrigger
                    trigger={<button>Create a post</button>}
                    content={
                      <NewPost
                        roomId={Number(roomId)}
                        state={open}
                        setState={setOpen}
                      />
                    }
                    type="button"
                    state={open}
                    stateFunc={setOpen}
                  />
                </div>
              )}
              {!windowLarge && (
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                </TabsList>
              )}
            </div>
            <AnimatePresence mode="wait">
              {tab == "feed" && (
                <>
                  <motion.div
                    key={"feed"}
                    initial={{ x: 300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                  >
                    <div className="room--content">{postData}</div>
                  </motion.div>
                  {windowLarge && (
                    <div className="right--room--sidebar--container left--border">
                      <RightRoomSideBar room={currRoom} />
                    </div>
                  )}
                </>
              )}

              {tab == "about" && (
                <motion.div
                  key={"about"}
                  className="mt-[50px]"
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  exit={{ x: -300, opacity: 0 }}
                >
                  <RightRoomSideBar room={currRoom} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Tabs>
      </AnimatedLayout>
    </>
  );
};

export default Room;
