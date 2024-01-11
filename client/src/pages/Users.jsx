import React, { useState, useEffect } from "react";
import UserCard from "../component/UserCard";
import axios from "axios";

const Users = () => {
  const users = localStorage.getItem("users");
  const loggedinUser = JSON.parse(users);
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`https://omnipractice-server1.onrender.com/get-user`)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="w-[50%] my-8 p-6   m-auto">
        {user.map((curr, i) => {
          if (loggedinUser.username !== curr.username) {
            return (
              <UserCard
                followingList={loggedinUser.following}
                key={i}
                name={curr.name}
                username={curr.username}
                following={curr.following.length}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Users;
