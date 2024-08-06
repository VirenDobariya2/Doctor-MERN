import axios from "axios";
import { useEffect, useState } from "react";

const DoctorData = () => {
  const [approvedDoctor, setApprovedDoctor] = useState();
  const [error, setError] = useState(null);

  const getApprovedDoctor = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/api/doctors/approve-doctor",
        { headers: { authorization: token } }
      );
      setApprovedDoctor(response.data);
    } catch (err) {
      setError(err.message);
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
      getApprovedDoctor();
      
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    getApprovedDoctor();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center font-bold m-5 text-2xl uppercase">
        Doctor Data
      </h1>
      <div className="flex flex-wrap justify-center items-center  ">
        {approvedDoctor &&
          approvedDoctor.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-green-400 border-[4px] border-green-900 rounded-2xl hover:border-blue-500 transition-all duration-200 w-[450px] h-auto  m-5 hover:-translate-y-2 duratin-300"
            >
              <div className="px-3 py-3 ">
                <span className=" m-5 font-bold">FirstName:</span>
                <span className=" font-bold m-14">
                  {doctor.firstName}
                </span>
              </div>
              <div className="px-3 py-3 ">
                <span className="  m-5 font-bold">LastName:</span>
                <span className=" font-bold m-14">
                  {doctor.lastName}
                </span>
              </div>
              <div className="px-3 py-3 ">
                <span className=" m-5 font-bold">Email:</span>
                <span className="  font-bold ml-[90px]">
                  {doctor.email}
                </span>
              </div>
              <div className="px-3 py-3 ">
                <span className=" m-5 font-bold">Number:</span>
                <span className=" font-bold m-16">
                  {doctor.number}
                </span>
              </div>
              <div className="px-3 py-3 ">
                <span className=" m-5 font-bold">Field:</span>
                <span className=" font-bold ml-[90px]">
                  {doctor.doctorField}
                </span>
              </div>
              <div className="px-3 py-3 ">
                <span className=" m-5 font-bold">Experience:</span>
                <span className=" font-bold m-12">
                  {doctor.doctorExperience}
                </span>
              </div>
              <div className="px-3 py-3 ">
                <span className=" m-5 font-bold">Gender:</span>
                <span className=" font-bold ml-[77px]">
                  {doctor.gender}
                </span>
              </div>
              <button
                  className="relative  text-black text-base font-bold nded-full overflow-hidden  duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 bg-white before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-red-500 before:to-red-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-lg hover:before:left-0 border float-end px-8 py-2  m-5 rounded-lg transition duration-300"
                  onClick={() => handleDeleteDoctor(doctor._id)}
                >
                  Remove Doctor
                </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorData;
