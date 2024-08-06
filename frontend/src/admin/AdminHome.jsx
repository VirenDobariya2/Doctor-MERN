import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHome = () => {
  const [doctorsData, setDoctorsData] = useState([]);

  const token = localStorage.getItem("token");
  const getDoctor = async () => {
    try {
      const doctors = await axios.get(
        `http://localhost:3000/api/doctors/doctor-data/?data=approved`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      // console.log("doctor", doctors)
      setDoctorsData(doctors.data);
    } catch (error) {
      toast.error("Failed to doctors");
    }
  };

  const handleapproveDoctor = async (id) => {
    try {
      await axios.patch(
        "http://localhost:3000/api/doctors/approve-doctor",
        { docid: id },
        {
          headers: {
            authorization: token,
          },
        }
      );
      toast.success("Doctor approved successfully");
      getDoctor();
    } catch (error) {
      toast.error("Failed to approve doctor");
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:3000/api/doctors/doctor-remove?docid=${id}`,
        {
          headers: { authorization: token },
        }
      );
      setDoctorsData((prevData) =>
        prevData.filter((doctor) => doctor._id !== id)
      );
    } catch (error) {}
  };

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center font-bold m-5 text-2xl uppercase">
        Pending Doctor Registrations
      </h1>
      <div className="flex flex-wrap justify-center items-center  ">
        {doctorsData &&
          doctorsData.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-gray-700 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200 w-[450px] h-auto  m-5 hover:-translate-y-2 duratin-300"

            >
              <div className="px-3 py-3 ">
                <span className="text-white m-5 font-bold">FirstName:</span>
                <span className="text-white font-bold m-14">{doctor.firstName}</span>
              </div>
              <div className="px-3 py-3 ">
                <span className=" text-white m-5 font-bold">LastName:</span>
                <span className="text-white font-bold m-14">{doctor.lastName}</span>
              </div>
              <div className="px-3 py-3 ">
                <span className="text-white m-5 font-bold">Email:</span>
                <span className=" text-white font-bold ml-[90px]">{doctor.email}</span>
              </div>
              <div className="px-3 py-3 ">
                <span className="text-white m-5 font-bold">Number:</span>
                <span className="text-white font-bold m-16">{doctor.number}</span>
              </div>
              <div className="px-3 py-3 ">
                <span className="text-white m-5 font-bold">Field:</span>
                <span className="text-white font-bold ml-[90px]">{doctor.doctorField}</span>
              </div>
              <div className="px-3 py-3 ">
                <span className="text-white m-5 font-bold">Experience:</span>
                <span className="text-white font-bold m-12">
                  {doctor.doctorExperience}
                </span>
              </div>
              <div className="px-3 py-3 ">
                <span className="text-white m-5 font-bold">Gender:</span>
                <span className="text-white font-bold ml-[77px]">{doctor.gender}</span>
              </div>

              <div className="flex justify-between">
                <button
                  className="relative  text-black text-base font-bold nded-full overflow-hidden  duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 bg-white before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-green-500 before:to-green-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 border float-end px-8 py-2  m-5 rounded-lg transition duration-300"
                  onClick={() => handleapproveDoctor(doctor._id)}
                >
                  Approve
                </button>
                <button
                  className="relative  text-black text-base font-bold nded-full overflow-hidden  duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 bg-white before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-red-500 before:to-red-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 border float-end px-8 py-2  m-5 rounded-lg transition duration-300"
                  onClick={() => handleDeleteDoctor(doctor._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminHome;
