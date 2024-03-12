import "../css/Profile.css";
import { useAuth0 } from "@auth0/auth0-react";
import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
} from "@/Components/ui/alert-dialog";
import UpdateUserImage from "@/Components/CreatUpdateComponents/UpdateUserImage";
import UserAvatar from "@/Components/UserAvatar";
import AnimatedLayout from "@/AnimatedLayout";
import { useGetUser } from "@/utils/reactquery/Queries";
import Post from "@/Components/Post";
import usePageBottom from "@/utils/hooks/usePageBottom";
import { useEffect } from "react";

// Component for the user profile page - route.
const Profile = () => {
  const { user } = useAuth0();
  const bottom = usePageBottom();
  const email = user?.email;

  let userName: string = "";
  if (user) {
    userName = user["https://myapp.example.com/username"];
  }

  const dbUser = useGetUser(userName); // Get the current user from the database (along with their posts).

  // If the bottom of the page is reached get more user posts.
  useEffect(() => {
    bottom && dbUser.fetchNextPage();
  }, [bottom]);

  // Map the user's posts.
  const userPosts = dbUser.data?.pages
    .flatMap((data) => data?.data)
    .map((user) => {
      return user?.posts?.map((post) => {
        let formatDate = "";
        if (post) {
          let arrDate = post.datePosted.split("-");
          let day = arrDate[2].split("T");
          formatDate = `${arrDate[1]}/${day[0]}/${arrDate[0]}`;

          return (
            <Post
              key={post.id}
              _id={post.id}
              title={post.title}
              body={post.body}
              author={userName}
              image={post.image}
              date={formatDate}
              avatar={post.user?.imageUrl}
            />
          );
        }
      });
    });

  // Changing image not working - has to do with home ref
  return (
    <AnimatedLayout>
      <div className="mx-auto my-[50px] w-[70%]">
        <div className="profile--image--container">
          <UserAvatar selfUser={true} />
          <AlertDialog>
            <div className="button--wrapper profile--img--trigger">
              <AlertDialogTrigger asChild>
                <button className="profile--img--button">
                  Change Profile Image
                </button>
              </AlertDialogTrigger>
            </div>
            <AlertDialogContent>
              <UpdateUserImage />
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <h1>{userName}</h1>
        <p className="mb-[25px]">Email: {email}</p>
        <h1>Your Posts:</h1>
        <div className="profile--posts">{userPosts}</div>
      </div>
    </AnimatedLayout>
  );
};

export default Profile;
