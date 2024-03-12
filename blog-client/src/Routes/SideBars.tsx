import { Outlet } from "react-router-dom";
import LeftSideBar from "../Components/LeftSideBar";
import useGetWindow from "../utils/hooks/useGetWindow";
import "../css/Home.css";
import AnimatedLayout from "@/AnimatedLayout";

// Add a left sidebar - used for both the Home and Room routes - pages.
const SideBars = () => {
  const windowDimensions = useGetWindow();
  return (
    <AnimatedLayout>
      <div className="home--container">
        {windowDimensions.windowWidth >= 650 && <LeftSideBar />}
        <Outlet />
      </div>
    </AnimatedLayout>
  );
};

export default SideBars;
