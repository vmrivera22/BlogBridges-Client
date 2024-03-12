import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import userDefault from "../assets/defaultUser.png";
import { useAuth0 } from "@auth0/auth0-react";
import { forwardRef } from "react";
import { useGetAvatar } from "@/utils/reactquery/Queries";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  selfUser: boolean;
  propsImageUri?: string;
}

// Function to be used to display a user avatar - with fowardRef - needed for header avatar.
const UserAvatarWithRef = forwardRef<HTMLDivElement, Props>((props, ref) => (
  <UserAvatar {...props} ref={ref} />
));

// Component to display an avatar.
const UserAvatar = forwardRef<HTMLDivElement, Props>(
  ({ selfUser, propsImageUri }, ref) => {
    const { user } = useAuth0();
    const userName = user ? user["https://myapp.example.com/username"] : ""; // Get the user avatar - if no avatar set it to empty string.

    const getAvatarQuery = useGetAvatar(userName); // Fetch the avatar from the database. If an empty string is input then it will not fetch - disabled

    // Wait for the avatar to be fetched.
    const imageUri = getAvatarQuery.data
      ? getAvatarQuery.data.data.imageUrl
      : "";
    let dbUri = selfUser ? imageUri : propsImageUri;

    // Style depending if a users own avatar is being displayed - make it bigger.
    const avatarStyle = selfUser ? "" : "w-[25px] h-[25px] overflow-hidden";
    return (
      <Avatar className={avatarStyle} ref={ref}>
        <AnimatePresence mode="wait">
          <>
            <motion.div
              key="avatar"
              initial={{ y: 0, scale: 0.01 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <AvatarImage src={dbUri} />
            </motion.div>
            <motion.div
              key="fallback"
              initial={{ y: 0, scale: 0.01 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              exit={{ y: 0, opacity: 0, scale: 0.01 }}
            >
              <AvatarFallback>
                {dbUri ? <img src={userDefault} /> : <img src={userDefault} />}
              </AvatarFallback>
            </motion.div>
          </>
        </AnimatePresence>
      </Avatar>
    );
  }
);

export default UserAvatarWithRef;
