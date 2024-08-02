import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userdata, setUserData] = useState(null);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    console.log(token);

    const users = await axios.get(
      "http://localhost:3000/api/users/get-user-info-by-id",
      { headers: { authorization: token } }
    );

    setUserData(users.data.data);
  };

  useEffect(() => {
    if (!userdata) getUser();
  }, [userdata]);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Profile</h1>
      {userdata && (
        <div className="space-y-2">
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Role:</span>
            <span className="font-semibold">{userdata.role}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">First Name:</span>
            <span className="font-semibold">{userdata.firstName}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Last Name:</span>
            <span className="font-semibold">{userdata.lastName}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Email:</span>
            <span className="font-semibold">{userdata.email}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Gender:</span>
            <span className="font-semibold">{userdata.gender}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Number:</span>
            <span className="font-semibold">{userdata.number}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Field:</span>
            <span className="font-semibold">{userdata.doctorField}</span>
          </div>
          <div className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
            <span className="font-bold text-lg">Experience:</span>
            <span className="font-semibold">{userdata.doctorExperience}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
