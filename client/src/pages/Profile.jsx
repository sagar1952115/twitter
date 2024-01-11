import React, { useState } from "react";
import TweetCard from "../component/TweetCard";
import UserCard from "../component/UserCard";
import Navbar from "../component/Navbar";

const Profile = () => {
  const [select, setSelected] = useState("posts");

  const user = localStorage.getItem("users");
  const userData = JSON.parse(user);
  return (
    <div>
      <Navbar />
      <div className="w-[50%] p-3 m-auto">
        <div className="flex justify-around p-10 mt-5 border-b">
          <div className="w-32 h-32 border rounded-full border-slate-700"></div>
          <div className="flex flex-col justify-center ">
            <div className="px-2 mb-2 text-2xl font-bold text-slate-700">
              {userData.name}
            </div>
            <div className="flex text-slate-400">
              <div className="px-2">Post : {userData.messages.length}</div>
              <div className="px-2">
                Followers : {userData.followers.length}
              </div>
              <div className="px-2">
                Following : {userData.following.length}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-around mb-10">
            <div
              onClick={() => setSelected("posts")}
              className={`w-32 text-center p-3 ${
                select === "posts" ? "border-t border-black" : ""
              }`}
            >
              Posts
            </div>
            <div
              onClick={() => setSelected("followers")}
              className={`w-32 text-center p-3 ${
                select === "followers" ? "border-t border-black" : ""
              }`}
            >
              Followers
            </div>
            <div
              onClick={() => setSelected("following")}
              className={`w-32 text-center p-3 ${
                select === "following" ? "border-t border-black" : ""
              }`}
            >
              Following
            </div>
          </div>
          <div>
            {select === "posts" && (
              <div>
                {userData.messages.map((curr, i) => {
                  return (
                    <TweetCard
                      key={i}
                      username={curr.username}
                      text={curr.text}
                      timestamp={curr.timestamp}
                    />
                  );
                })}
              </div>
            )}
            {select === "followers" && (
              <div>
                {userData.followers.map((curr, i) => {
                  return (
                    <UserCard
                      key={i}
                      followingList={userData.following}
                      // name={ userData.name}
                      username={curr}
                    />
                  );
                })}
              </div>
            )}
            {select === "following" && (
              <div>
                {userData.following.map((curr, i) => {
                  return (
                    <UserCard
                      key={i}
                      // name={ userData.name}
                      followingList={userData.following}
                      username={curr}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
