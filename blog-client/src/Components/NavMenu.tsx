import {
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/Components/ui/sheet";
import { Link } from "react-router-dom";

import "../css/SharedStyles.css";
import LoginButton from "./authButtons/LoginButton";
import LogoutButton from "./authButtons/LogoutButton";
import { motion } from "framer-motion";

import { v4 as uuid } from "uuid";

const menuItems = [
  {
    title: "Home",
    dest: "/",
  },
  {
    title: "Profile",
    dest: "/profile",
  },
];

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

// Component of navigation menu. Replaces a static menu on the header if screen size is less than 800px. Triggers when menu icon is clicked.
export function NavMenu() {
  const styleClass = "my-[5px] blue left--sidebar--list--link";
  // Sheet items - map through array to create menu items.
  const MenuComponent = menuItems.map((item) => {
    return (
      <motion.li
        key={uuid()}
        variants={liVariants}
        initial={{ y: "100vh" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={styleClass}
      >
        <SheetClose key={uuid()} asChild>
          <Link className="w-full h-full side--link" to={item.dest}>
            <p className="ml-[7px]">{item.title}</p>
          </Link>
        </SheetClose>
      </motion.li>
    );
  });

  return (
    <SheetContent className="w-4/5 max-w-[300px]">
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <motion.ul initial={true} animate={"open"} variants={ulVariants}>
        <motion.li
          key={uuid()}
          variants={liVariants}
          initial={{ y: "100vh" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={styleClass}
        >
          <SheetClose key={uuid()} asChild>
            <div className="side--link h-full ml-[7px]">
              <LoginButton />
              <LogoutButton />
            </div>
          </SheetClose>
        </motion.li>
        {MenuComponent}
      </motion.ul>
    </SheetContent>
  );
}
