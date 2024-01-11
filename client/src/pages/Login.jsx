import React from "react";
import login from "../asset/login.jpeg";
import LoginForm from "../component/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-[40%] ">
          <div className="pl-16 pt-12">
            <div className="text-red-400 mb-8 font-bold text-4xl ">TweetX</div>
            <Link
              to="/signup"
              className="border border-black w-60 text-lg px-10 mt-4 p-3 rounded-xl "
            >
              Create Account
            </Link>
          </div>
          <LoginForm />
        </div>
        <div className=" w-[60%] h-screen">
          <img className="w-full h-full object-cover" src={login} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
