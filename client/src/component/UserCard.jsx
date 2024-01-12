import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../App";

const UserCard = ({ followingList, username }) => {
  const isFollowing = followingList?.includes(username);
  const [isFollow, setIsFollow] = useState(isFollowing);
  const user = localStorage.getItem("users");
  const userData = JSON.parse(user).username;

  const {
    userAuth,
    userAuth: { following },
  } = useContext(UserContext);

  const handleFollow = () => {
    setIsFollow(true);
    following.push(username);
    localStorage.setItem("users", JSON.stringify(userAuth));

    axios
      .post("https://omniserver.onrender.com/follow-user", {
        username: userData,
        followUsername: username,
      })
      .then((res) => {
        console.log(res);
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
