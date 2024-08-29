import { useContext, useState, useEffect, useRef } from "react";
import appointmentImg from "../assets/appoinment.png";
import { AppContext } from "./context/Context";
import axios from "axios";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import SlotList from "./slotList/SlotList";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomTimePicker from '../components/CustomTimePicker/CustomTimePicker';
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import instance from "../axiosINstance/axiosInstance";

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
    slotId: null,
  });

  const dropREf = useRef(null);

  const [doctor, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filteredDoctors, setfilteredDoctors] = useState([]);
  const [isDisabled, setisDisabled] = useState(true);
  // const [slotfetched, setslotfetched] = useState(true);
  const [doctorSlots, setDoctorSlots] = useState([]);

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

  const fetchSlotListforDoctor = async (id) => {
    try {
      // console.log(`Fetching slots for doctor with ID: ${id}`);
      const response = await instance({
        url:`appoinment/docSlots/${id}`,
        method:"GET",
      })
      // console.log("Response data:", response.data);
      const availableSlots = response.data.filter(
        (slot) => slot.status === "available"
      );

      return availableSlots;
    } catch (error) {
      console.error("Error fetching slot list:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {

    console.log('doctorSlots',selectedDoctor)

    if(!selectedDoctor)return

    (async () => {
      const doctorSlots = await fetchSlotListforDoctor(selectedDoctor);


      console.log('doctorSlots',doctorSlots,selectedDoctor)

      const now = Date.now();
      const futureSlots = doctorSlots.filter(
        (slot) =>
          moment(slot.date).isAfter(now) ||
          (moment(slot.date).isSame(now, "day") &&
            moment(slot.time, "HH:mm").isAfter(now))
      );

      setDoctorSlots(futureSlots);
    })();
  }, [selectedDoctor]);

  const handleChange = async (e) => {
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData?.slotId) return;
    console.log("Form Data being sent:", formData);

    try {
      const response = await instance({
        url: "appoinment/appoinments",
        method: "POST",
        data: formData,
      });
      console.log("Appointment created successfully:", response.data);
      setFormData({
        name: "",
        date: "",
        time: "",
        symptoms: "",
        doctor: selectedDoctor,
        department: setSelectedDepartment,
        gender: "",
        slotId: null,
      });

      toast.success("Appointment created successfully");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create appointment", error);
    }
  };

  const filterDates = (date) => {
    return doctorSlots.some((slot) => moment(slot.date).isSame(date, "day"));
  };

  const handleDateChange = (e) => {
    const date = new Date(e);
    // const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    
    const extaxtDatw = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
    // console.log("datedatedatedate",extaxtDatw )
    // const isoString = extaxtDatw.toISOString();
    // console.log(extaxtDatw);
    setFormData((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  const handleTimeChange = (newTime) => {

    console.log('newTime',newTime)

    console.log(newTime)
    
    setFormData({ 
        ...formData, 
        time: newTime.trim()
    });

};
  const filterAvailableTimes = () => {
    if (!formData.doctor || !formData.date) return [];
    return doctorSlots
      .filter(
        (slot) =>
          slot.doctorId === formData.doctor &&
          moment(slot.date).isSame(moment(formData.date), "day")
      )
      .map((slot) => moment(slot.time, "h:mm a").format('h:mm a '));
  };

  useEffect(() => {

    const isoString = moment(formData.date).toISOString();
    let stringDate = ''

    if(typeof isoString == 'string'){
       let dummy = isoString.split('T')[0]

       stringDate = `${dummy}T00:00:00.000Z`

    }
    console.log('isoString', stringDate)

    
    const timeFormat = moment(formData.time, 'hh:mm a').format('hh:mm a');
    const selectedSlot = doctorSlots.filter(
      (slot) => slot.date == stringDate && slot.time == timeFormat
    );
    // console.log(selectedSlot,'timeFormat',selectedSlot)

    if (selectedSlot.length > 0) {
      setFormData({ ...formData, slotId: selectedSlot[0]._id });
    }
  }, [formData.time]);

  return (
    <div className="container mx-auto bg-blue-100 bg-cover bg-fixed h-screen">
      <div>
        <h2 className="text-2xl text-center py-3 font-bold mb-8 uppercase text-black">
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


              <div className="flex gap-2">
                <div>
                  <div className="w-48 mb-4 ">
                    <label className="block font-bold mb-2">
                      Select Date *
                    </label>
                    <DatePicker
                      // icon={}
                      placeholderText="DD-MMM-YYYY"
                      value={formData.date}
                      selected={formData.date ? new Date(formData.date) : null}
                      onChange={handleDateChange}
                      filterDate={filterDates}
                      className="mb-4  block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                      required
                      disabled={formData.doctor === ""}
                    />
                  </div>
                </div>

                <div className="w-full mb-4">
                  <label className="block font-bold mb-2">Time *</label>
                  {/* <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                    disabled={!formData.date || !filterAvailableTimes()}
                  >
                    <option value="" disabled>
                      Select a time
                    </option>
                    {filterAvailableTimes().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select> */}
                   <CustomTimePicker
                    value={formData.time}
                    onChange={handleTimeChange}
                    availableTimes={filterAvailableTimes()}
                  />

                  {/* <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleTimeChnage}
                    filterTimes={filterTimes}
                    className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                    disabled={formData.date === ""}
                    // min={
                    //   doctorSlots.length > 0
                    //     ? moment(doctorSlots[0].time, "HH:mm").format("HH:mm")
                    //     : ""
                    // }
                    // max={
                    //   doctorSlots.length > 0
                    //     ? moment(
                    //         doctorSlots[doctorSlots.length - 1].time,
                    //         "HH:mm"
                    //       ).format("HH:mm")
                    //     : ""
                    // }
                    // step="1800"
                  /> */}
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
              <div className="">
                <button
                  type="submit"
                  className="border hover:scale-95 duration-300 relative group cursor-pointer text-gray-800 overflow-hidden h-16 w-64 rounded-md bg-blue-300 p-2 flex justify-center items-center font-extrabold"
                >
                  <div className="absolute right-2 -top-4 group-hover:top-1 group-hover:right-2 z-10 w-32 h-32 rounded-full group-hover:scale-150 duration-500 bg-sky-800"></div>
                  <p className="z-40">Book Appointment</p>
                </button>
              </div>
              <div className="">
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
