import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import instance from "../../axiosINstance/axiosInstance";



const Inbox = () => {
  const [approvedAppointments, setApprovedAppointments] = useState(null);
  const [error, setError] = useState(null);

  const getApprovedAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await instance(
        {
          url: "appoinment/approve",
          method: "GET",
        }
      );
      setApprovedAppointments(response.data);

    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await instance(
        {
          url: `appoinment/appoinment?appid=${id}`,
          method: "DELETE",
        }
      );
      getApprovedAppointments();
      toast.success("Appointment Done successfully!")
    } catch (err) {
      setError(err.message);
      toast.err("Appointment not Done!")
    }
  };

  useEffect(() => {
    getApprovedAppointments();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Inbox</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-wrap">
        {approvedAppointments &&
          approvedAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="border rounded-lg w-[450px] h-auto bg-sky-300 m-5 hover:-translate-y-2 duration-300"
            >
              <div className="px-3 py-3">
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
                <span className="font-bold m-16">{appointment.slotId?.date } </span>
              </div>
              <div className="px-3 py-3">
                <span className="m-6 font-bold">Time:</span>
                <span className="font-bold m-14">{appointment.slotId?.time  }</span>
              </div>
              <button
                className="relative  text-black text-base font-bold nded-full overflow-hidden  duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 bg-white before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-green-500 before:to-green-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 border float-end px-8 py-2  m-5 rounded-lg transition duration-300"
                onClick={() => handleDelete(appointment._id)}
              >
                Done
              </button>
            </div>
          ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Inbox;
