import React, { useContext, useEffect, useState } from "react";
import TweetCard from "../component/TweetCard";
import axios from "axios";
import Navbar from "../component/Navbar";
import { UserContext } from "../App";
import Loader from "../component/Loader";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [tweet, setTweet] = useState([]);
  let {
    userAuth: { username },
  } = useContext(UserContext);
  const fetchFeed = () => {
    axios
      .get(`https://omniserver.onrender.com/feed/${username}`)
      .then(({ data }) => {
        setTweet(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (username) {
      fetchFeed();
    }
    // eslint-disable-next-line
  }, [username]);
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
          {!loading ? (
            tweet.length > 0 ? (
              tweet.map((curr, i) => {
                return (
                  <TweetCard
                    key={i}
                    username={curr.username}
                    text={curr.text}
                    timestamp={curr.timestamp}
                  />
                );
              })
            ) : (
              <div className="w-full p-10 text-4xl font-extrabold text-center text-slate-300">
                No tweets to show.
              </div>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
