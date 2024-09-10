import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "F:/MERN STACK/Complete MERN/Doctor Appoinment/frontend/src/assets/logolo.png";
import { MdNotificationsNone, MdCancel } from "react-icons/md";
import axios from "axios";

const Navbar = ({ updateNotificationCount }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [currentNotifications, setCurrentNotifications] = useState([]);

  const handleScroll = () => {
    if (window.scrollY < lastScrollY) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
    setLastScrollY(window.scrollY);
  };

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/appoinment/getNotifications",
          {
            headers: { authorization: token },
          }
        );
        setNotifications(response.data);
        setNotificationCount(response.data.length);
        setCurrentNotifications(response.data);  
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  const markAllAsRead = () => {
    const updatedNotifications = currentNotifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setCurrentNotifications(updatedNotifications);
    setNotificationCount(0);
    updateNotificationCount(0);
  };

  const handleNotificationClick = (id) => {
    setCurrentNotifications((prev) =>
      prev.map((notification) =>
        notification._id === id ? { ...notification, isRead: true } : notification
      )
    );
    setNotificationCount(notificationCount - 1);
    updateNotificationCount(notificationCount - 1);
  };

  const handleCancelClick = (id, e) => {
    e.preventDefault();
    setCurrentNotifications((prev) =>
      prev.filter((notification) => notification._id !== id)
    );
    setNotificationCount(notificationCount - 1);
    updateNotificationCount(notificationCount - 1);
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
        showNavbar ? "bg-gray-50 translate-y-0" : "bg-gray-100 -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 ml-24">
          <img src={logo} alt="Logo" className="h-14" />
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex-grow flex justify-center space-x-10 ">
          <button onClick={handleScrollHome} className="hover:text-blue-400">Home</button>
          <button onClick={handleScrollDepartment}  className="hover:text-blue-400">Find a Doctor</button>
          <button onClick={handleScrollAbout} className="hover:text-blue-400">About Us</button>
          <button onClick={handleScrollService} className="hover:text-blue-400">Service</button>
          <button onClick={handleScrollConnect} className="hover:text-blue-400">Connect</button>
        </div>
        
        {/* Action Buttons and Notifications */}
        <div className="flex items-center space-x-4 mr-24">
          <button
            className="border-blue-300 border-2 hover:text-white py-2 px-3 rounded-lg hover:bg-blue-500 transition duration-300"
            onClick={handleScrollAppoinment}
          >
            <p className="">Book Appointment</p>
          </button>
          {isLoggedIn ? (
            <button
              className="border-blue-300 border-2 hover:text-white  px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300"
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
          {/* Notification Icon and Dropdown */}
          <div className="relative flex items-center">
            <div
              className="border border-gray-600 p-2 rounded-lg relative cursor-pointer"
              onClick={handleIconClick}
            >
              <MdNotificationsNone className="text-2xl" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {notificationCount}
                </span>
              )}
            </div>
            {isOpen && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4 overflow-y-auto max-h-80">
                <button
                  onClick={markAllAsRead}
                  className="w-full text-sm text-blue-500 hover:text-blue-700 mb-2"
                >
                  Mark All as Read
                </button>
                {currentNotifications.length > 0 ? (
                  currentNotifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`mb-2 p-2 border-b cursor-pointer flex items-center justify-between ${notification.isRead ? "bg-white" : "bg-gray-100"}`}
                      onClick={() => handleNotificationClick(notification._id)}
                    >
                      <p className="flex-1">{notification.message}</p>
                      <MdCancel
                        className="text-red-300 hover:text-red-600 cursor-pointer ml-2"
                        onClick={(e) => handleCancelClick(notification._id, e)}
                      />
                    </div>
                  ))
                ) : (
                  <p>No notifications</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
