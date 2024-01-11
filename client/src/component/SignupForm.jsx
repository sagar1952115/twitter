import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = () => {
    if (password !== cpassword) {
      alert("password and confirm password should be same");
    }

    axios
      .post("https://omnipractice-server1.onrender.com/signup", {
        name,
        username: email,
        password,
      })
      .then(({ data: { data } }) => {
        localStorage.setItem("users", JSON.stringify(data));
        navigate("/");
      });
  };
  return (
    <div className="flex flex-col w-full px-16 pt-4 mt-10">
      <div className="mb-8 text-[48px] font-bold text-slate-700">
        Create Account
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full p-4 px-4 rounded outline-none bg-slate-50"
          placeholder="Name"
        />
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
        <input
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
          type="text"
          className="w-full p-4 px-4 rounded outline-none bg-slate-50"
          placeholder="Confirm Password"
        />
        <div className="flex items-center justify-between w-full btn">
          <div className="text-slate-700"></div>
          <button
            onClick={handleSignup}
            className="p-3 px-10 font-bold text-white bg-red-400 border rounded-md text-md"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
