const UserCard = ({ followingList, username }) => {
  const isFollowing = followingList?.includes(username);

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
        className={`w-32 p-2 px-4 mx-4 font-bold  ${
          isFollowing
            ? "bg-transparent text-slate-700"
            : " bg-red-400 text-white"
        } border rounded-md outline-none text-md`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
