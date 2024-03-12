import { useState, useEffect } from "react";

// Function to get the current size of the browser window.
const useGetWindow = () => {
  const [windowDimension, setWindowDimension] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });
  useEffect(() => {
    let timeout: any;
    const changeDimensions = () => {
      setWindowDimension({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    };
    const handleSize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        changeDimensions();
      }, 100);
    };
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);
  return windowDimension;
};

export default useGetWindow;
