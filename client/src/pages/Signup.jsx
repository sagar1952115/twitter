import React, { useState } from "react";
import SignupForm from "../component/SignupForm";
import login from "../asset/login.jpeg";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-[40%] ">
          <div className="pt-12 pl-16">
            <div className="mb-8 text-4xl font-bold text-red-400 ">TweetX</div>
            <Link
              to="/login"
              className="p-3 px-20 text-lg border border-black rounded-xl "
            >
              Login
            </Link>
          </div>
          <SignupForm />
        </div>
        <div className=" w-[60%] h-screen">
          <img className="object-cover w-full h-full" src={login} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
