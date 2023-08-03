import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export default function ShowNavBar({ children }) {
  const [navBar, setNavBar] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      setNavBar(true);
    } else if (location.pathname === "/result") {
      setNavBar(true);
    } else if (location.pathname === "/genres") {
      setNavBar(true);
    } else if (location.pathname === "/favourite") {
      setNavBar(true);
    } else setNavBar(false);
  }, [location]);

  return <div>{navBar && children}</div>;
}
