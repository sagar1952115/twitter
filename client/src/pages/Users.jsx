import React, { useState, useEffect, useContext } from "react";
import UserCard from "../component/UserCard";
import axios from "axios";
import Navbar from "../component/Navbar";
import { UserContext } from "../App";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const {
    userAuth: { username: loggedinUser, following },
  } = useContext(UserContext);
  const [user, setUser] = useState([]);
  useEffect(() => {
    axios
      .get(`https://omniserver.onrender.com/get-user`)
      .then(({ data }) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Navbar />
      <div className="w-[50%] my-8 p-6   m-auto">
        {!loading ? (
          user.length > 0 ? (
            user.map((curr, i) => {
              if (loggedinUser !== curr.username) {
                return (
                  <UserCard
                    followingList={following}
                    key={i}
                    name={curr.name}
                    username={curr.username}
                    following={curr.following.length}
                  />
                );
              }
            })
          ) : (
            <div className="w-full p-10 text-4xl font-extrabold text-center text-slate-300">
              No user to show.
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Users;
