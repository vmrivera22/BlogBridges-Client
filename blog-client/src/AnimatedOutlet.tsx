import React from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Comonent that is used to wrap around routes to animate.
const AnimatedOutlet = (): React.JSX.Element => {
  const location = useLocation();
  const element = useOutlet();

  return (
    <AnimatePresence mode="wait" initial={true}>
      {element && React.cloneElement(element, { key: location.pathname })}
    </AnimatePresence>
  );
};

export default AnimatedOutlet;
