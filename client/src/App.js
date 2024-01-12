import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState({});
  let user = localStorage.getItem("users");
  console.log(userAuth);
  useEffect(() => {
    let userInSession = localStorage.getItem("users");
    userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({});
  }, []);

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Feed />} />
        <Route path="/users" element={!user ? <Login /> : <Users />} />
        <Route path="/profile/:id" element={!user ? <Login /> : <Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
