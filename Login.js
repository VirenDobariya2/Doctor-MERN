import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";
import doctor from "../../public/assets/doctor-u.jpg";
import sideimg from "../../public/assets/about.png";

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
        "http://localhost:3000/api/users/login",
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
    <div className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src={doctor}
          alt="Background"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
      </div>

      <div className="relative flex w-full max-w-6xl h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/2 flex rounded-r-[60px] items-center justify-center relative overflow-hidden z-10 bg-gray-200 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-2xl after:top-24 after:-right-12">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md relative "
          >
            <h2 className="text-2xl font-bold mb-2 text-center uppercase">
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
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Password"
              />
            </div>
            <button
              className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 px-4 font-bold hover:opacity-80 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="submit"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
            <div className="mt-5 px-8 py-4 bg-blue-200 dark:bg-zinc-800 text-center text-sm text-blue-900 dark:text-blue-300">
              {isLoggedIn ? (
                "Logged In"
              ) : (
                <>
                  New account?{" "}
                  <a
                    className="font-medium underline ml-1"
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
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
