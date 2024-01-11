import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router";
import Navbar from "./component/Navbar";
import { useState } from "react";

function App() {
  const [active, setActive] = useState("feed");

  let user = localStorage.getItem("users");

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navbar active={active} setActive={setActive} />}
        >
          <Route index element={!user ? <Login /> : <Feed />} />
          <Route path="users" element={!user ? <Login /> : <Users />} />
          <Route path="profile/:id" element={!user ? <Login /> : <Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
