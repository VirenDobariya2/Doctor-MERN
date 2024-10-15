import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import doctor from "../../public/assets/doctor-u.jpg";
import sideimg from "../assets/ragisterside.png";


const Register = () => {
  const [formData, setFormData] = useState({
    role: "patient",
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    gender: "",
    password: "",
    doctorField: "",
    doctorExperience: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/register", formData)
      .then((result) => {
        toast.success(result.data.message || "Registration Successful");
        setFormData({
          role: "patient",
          firstName: "",
          lastName: "",
          email: "",
          number: "",
          gender: "",
          password: "",
          doctorField: "",
          doctorExperience: "",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data.message || "Sign Up Failed");
      });
  };

  return (
    <>
      <div className="relative flex items-center justify-center h-screen">
        <div className="absolute inset-0">
          <img
            src={doctor}
            alt="Background"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-md"></div>
        </div>

        <div className="relative flex w-full h-[650px] max-w-6xl bg-blue-50 rounded-lg shadow-lg overflow-hidden">
          <div className="w-1/2">
            <img
              src={sideimg}
              alt="Side"
              className="w-[550px] h-[500px] mt-10 ml-4"
            />
          </div>
          <div className="w-1/2 flex rounded-l-[60px] items-center justify-center relative overflow-hidden z-10 bg-gray-200 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-2xl after:top-24 after:-right-12">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <h2 className="text-2xl font-bold text-center uppercase">
                Register
              </h2>
              <div className="mb-4">
                <label className="block text-lg font-medium text-gray-500 ">
                  Role
                </label>
                <div className="flex items-center">
                  <label className="block mr-4 font-medium text-gray-500 text-md">
                    <input
                      type="radio"
                      name="role"
                      value="doctor"
                      checked={formData.role === "doctor"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Doctor
                  </label>
                  <label className="block font-medium text-gray-500 text-md">
                    <input
                      type="radio"
                      name="role"
                      value="patient"
                      checked={formData.role === "patient"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Patient
                  </label>
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-500">
                  Name
                </label>
                <div className="flex gap-2">
                  <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="First Name"
                  />
                  <input
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-500">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Email"
                />
              </div>
              {formData.role === "doctor" && (
                <div className="mb-2">
                  <div className="flex gap-2 mb-4">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-500">
                        Doctor Field
                      </label>
                      <input
                        name="doctorField"
                        type="text"
                        value={formData.doctorField}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Field"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-500">
                        Experience
                      </label>
                      <input
                        name="doctorExperience"
                        type="text"
                        value={formData.doctorExperience}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Experience"
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-500">
                  Number
                </label>
                <input
                  name="number"
                  type="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Number"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium text-gray-500">
                  Gender
                </label>
                <div className="flex gap-4">
                  <label className="block text-sm font-medium text-gray-500">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      className="ml-2"
                    />
                  </label>
                  <label className="block text-sm font-medium text-gray-500">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      className="ml-2"
                    />
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-500">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Password"
                />
              </div>
              <button
                className="w-full px-4 py-2 font-bold text-white rounded-md bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-600"
                type="submit"
              >
                Register
              </button>
              <div className="px-8 py-4 mt-3 text-sm text-center text-blue-900 bg-blue-200 dark:bg-zinc-800 dark:text-blue-300">
                <span className="text-sm">
                  Already have an account?
                  <a className="font-medium underline" href="/">
                    Login
                  </a>
                </span>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
