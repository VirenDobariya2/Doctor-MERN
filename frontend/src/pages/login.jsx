import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import doctor from "../../public/assets/doctor-u.jpg";
import sideimg from "../assets/loginpage.png";

const Login = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" />;
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:3000/api/users/login",
        formData
      );

      const { data, role } = response.data;

      toast.success(response.data.message || "Login Successful");

      localStorage.setItem("token", data);
      localStorage.setItem("role", role);
      localStorage.setItem("isLoggedIn", "true");

      if (role === "doctor") {
        setTimeout(() => {
          navigate("/deshboard");
        }, 1000);
      } else if (role === "patient") {
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (role === "admin") {
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data.message || "Login Failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen">
      <div className="absolute inset-0">
        <img
          src={doctor}
          alt="Background"
          className="absolute object-cover w-full h-full inset-0xs"
        />
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
      </div>

      <div className="relative flex w-full max-w-6xl h-[650px] bg-blue-50 rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 flex rounded-r-[60px] items-center justify-center relative overflow-hidden z-10 bg-gray-200 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-2xl after:top-24 after:-right-12">
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md "
          >
            <h2 className="mb-2 text-2xl font-bold text-center uppercase">
              Login
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-500">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Password"
              />
            </div>
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-md bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 hover:opacity-80 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="submit"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
            <div className="px-8 py-4 mt-5 text-sm text-center text-blue-900 bg-blue-200 dark:bg-zinc-800 dark:text-blue-300">
              {isLoggedIn ? (
                "Logged In"
              ) : (
                <>
                  New account?
                  <a
                    className="ml-1 font-medium underline"
                    href="/register"
                  >
                    Register
                  </a>
                </>
              )}
            </div>
          </form>
        </div>
        <div className="w-1/2">
          <img
            src={sideimg}
            alt="Side"
            className="w-[550px] h-[500px] mt-10 ml-4"
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
