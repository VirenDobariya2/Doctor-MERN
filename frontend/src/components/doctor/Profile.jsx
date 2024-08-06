import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [doctordata, setDoctorData] = useState(null);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    
    const doctors = await axios.get(
      "http://localhost:3000/api/users/get-user-info-by-id",
      { headers: { authorization: token } }
    );
    console.log("doctors",doctors)
   
    setDoctorData(doctors.data.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Profile</h1>
      {doctordata && (
        <div className="space-y-2">
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Role:</span>
            <span className="font-semibold">{doctordata.role}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">First Name:</span>
            <span className="font-semibold">{doctordata.firstName}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Last Name:</span>
            <span className="font-semibold">{doctordata.lastName}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Email:</span>
            <span className="font-semibold">{doctordata.email}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Gender:</span>
            <span className="font-semibold">{doctordata.gender}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Number:</span>
            <span className="font-semibold">{doctordata.number}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Field:</span>
            <span className="font-semibold">{doctordata.doctorField}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Experience:</span>
            <span className="font-semibold">{doctordata.doctorExperience}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
