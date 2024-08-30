import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


const Appointments = () => {
  const [appointmentData, setAppointmentData] = useState(null);
  // const [error, setError] = useState(null);


  const getUser = async () => {
    try {
      // const response = await instance
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/appoinment/appoinment-data/?data=pending",
        { headers: { authorization: token } }
      );
      // console.log("Response from server:", response.data);  
      setAppointmentData(response.data);
      // console.log("data", response.data)
    } catch (err) {
      setError(err.message);
      
    }
  };
  
console.log(appointmentData)
//  

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const updatedAppointment = await axios.patch(
        `http://localhost:3000/api/appoinment/approve`,
        { appid: id },
        { headers: { authorization: token } }
      );

      setAppointmentData((prevData) =>
        prevData.map((appoinment) =>
          appoinment._id === id ? updatedAppointment.data : appoinment
        )
      );

      getUser();
      toast.success("Appointment approved successfully!");
    } catch (err) {
      // setError(err.message);
      toast.err("Appointment not approved!")
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/appoinment/appoinment?appid=${id}`,
        {
          headers: { authorization: token },
        }
      );
      setAppointmentData((prevData) =>
        prevData.filter((appoinment) => appoinment._id !== id)
      );
      toast.success("Appointment Delete successfully!");
    } catch (err) {
      setError(err.message);
      toast.err("Appointment not Delete!");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Appointments</h1>
      <div className="flex flex-wrap justify-center items-center">
        {appointmentData&&
          appointmentData.map((appointment) => (
            <div
              key={appointment._id}
              className="border rounded-lg w-[450px] h-auto bg-blue-300 m-5 hover:-translate-y-2 duration-300"
              >
              <div className="px-3 py-3 ">
                <span className="m-5 font-bold">Name:</span>
                <span className="font-bold m-14">{appointment.name}</span>
              </div>
              <div className="px-3 py-3">
                <span className="m-5 font-bold">Gender:</span>
                <span className="font-bold m-11">{appointment.gender}</span>
              </div>
              <div className="px-3 py-3">
                <span className="m-5 font-bold">Symptoms:</span>
                <span className="font-bold m-5">{appointment.symptoms}</span>
              </div>
              <div className="px-3 py-3">
                <span className="m-5 font-bold">Doctor:</span>
                <span className="font-bold m-12">
                  {appointment.doctorname}
                </span>
              </div>
              
              <div className="px-3 py-3">
                <span className="m-5 font-bold">Date:</span>
                <span className="font-bold m-16">{appointment.slotId?.date} </span>
              </div>
              <div className="px-3 py-3">
                <span className="m-6 font-bold">Time:</span>
                <span className="font-bold m-14">{appointment.slotId?.time}</span>
              </div>
              
              <div className="flex justify-between">
                <button
                  className="relative  text-black text-base font-bold nded-full overflow-hidden  duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 bg-white before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-green-500 before:to-green-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 border float-end px-8 py-2  m-5 rounded-lg transition duration-300"
                  onClick={() => handleApprove(appointment._id)}
                >
                  Approve
                </button>
                <button
                  className="relative  text-black text-base font-bold nded-full overflow-hidden  duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 bg-white before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-red-500 before:to-red-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 border float-end px-8 py-2  m-5 rounded-lg transition duration-300"
                  onClick={() => handleDelete(appointment._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Appointments;
