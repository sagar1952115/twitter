import React from "react";
import login from "../asset/login.jpeg";
import LoginForm from "../component/LoginForm";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-[40%] ">
          <div className="pt-12 pl-16">
            <div className="mb-8 text-4xl font-bold text-red-400 ">TweetX</div>
            <Link
              to="/signup"
              className="p-3 px-10 mt-4 text-lg border border-black w-60 rounded-xl "
            >
              Create Account
            </Link>
          </div>
          <LoginForm />
        </div>
        <div className=" w-[60%] h-screen">
          <img className="object-cover w-full h-full" src={login} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
