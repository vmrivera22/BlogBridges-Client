import { useState, useEffect } from "react";

// Custom hook used to check if the user has scrolled to the bottom of the page.
const usePageBottom = () => {
  const [bottom, setBottom] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offsetH = document.documentElement.offsetHeight;
      const innerH = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      const reachedBottom = offsetH - (innerH + scrollTop) <= 1;
      setBottom(reachedBottom);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return bottom;
};

export default usePageBottom;
