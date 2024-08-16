import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

 const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    localStorage.clear()
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleScrollHome =() => {
    const scrollto = document.getElementById('userHome');
    scrollto.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollDepartment = ()=>{
    const scrollto = document.getElementById('userDepartment');
    scrollto.scrollIntoView({ behavior: "smooth" })
  }
  
  const handleScrollAbout = ()=>{
    const scrollto = document.getElementById('userAbout');
    scrollto.scrollIntoView({ behavior: "smooth" })
  }
  
  const handleScrollService = ()=>{
    const scrollto = document.getElementById('userService');
    scrollto.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollConnect = ()=>{
    const scrollto = document.getElementById('userConnect');
    scrollto.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollAppoinment = () =>{
    navigate("/appoinment")
  }
  // console.log(isLoggedIn);

  return (
    <nav className="p-3 bg-gray-300">
      <div className="container  mx-auto justify-center items-center ">
      <div className="flex justify-around  items-baseline  ">
        <div className=" text-white text-lg font-bold">
          <img src={logo} alt="Logo" className="h-12 w-28 inline-block mr-2" />
        </div>
        <div className="space-x-16">
          <button onClick={handleScrollHome}>
            Home
          </button>
          <button onClick={handleScrollDepartment}>
            Find a Doctor
          </button>
          <button onClick={handleScrollAbout}>
            About Us
          </button>
          <button onClick={handleScrollService}>
            Service
          </button>      
          <button onClick={handleScrollConnect}>
            Connect
          </button>
          
        </div>
        <div>
        <button className="bg-gray-500  py-2 px-7 rounded-lg hover:bg-blue-400 mr-5 font-bold transition duration-300" onClick={handleScrollAppoinment}>
            <p className="text-white">Book Appoinment</p>
          </button>
          {isLoggedIn ? (
            <button
              className="bg-gray-600 text-white px-7 py-2  rounded-lg hover:bg-blue-700 transition duration-300"
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
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
