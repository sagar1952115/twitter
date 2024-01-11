import React, { useEffect, useState } from "react";
import TweetCard from "../component/TweetCard";
import axios from "axios";
import Navbar from "../component/Navbar";

const Feed = () => {
  const [tweet, setTweet] = useState([]);
  const user = localStorage.getItem("users");
  const userId = JSON.parse(user).username;
  useEffect(() => {
    axios
      .get(`https://omniserver.onrender.com/feed/${userId}`)
      .then(({ data }) => {
        setTweet(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="w-full ">
      <Navbar />
      <div className="w-[50%] my-8 p-6   m-auto">
        <div className="">
          <button className="w-32 p-3 px-6 font-bold text-white bg-red-400 rounded-md text-md">
            Write
          </button>
          <div></div>
        </div>
        <div className="my-5">
          {tweet.map((curr, i) => {
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
      </div>
    </div>
  );
};

export default Feed;
