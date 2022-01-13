import React, { useContext, useState } from "react";
import { Add } from "@mui/icons-material";
// import post2 from "../../img/post2.jpg";
import { Context } from "../../context/Context";
import axios from "axios";
import "./Write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.post("/posts", newPost);

      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} alt="" className="write-img" />
      )}
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-form-group">
          <label htmlFor="file-input">
            <Add
              fontSize="large"
              style={{
                border: "1px solid var(--primary-color)",
                borderRadius: "50%",
                cursor: "pointer",
                color: "#555",
              }}
            />
          </label>
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            className="write-input"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="write-form-group">
          <textarea
            className="write-input write-text"
            type="text"
            placeholder="What's on your mind?"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <button className="write-submit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
