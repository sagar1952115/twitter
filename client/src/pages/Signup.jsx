import React from "react";
import SignupForm from "../component/SignupForm";
import login from "../asset/login.jpeg";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-[40%] ">
          <div className="pl-16 pt-12">
            <div className="text-red-400 mb-8 font-bold text-4xl ">TweetX</div>
            <Link
              to="/login"
              className="border border-black text-lg px-20  p-3 rounded-xl "
            >
              Login
            </Link>
          </div>
          <SignupForm />
        </div>
        <div className=" w-[60%] h-screen">
          <img className="w-full h-full object-cover" src={login} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
