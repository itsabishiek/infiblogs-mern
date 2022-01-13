import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import logo from "../../img/logo.png";
import "./Sidebar.css";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(Context);

  const publicFolder = "https://infiblogs-api.herokuapp.com/images/";

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };

    getCategories();
  }, []);

  // console.log(categories);

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        {user ? (
          <span className="sidebar-title">ABOUT ME</span>
        ) : (
          <span className="sidebar-title">ABOUT US</span>
        )}
        {user ? (
          <>
            {user.profilePicture ? (
              <img
                className="profile-img"
                src={publicFolder + user.profilePicture}
                alt=""
              />
            ) : (
              <img
                className="profile-img"
                src={
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt=""
              />
            )}
          </>
        ) : (
          <div style={{ margin: "20px 0" }}>
            <img style={{ height: 50 }} src={logo} alt="" />
            <h1 style={{ color: "var(--primary-color)" }}>InfiBlogs</h1>
          </div>
        )}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          pariatur quisquam repudiandae neque.
        </p>
      </div>

      <div className="sidebar-item">
        <span className="sidebar-title">CATEGORIES</span>
        <ul className="sidebar-list">
          {categories.map((category) => (
            <Link to={`/?category=${category.name}`}>
              <li className="sidebar-list-item" key={category._id}>
                {category.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
