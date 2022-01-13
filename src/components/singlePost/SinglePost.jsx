import React, { useEffect, useState, useContext } from "react";
import { DeleteForever, Edit } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../../context/Context";
// import post1 from "../../img/post1.jpg";
import axios from "axios";

import "./SinglePost.css";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [post, setPost] = useState([]);

  const publicFolder = "https://infiblogs-api.herokuapp.com/images/";

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };

    fetchPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put("/posts/" + path, {
        username: user.username,
        title,
        desc,
      });

      // window.location.reload();
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="single-post">
      <div className="single-post-wrapper">
        {post.photo && (
          <img
            src={publicFolder + post.photo}
            alt=""
            className="single-post-img"
          />
        )}

        {updateMode ? (
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <input
              className="single-post-title-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <button className="single-post-btn" onClick={handleUpdate}>
              Update
            </button>
          </div>
        ) : (
          <h1 className="single-post-title">
            {title}

            {post.username === user?.username && (
              <div className="single-post-edit">
                <Edit
                  style={{
                    marginRight: 15,
                    padding: 4,
                    fontSize: 30,
                  }}
                  className="single-post-icon"
                  onClick={() => setUpdateMode(true)}
                />
                <DeleteForever
                  style={{
                    color: "red",
                    padding: 4,
                    fontSize: 30,
                  }}
                  className="single-post-icon"
                  onClick={handleDelete}
                />
              </div>
            )}
          </h1>
        )}

        <div className="single-post-info">
          <span className="single-post-author">
            Author:{" "}
            <Link to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="single-post-date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        {updateMode ? (
          <textarea
            className="single-post-desc-input"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className="single-post-contents">{desc}</p>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
