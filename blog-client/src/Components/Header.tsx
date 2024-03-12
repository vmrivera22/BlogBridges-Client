import "../css/Header.css";
import "../css/SharedStyles.css";
import { Link, useNavigate } from "react-router-dom";
import useGetWindow from "../utils/hooks/useGetWindow";
import LoginButton from "./authButtons/LoginButton";
import LogoutButton from "./authButtons/LogoutButton";
import { Sheet, SheetTrigger } from "@/Components/ui/sheet";
import { NavMenu } from "./NavMenu";
import menu from "../assets/menu.png";
import { useAuth0 } from "@auth0/auth0-react";
import LeftSideBar from "./LeftSideBar";
import logo from "../assets/logo1.png";
import UserAvatarWithRef from "./UserAvatar";
import { motion } from "framer-motion";

// Component that displays the header of the website.
const Header = () => {
  const windowDimension = useGetWindow(); // Get the current window size.
  let windowSizeSmall = windowDimension.windowWidth <= 650 ? true : false; // Determins if the layout should be adjusted for smaller screens.
  const { isAuthenticated } = useAuth0();

  // Navigate to home if logo is clicked.
  const navigate = useNavigate();
  const clickHome = () => {
    navigate("/");
  };

  return (
    <header className="header--container border-b sticky shared--background">
      {!windowSizeSmall ? (
        <>
          <ul onClick={clickHome} className="left--links header--links">
            <div className="black">
              <img className="w-[150px]" src={logo} />
            </div>
          </ul>

          <ul className="ml-auto header--links header--color header--font">
            {isAuthenticated ? (
              <>
                <Link to={`/profile`}>Profile</Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <LoginButton text="Profile" />
                <LoginButton />
              </>
            )}
          </ul>
        </>
      ) : (
        <>
          <div className="left--links header--links">
            <Sheet>
              <SheetTrigger asChild>
                <img src={menu} className="clickable w-[27px]" />
              </SheetTrigger>
              <motion.nav initial={false}>
                <LeftSideBar />
              </motion.nav>
            </Sheet>
          </div>
          <div className="ml-auto">
            <Link className="black" to={"/"}>
              <img className="w-[150px]" src={logo} />
            </Link>
          </div>
          <div className="ml-auto header--links">
            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <UserAvatarWithRef selfUser={true} />
                </div>
              </SheetTrigger>
              <NavMenu />
            </Sheet>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
