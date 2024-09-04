import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "./context/Context";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SlotList from "./slotList/SlotList";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomTimePicker from "../components/CustomTimePicker/CustomTimePicker";
import instance from "../axiosINstance/axiosInstance";
import debounce from "lodash/debounce";

const Appointment = () => {
  const { selectedDepartment, selectedDoctor, setSelectedDepartment, setSelectedDoctor } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dropREf = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    symptoms: "",
    doctor: "",
    department: "",
    gender: "",
    time: "",
    slotId: null,
  });

  const [state, setState] = useState({
    doctors: [],
    filteredDoctors: [],
    departments: [],
    isDisabled: true,
    doctorSlots: [],
  });

  // Initialize form with values from location state
  useEffect(() => {
    if (location.state) {
      const { doctorId, doctorField } = location.state;
      setFormData(prevState => ({
        ...prevState,
        department: doctorField,
        doctor: doctorId,
      }));
      setSelectedDepartment(doctorField);
      setSelectedDoctor(doctorId);
    }
  }, [location.state, setSelectedDepartment, setSelectedDoctor]);

  const debouncedFetchSlots = useRef(
    debounce(async (doctorId) => {
      try {
        const response = await instance({
          url: `appoinment/docSlots/${doctorId}`,
          method: "GET",
        });
        const availableSlots = response.data.filter(
          (slot) => slot.status === "available"
        );
        setState(prevState => ({
          ...prevState,
          doctorSlots: availableSlots,
        }));
      } catch (error) {
        console.error("Error fetching slot list:", error.response ? error.response.data : error.message);
      }
    }, 300)
  ).current;

  useEffect(() => {
    const getDoctorsAndDepartments = async () => {
      try {
        const response = await instance({
          url: "doctors/doctor-data/?data=approved",
          method: "GET"
        });
        setState(prevState => ({
          ...prevState,
          doctors: response.data,
          departments: response.data,
        }));
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };

    getDoctorsAndDepartments();
  }, []);

  useEffect(() => {
    if (!formData.department) return;
    if (formData.doctor) {
      debouncedFetchSlots(formData.doctor);
    }

    const filteredDoctors = state.doctors.filter(
      (doc) => doc.doctorField === formData.department
    );
    setState(prevState => ({
      ...prevState,
      filteredDoctors,
      isDisabled: false,
    }));
  }, [formData.department, formData.doctor]);

  useEffect(() => {
    const isoString = moment(formData.date).format("YYYY-DD-MM");
    const timeFormat = moment(formData.time, "hh:mm a").format("hh:mm a");
    const selectedSlot = state.doctorSlots.find(
      (slot) =>
        moment(slot.date).format("YYYY-DD-MM") === isoString &&
        slot.time === timeFormat
    );

    if (selectedSlot) {
      setFormData(prevState => ({ ...prevState, slotId: selectedSlot._id }));
    }
  }, [formData.date, formData.time, state.doctorSlots]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "doctor") {
      setSelectedDoctor(value);
    } else if (name === "department") {
      setSelectedDepartment(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.slotId) return;
    try {
      const response = await instance({
        url: "appoinment/appoinments",
        method: "POST",
        data: formData,
      });
      setFormData({
        name: "",
        date: "",
        time: "",
        symptoms: "",
        doctor: "",
        department: "",
        gender: "",
        slotId: null,
      });

      toast.success("Appointment created successfully");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      toast.error("Failed to create appointment");
    }
  };

  const filterDates = (date) => {
    return state.doctorSlots.some((slot) =>
      moment(slot.date).isSame(date, "day")
    );
  };

  const handleDateChange = (date) => {
    setFormData(prevState => ({
      ...prevState,
      date: date,
    }));
  };

  const handleTimeChange = (newTime) => {
    setFormData(prevState => ({
      ...prevState,
      time: newTime.trim(),
    }));
  };

  const filterAvailableTimes = () => {
    if (!formData.doctor || !formData.date) return [];
    return state.doctorSlots
      .filter(
        (slot) =>
          slot.doctorId === formData.doctor &&
          moment(slot.date).isSame(moment(formData.date), "day")
      )
      .map((slot) => moment(slot.time, "h:mm a").format("h:mm a"));
  };

  return (
    <div className="container mx-auto bg-blue-100 bg-cover bg-fixed h-screen">
      <div>
        <h2 className="text-2xl text-center py-3 font-bold mb-8 uppercase text-black">
          Appointment
        </h2>
      </div>
      <div className="bg-gradient-to-r from-blue-400 box-content to-indigo-500 p-10 rounded-md">
        <div className="gap-5 flex flex-col md:flex-row">
          <div className="ml-14 md:w-1/2 p-10">
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
                <label className="block font-bold mb-2">Symptoms</label>
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
                    {state.departments.map((dept) => (
                      <option key={dept._id} value={dept.doctorField}>
                        {dept.doctorField}
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
                    disabled={state.isDisabled}
                  >
                    <option value="" disabled>
                      Select Doctor
                    </option>
                    {state.filteredDoctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.firstName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <div>
                  <div className="w-48 mb-4">
                    <label className="block font-bold mb-2">Select Date *</label>
                    <DatePicker
                      placeholderText="DD-MMM-YYYY"
                      value={formData.date}
                      selected={formData.date ? new Date(formData.date) : null}
                      onChange={handleDateChange}
                      filterDate={filterDates}
                      className="mb-4 z-50 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      required
                      disabled={!formData.doctor}
                    />
                  </div>
                </div>

                <div className="w-full mb-4">
                  <label className="block font-bold mb-2">Time *</label>
                  <CustomTimePicker
                    value={formData.time}
                    onChange={handleTimeChange}
                    availableTimes={filterAvailableTimes()}
                  />
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

              <div>
                <button
                  type="submit"
                  className="border z-0 hover:scale-95 duration-300 relative group cursor-pointer text-gray-800 overflow-hidden h-16 w-64 rounded-md bg-blue-300 p-2 flex justify-center items-center font-extrabold"
                >
                  <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
                  <p className="z-40">Book Appointment</p>
                </button>
              </div>
              <div>
                Click Here ?
                <a className="font-medium underline ml-1" href="/home">
                  Home
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Appointment;
