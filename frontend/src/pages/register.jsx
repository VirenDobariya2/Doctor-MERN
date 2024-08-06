import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
      <div className="bg-doctor absolute inset-0 w-auto h-auto bg-cover ">
        <div className="flex items-center justify-center min-h-full">
          <form
            onSubmit={handleSubmit}
            className="w-auto h-auto max-w-md mx-auto relative overflow-hidden z-10 bg-gray-200 p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-600 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
          >
            <h2 className="text-2xl font-bold mb-2 text-center uppercase">
              Register
            </h2>
            <div className="mb-3">
              <label className="text-2xl font-bold text-white mb-2 block">
                Role
              </label>
              <div className="flex items-center">
                <label className="block text-lg font-medium text-gray-500 mr-3">
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

                <label className="block text-lg font-medium text-gray-500 mr-4">
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
                <div className="flex gap-2 w-auto h-auto">
                  <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="First Name"
                  />
                  <input
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Last Name"
                  />
                </div>
              </label>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Email"
              />
            </div>
            {formData.role === "doctor" && (
              <div className="flex gap-2 mb-2">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Doctor Field
                  </label>
                  <input
                    name="doctorField"
                    type="text"
                    value={formData.doctorField}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Field"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Experience
                  </label>
                  <input
                    name="doctorExperience"
                    type="text"
                    value={formData.doctorExperience}
                    onChange={handleChange}
                    className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Experience"
                  />
                </div>
              </div>
            )}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Number
              </label>
              <input
                name="number"
                type="number"
                value={formData.number}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Number"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Gender
              </label>
              <div className="flex m-2 gap-4">
                <label className="block text-sm font-medium text-gray-500 mr-3">
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleChange}
                    className="m-1"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-500 mr-3">
                  Female
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleChange}
                    className="m-1"
                  />
                </label>
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-500 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Password"
              />
            </div>
            <button
              className="bg-gradient-to-r from-purple-600 via-purple-400 to-blue-500 px-4 font-bold hover:opacity-80 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="submit"
            >
              Register
            </button>
            <div className="mt-2 px-8 py-3 bg-blue-200 dark:bg-zinc-800">
              <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
                Already have an account?
                <a className="font-medium underline m-1" href="/">
                  Login
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
