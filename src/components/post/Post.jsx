import React from "react";
// import postImg from "../../img/post1.jpg";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
  const publicFolder = "https://infiblogs-api.herokuapp.com/images/";

  return (
    <div className="post">
      <Link to={`/post/${post._id}`}>
        {post.photo && (
          <img className="post-img" src={publicFolder + post.photo} alt="" />
        )}
      </Link>
      <div className="post-info">
        <div className="post-categories">
          {post.categories.map((category) => (
            <span className="post-category" key={category._id}>
              {category.name}
            </span>
          ))}
        </div>

        <Link to={`/post/${post._id}`}>
          <span className="post-title">{post.title}</span>
        </Link>

        <hr />

        <span className="post-date">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>

      <p className="post-desc">{post.desc}</p>
    </div>
  );
};

export default Post;
