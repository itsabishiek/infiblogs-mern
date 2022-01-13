import React, { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { ArrowBackIos, PersonAddAltOutlined } from "@mui/icons-material";
import { Context } from "../../context/Context";
import "./Settings.css";
import axios from "axios";

// userId;

const Settings = () => {
  const { user, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const publicFolder = "https://infiblogs-api.herokuapp.com/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const updateUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updateUser.profilePicture = filename;

      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.put("/users/" + user._id, updateUser);
      setSuccess(true);

      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      window.location.reload();
    } catch (error) {
      dispatch({ type: "UPDATE_FAIL" });

      console.log(error);
    }
  };

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">
          <span className="settings-update-title">Update your Account</span>
          <span className="settings-delete-title">Delete Account</span>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settings-profilepic">
            {file && <img src={URL.createObjectURL(file)} alt="" />}

            {file && <ArrowBackIos />}

            {user.profilePicture ? (
              <img src={publicFolder + user.profilePicture} alt="" />
            ) : (
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
              />
            )}

            <label htmlFor="file-input">
              <PersonAddAltOutlined
                style={{
                  cursor: "pointer",
                  color: "#fff",
                  backgroundColor: "var(--primary-color)",
                  borderRadius: "50%",
                  fontSize: 30,
                  padding: 5,
                }}
              />
            </label>
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="******"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ display: "flex", alignItems: "baseline" }}>
            <button className="settings-submit" type="submit">
              Update
            </button>

            {success && (
              <span style={{ color: "green", marginLeft: 20 }}>
                Profile has been updated!
              </span>
            )}
          </div>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
