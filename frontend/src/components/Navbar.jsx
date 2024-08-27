import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdNotificationsNone } from "react-icons/md";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notificationCount, setNotificationCount] = useState(1); 
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY < lastScrollY) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogin = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleScrollHome = () => {
    const scrollto = document.getElementById("userHome");
    scrollto.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollDepartment = () => {
    const scrollto = document.getElementById("userDepartment");
    scrollto.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollAbout = () => {
    const scrollto = document.getElementById("userAbout");
    scrollto.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollService = () => {
    const scrollto = document.getElementById("userService");
    scrollto.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollConnect = () => {
    const scrollto = document.getElementById("userConnect");
    scrollto.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollAppoinment = () => {
    navigate("/appoinment");
  };

  return (
    <nav
      className={`p-3 sticky top-0 z-50 transition-transform duration-300 ${
        showNavbar
          ? "bg-gray-200 translate-y-0"
          : "bg-gray-200 -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <img src={logo} alt="Logo" className="h-12 w-28 inline-block mr-2" />
        </div>
        <div className="space-x-16">
          <button onClick={handleScrollHome}>Home</button>
          <button onClick={handleScrollDepartment}>Find a Doctor</button>
          <button onClick={handleScrollAbout}>About Us</button>
          <button onClick={handleScrollService}>Service</button>
          <button onClick={handleScrollConnect}>Connect</button>
        </div>
        <div className="flex items-center space-x-7">
          <button
            className="bg-gray-500 py-2 px-7 rounded-lg hover:bg-blue-400 mr-5 font-bold transition duration-300"
            onClick={handleScrollAppoinment}
          >
            <p className="text-white">Book Appointment</p>
          </button>
          {isLoggedIn ? (
            <button
              className="bg-gray-600 text-white px-7 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          ) : (
            <button
              className="bg-gray-600 text-white px-7 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          )}
          <div className="relative flex items-center">
            <div className="border border-gray-600 p-2 rounded-lg relative cursor-pointer">
              <MdNotificationsNone className="text-2xl text-center" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {notificationCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
