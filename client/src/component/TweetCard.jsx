import React from "react";

const TweetCard = ({ username, timestamp, text }) => {
  return (
    <div className="flex items-center mb-6 border shadow-md rounded-xl">
      <div className="flex w-[90%] p-3">
        <div className="p-3">
          <div className="w-16 h-16 mb-auto bg-white border rounded-full border-slate-700"></div>
        </div>
        <div className="w-full p-3">
          <div className="flex justify-between w-full mb-2">
            <div className="text-lg font-bold text-slate-700">{username}</div>
            <div className="text-sm text-slate-500">{timestamp}</div>
          </div>
          <div className="w-full line-clamp-3 text-slate-600 text-md">
            {text}
          </div>
        </div>
      </div>
      <div className="w-8 h-16 ml-auto bg-red-400 rounded-l-full"></div>
    </div>
  );
};

export default TweetCard;
