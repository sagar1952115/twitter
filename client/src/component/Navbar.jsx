import { Link, Outlet } from "react-router-dom";

const Navbar = ({ active, setActive }) => {
  return (
    <>
      <div className="flex items-center justify-center w-full h-20 shadow-md ">
        <div className="pl-12 ml-14 w-[40%]  text-4xl text-red-400 font-bold">
          TweetX
        </div>
        <div className="w-[60%] text-xl font-bold text-gray-300 flex justify-center items-center">
          <Link to="/">
            <div
              onClick={() => setActive("feed")}
              className={`mx-6 ${active === "feed" ? "text-red-400" : ""}`}
            >
              Feed
            </div>
          </Link>
          <Link to="/users">
            <div
              onClick={() => setActive("users")}
              className={`mx-6 ${active === "users" ? "text-red-400" : ""}`}
            >
              Users
            </div>
          </Link>
          <Link to="/profile/123">
            <div
              onClick={() => setActive("profile")}
              className={`mx-6 ${active === "profile" ? "text-red-400" : ""}`}
            >
              Profile
            </div>
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
