import { useContext, useState, useEffect } from "react";
import appointmentImg from "../assets/appoinment.png";
import { AppContext } from "./context/Context";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Appointment = () => {
  const {
    selectedDepartment,
    selectedDoctor,
    setSelectedDepartment,
    setSelectedDoctor,
  } = useContext(AppContext);

  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    symptoms: "",
    doctor: selectedDoctor,
    department: selectedDepartment,
    gender: "",
    time: "",
    message: "",
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      doctor: selectedDoctor,
      department: selectedDepartment,
    }));
  }, [selectedDoctor, selectedDepartment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "doctor") {
      setSelectedDoctor(value);
    } else if (name === "department") {
      setSelectedDepartment(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/appoinment/appoinments",
        formData
      );
      console.log("Appointment created successfully:", response.data);
      setFormData({
        name: "",
        date: "",
        symptoms: "",
        doctor: selectedDoctor,
        department: selectedDepartment,
        gender: "",
        time: "",
        message: "",
      });

      toast.success("Appointment created successfully");
    
    } catch (error) {
      console.log(error);
      toast.error("Failed to create appointment", error);
    }
  };

  const handleBook = () => {

    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="w-full p-8 bg-blue-100 shadow-md rounded-md">
      <h2 className="text-2xl text-center font-bold mb-8 uppercase text-black">
        Appointment
      </h2>
      <div className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 p-10 rounded-md">
        <div className="gap-20 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <img
              src={appointmentImg}
              alt="Appointment"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <div className="w-full mb-4">
                <label className="block font-bold mb-2">Patient Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-96 rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  required
                />
              </div>
              <div className="w-full mb-4 ">
                <label className="block font-bold mb-2">Select Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  required
                />
              </div>
              <div className="w-full mb-4">
                <label className="block font-bold mb-2">Symptoms </label>
                <input
                  type="text"
                  id="symptoms"
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
              <div className="w-full mb-4">
                <label className="block font-bold mb-2">Doctor *</label>
                <select
                  id="doctor"
                  name="doctor"
                  value={formData.doctor}
                  onChange={handleSelectChange}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  required
                >
                  <option value="" disabled>
                    Select Doctor
                  </option>
                  <option>Dr. Mark. F.</option>
                  <option>Dr. Stephanie Lersch</option>
                  <option>Dr. Arthur Reese</option>
                </select>
              </div>
              <div className="w-full mb-4">
                <label className="block font-bold mb-2">Department *</label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleSelectChange}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  required
                >
                  <option value="" disabled>
                    Select Department
                  </option>
                  <option>Cardiology</option>
                  <option>Neurology</option>
                  <option>Orthopedics</option>
                </select>
              </div>
              <div className="w-full mb-4">
                <label className="block font-bold mb-2">Gender *</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  required
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="w-full mb-4">
                <label className="block font-bold mb-2">Time *</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  id="text"
                  cols="30"
                  rows="10"
                  className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                ></textarea>
              </div>
              <button
                type="submit"
                onClick={handleBook}
                className="border hover:scale-95 duration-300 relative group cursor-pointer text-gray-800 overflow-hidden h-16 w-64 rounded-md bg-blue-300 p-2 flex justify-center items-center font-extrabold"
              >
                <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
                <p   className="z-40">Book Appointment</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Appointment;
