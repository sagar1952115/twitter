import React, { useEffect, useState } from "react";
import TweetCard from "../component/TweetCard";
import UserCard from "../component/UserCard";
import Navbar from "../component/Navbar";
import axios from "axios";
import { useParams } from "react-router";

export const userStructure = {
  name: "",
  username: "",
  email: "",
  followers: [],
  posts: [],
  following: [],
};

const Profile = () => {
  const [user, setUser] = useState(userStructure);
  const [select, setSelected] = useState("posts");

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://omniserver.onrender.com/user/${id}`)
      .then(({ data: { user } }) => {
        console.log(user);
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div>
      <Navbar />
      <div className="w-[50%] p-3 m-auto">
        <div className="flex justify-around p-10 mt-5 border-b">
          <div className="w-32 h-32 border rounded-full border-slate-700"></div>
          <div className="flex flex-col justify-center ">
            <div className="px-2 mb-2 text-2xl font-bold text-slate-700">
              {user.name}
            </div>
            <div className="flex text-slate-400">
              <div className="px-2">Post : {user.posts.length}</div>
              <div className="px-2">Followers : {user.followers.length}</div>
              <div className="px-2">Following : {user.following.length}</div>
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
                {user.posts.map((curr, i) => {
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
                {user.followers.map((curr, i) => {
                  return (
                    <UserCard
                      key={i}
                      followingList={user.following}
                      // name={ userData.name}
                      username={curr}
                    />
                  );
                })}
              </div>
            )}
            {select === "following" && (
              <div>
                {user.following.map((curr, i) => {
                  return (
                    <UserCard
                      key={i}
                      // name={ userData.name}
                      followingList={user.following}
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
