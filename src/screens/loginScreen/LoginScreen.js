import React, { useEffect } from "react";
import "./_loginScreen.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/auth.action";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <div className="login">
      <div className="login__container">
        <img src="/images/yt-logo.png" alt="yt-logo" />
        <button onClick={handleLogin}>Login With Google</button>
        <p>This Project is made using YOUTUBE API.</p>
      </div>
    </div>
  );
};

export default LoginScreen;
