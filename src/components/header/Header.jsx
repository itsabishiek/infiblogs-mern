import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../img/logo.png";
// import profile from "../../img/profile.jpg";
import {
  ContactPageOutlined,
  HomeOutlined,
  Logout,
  PersonOutlined,
  Search,
  WrapText,
} from "@mui/icons-material";

import "./Header.css";
import { Button } from "@mui/material";
import { Context } from "../../context/Context";

const Header = () => {
  const [transNav, setTransNav] = useState(false);
  const { user, dispatch } = useContext(Context);

  const publicFolder = "https://infiblogs-api.herokuapp.com/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const transitionNavbar = () => {
    if (window.scrollY > 100) {
      setTransNav(true);
    } else {
      setTransNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);

    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  return (
    <div className={`header ${transNav && "header-show"}`}>
      <Link to="/" className="header-left">
        <img src={logo} alt="" />
        <span>InfiBlogs</span>
      </Link>
      <div className="header-center">
        <ul className="header-items">
          <li>
            <NavLink to="/">
              <HomeOutlined color="primary" />
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <PersonOutlined color="primary" />
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <ContactPageOutlined color="primary" />
              CONTACT
            </NavLink>
          </li>
          <li>
            <NavLink to="/write">
              <WrapText color="primary" />
              WRITE
            </NavLink>
          </li>
          {user && (
            <li onClick={handleLogout}>
              <NavLink to="/">
                <Logout color="primary" />
                LOGOUT
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="header-right">
        <Search color="primary" style={{ cursor: "pointer" }} />
        {user ? (
          <Link to="/settings">
            {user.profilePicture ? (
              <img src={publicFolder + user.profilePicture} alt="" />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
              />
            )}
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button variant="contained">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outlined">Register</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
