import { useContext, useState, useEffect, useRef } from "react";
import appointmentImg from "../assets/appoinment.png";
import { AppContext } from "./context/Context";
import axios from "axios";
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

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    symptoms: "",
    doctor: selectedDoctor,
    department: selectedDepartment,
    gender: "",
    time: "",
  });

  const dropREf = useRef(null);

  const [doctor, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredDoctors, setfilteredDoctors] = useState([]);
  // const [filteredDepartment, setfilteredDepartment] = useState([]);
  const [isDisabled, setisDisabled] = useState(true);
  const [isTimeDisabled, setIsTimeDisabled] = useState(true);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/api/doctors/doctor-data/?data=approved",
          {
            headers: {
              authorization: token,
            },
          }
        );
        setDoctors(response.data);
        setDepartments(response.data);
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };

    getDoctors();
  }, []);

  // useEffect(() => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,S
  //     doctor: selectedDoctor,
  //     department: selectedDepartment,
  //   }));
  // }, [selectedDoctor, selectedDepartment]);

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
      let FilteredDoctors = doctor.filter((doc) => doc.doctorField == value);
      setfilteredDoctors(FilteredDoctors);
      setisDisabled(false);
      dropREf.current.click();
    } else if (name === "date"){
      setIsTimeDisabled(false)
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
        department: setSelectedDepartment,
        gender: "",
        time: "",
        
      });

      toast.success("Appointment created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create appointment", error);
    }
  };

  const handleBook = () => {
    setTimeout(() => {
      navigate("");
    }, 1000);
  };

  return (
    <div className="container mx-auto bg-blue-100 bg-cover bg-fixed h-screen">
      <div >
        <h2 className="text-2xl text-center py-5 font-bold mb-8 uppercase text-black">
          Appointment
        </h2>
        </div>
        <div className=" bg-gradient-to-r from-blue-400 box-content to-indigo-500 p-10 rounded-md">
          <div className="gap-5 flex flex-col md:flex-row">
            <div className=" ml-14 md:w-1/2 p-10 ">
              <img
                src={appointmentImg}
                alt="Appointment"
                className="object-cover rounded-md"
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
                <div className="flex gap-2">
                  
                  <div className="w-full mb-4">
                    <label className="block font-bold mb-2">Department *</label>
                    <select
                      // ref={dropREf}
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
                      {departments.map((departments) => (
                        <option
                          key={departments._id}
                          value={departments.doctorField}
                        >
                          {departments.doctorField}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full mb-4">
                    <label className="block font-bold mb-2">Doctor *</label>
                    <select
                      ref={dropREf}
                      id="doctor"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleSelectChange}
                      className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      required
                      disabled={isDisabled}
                    >
                      <option value="" disabled>
                        Select Doctor
                      </option>
                      {filteredDoctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                          {doctor.firstName}
                        </option>
                      ))}
                    </select>
                  </div>
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
                <div className="flex gap-2">
                  <div className="w-full mb-4 ">
                    <label className="block font-bold mb-2">
                      Select Date *
                    </label>
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
                    <label className="block font-bold mb-2">Time *</label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      required
                      disabled
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleBook}
                  className="border hover:scale-95 duration-300 relative group cursor-pointer text-gray-800 overflow-hidden h-16 w-64 rounded-md bg-blue-300 p-2 flex justify-center items-center font-extrabold"
                >
                  <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
                  <p className="z-40">Book Appointment</p>
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
