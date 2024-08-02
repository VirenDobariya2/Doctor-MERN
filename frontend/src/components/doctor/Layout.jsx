import React, { useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { FaRegListAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { PiMailboxFill } from "react-icons/pi";
import { IoPower } from "react-icons/io5";
import Home from "./Home";
import Inbox from "./Inbox";
import Appointments from "./Appointments";
import Profile from "./Profile";
import LogOut from "./LogOut";

const Layout = () => {
  // const [user, setUser] = useState({ _id: "12345" });
  const [currentView, setCurrentView] = useState("home");

  const DoctorMenu = [
    { name: "Home", path: "home", icon: AiTwotoneHome },
    {
      name: "Appointments",
      path: "appointments",
      icon: FaRegListAlt,
    },
    { name: "Inbox", path: "inbox", icon: PiMailboxFill },
    { name: "Profile", path: `profile`, icon: CgProfile },
    { name: "Log Out", path: "logout", icon: IoPower },
  ];

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <Home />;
      case "inbox":
        return <Inbox />;
      case "appointments":
        return <Appointments />;
      case "profile":
        return <Profile />;
      case "logout":
        return <LogOut />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <div
        id="cta-button-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-300 dark:bg-gray-800">
          <h1 className="font-bold text-center m-5 text-4xl">Doctor</h1>
          <ul className="space-y-2 font-medium">
            {DoctorMenu.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentView(item.path)}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <item.icon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ml-64 p-4">{renderView()}</div>
    </div>
  );
};

export default Layout;
