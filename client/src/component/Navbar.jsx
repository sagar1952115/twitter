import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem("users");
  const userData = JSON.parse(user);
  const location = useLocation();
  return (
    <>
      <div className="flex items-center justify-center w-full h-20 shadow-md ">
        <div className="pl-12 ml-14 w-[40%]  text-4xl text-red-400 font-bold">
          TweetX
        </div>
        <div className="w-[60%] text-xl font-bold text-gray-300 flex justify-center items-center">
          <Link to="/">
            <div
              className={`mx-6 ${
                location.pathname === "/" ? "text-red-400" : ""
              }`}
            >
              Feed
            </div>
          </Link>
          <Link to="/users">
            <div
              className={`mx-6 ${
                location.pathname === "/users" ? "text-red-400" : ""
              }`}
            >
              Users
            </div>
          </Link>
          <Link to={`/profile/${userData.username}`}>
            <div
              className={`mx-6 ${
                location.pathname === "/profile" ? "text-red-400" : ""
              }`}
            >
              Profile
            </div>
          </Link>
        </div>
      </div>
      {/* <Outlet /> */}
    </>
  );
};

export default Navbar;
