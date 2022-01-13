import React, { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import ParticlesBg from "particles-bg";
import axios from "axios";
import "./Home.css";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  // console.log(search);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
    };

    fetchPosts();
  }, [search]);

  // console.log(posts);

  return (
    <div className="home">
      <div style={{ height: "90vh" }}>
        <ParticlesBg bg={true} />

        <div className="home-contents">
          <h5>Blogs means Everything!</h5>
          <h1>Welcome to InfiBlogs</h1>
          <h3>The Place for Amazing Blogs in the World.</h3>
          <button>Explore</button>
        </div>
      </div>

      <div className="home-items">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
