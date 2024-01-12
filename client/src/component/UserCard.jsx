import axios from "axios";
import { useState } from "react";

const UserCard = ({ followingList, username }) => {
  const isFollowing = followingList?.includes(username);
  const [isFollow, setIsFollow] = useState(isFollowing);
  const user = localStorage.getItem("users");
  const userData = JSON.parse(user).username;

  const handleFollow = () => {
    axios
      .post("https://omniserver.onrender.com/followUser", {
        username: userData,
        followUsername: username,
      })
      .then((res) => {
        console.log(res);
        setIsFollow(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-between w-full p-3 border-b">
      <div className="flex items-center p-2">
        <div className="w-16 h-16 border rounded-full border-slate-700"></div>
        <div className="flex flex-col p-5">
          <div className="text-xl text-slate-700">{username}</div>
          {/* <div className="text-sm text-slate-400">Following : {following}</div> */}
        </div>
      </div>
      <button
        disabled={isFollow}
        onClick={handleFollow}
        className={`w-32 p-2 px-4 mx-4 font-bold  ${
          isFollow ? "bg-transparent text-slate-700" : " bg-red-400 text-white"
        } border rounded-md outline-none text-md`}
      >
        {isFollow ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
