import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import { Navigate, Route, Routes } from "react-router";
import Navbar from "./component/Navbar";
import { useState } from "react";

function App() {
  const [active, setActive] = useState("feed");

  let user = localStorage.getItem("users");

  return (
    <div>
      <Routes>
        <Route
          path="/home"
          element={<Navbar active={active} setActive={setActive} />}
        >
          <Route
            index
            element={!user ? <Navigate to="/login" replace /> : <Feed />}
          />
          <Route
            path="users"
            element={!user ? <Navigate to="/login" replace /> : <Users />}
          />
          <Route
            path="profile/:id"
            element={!user ? <Navigate to="/login" replace /> : <Profile />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
