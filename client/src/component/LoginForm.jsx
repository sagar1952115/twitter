import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { UserContext } from "../App";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let { setUserAuth } = useContext(UserContext);

  const navigate = useNavigate();
  const handleLogin = () => {
    axios
      .post("https://omniserver.onrender.com/signin", {
        username: email,
        password,
      })
      .then(({ data: { data } }) => {
        localStorage.setItem("users", JSON.stringify(data));
        setUserAuth(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col w-full px-16 pt-4 mt-10">
      <div className="mb-8 text-[48px] font-bold text-slate-700">Login</div>
      <div className="flex flex-col items-center justify-center w-full gap-6">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          className="w-full p-4 px-4 rounded outline-none bg-slate-50"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          className="w-full p-4 px-4 rounded outline-none bg-slate-50"
          placeholder="Password"
        />
        <div className="flex items-center justify-between w-full btn">
          <div className="text-slate-700">Forgot Password ?</div>
          <button
            onClick={handleLogin}
            className="p-3 px-10 font-bold text-white bg-red-400 border rounded-md text-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
