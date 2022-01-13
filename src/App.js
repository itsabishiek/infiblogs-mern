import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Context } from "./context/Context";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#ff4627",
    },
  },
});

const App = () => {
  const { user } = useContext(Context);

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Header />

        <div className="app">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/post/:id" element={<Single />} />
            <Route
              exact
              path="/write"
              element={user ? <Write /> : <Register />}
            />
            <Route
              exact
              path="/settings"
              element={user ? <Settings /> : <Register />}
            />
            <Route exact path="/login" element={user ? <Home /> : <Login />} />
            <Route
              exact
              path="/register"
              element={user ? <Home /> : <Register />}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
