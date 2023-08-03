import React from "react";

//firebase
import { auth } from "../config/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//react-router
import { useNavigate } from "react-router-dom";

export default function protectedRoute({ children }) {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  if (!user) {
    return navigate("/");
  } else {
    return children;
  }
}
