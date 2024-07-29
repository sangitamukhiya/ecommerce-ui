import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = (props) => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isLoggedIn, navigate]);
  return <>{isLoggedIn && props.children}</>;
};

export default AuthGuard;
