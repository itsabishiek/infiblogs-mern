import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAIL" });
    }
  };

  console.log(user);

  return (
    <div className="login">
      <span className="login-title">Login</span>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Username or Email</label>
        <input
          type="text"
          placeholder="Enter your Username or Email..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your Password..."
          ref={passwordRef}
        />
        <button className="login-button" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <Link to="/register">
        <button className="login-register-btn">Register</button>
      </Link>
    </div>
  );
};

export default Login;
