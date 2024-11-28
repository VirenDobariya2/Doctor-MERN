import axios from "axios";
import { useEffect, useState } from "react";
import { FaUpload, FaRegEdit, FaSave } from "react-icons/fa";
import instance from "../../axiosINstance/axiosInstance";


const Profile = () => {
  const [doctordata, setDoctorData] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFirstUpload, setIsFirstUpload] = useState(true);
  const [isDataEditMode, setIsDataEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  const getUser = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await instance({
        url: "users/get-user-info-by-id",
        method: "GET",
      }
      );
      const userData = response.data.data;
      setDoctorData(userData);
      // if (userData.profilePic) setPreview(userData.profilePic);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadProfilePic = async () => {
    if (!profilePic) return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profilePic", profilePic);

    try {
      const response = await instance({
        url: "doctors/upload-profile-pic",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const userData = response.data.data;
      setDoctorData(userData);
      setPreview(null)

      setProfilePic(null);
      setIsFirstUpload(false);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const saveProfileData = async () => {
    if (profilePic) await uploadProfilePic();
    const token = localStorage.getItem("token");

    try {
      const response = await instance(
        {
          url: "doctors/update-user-info",
          method: "PUT",
          data: editData
        }
      );
      setDoctorData(response.data.data);
      setIsDataEditMode(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-4">Profile</h1>
      {doctordata && (
        <div className="space-y-2">
          <div className="flex justify-center mb-4">
            <div className="mt-4 relative">
              {/* Photo upload ..................................................... */}
              {doctordata.profilePic || preview ? ( 
                <div
                  className="relative group"
                  onMouseEnter={() => setIsEditMode(true)}
                  onMouseLeave={() => setIsEditMode(false)}
                >
                  {console.log('preview',preview)}
                 {preview ?( <img
                    src={preview}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />):
                  (<img
                  src={`https://localhost:3000${doctordata.profilePic}`}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover"
                />)
                }
                 
                  {isEditMode && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                      <FaRegEdit className="text-white text-2xl" />
                      <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <span className="text-white mt-11 mr-1 ">Edit</span>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              ) : (
                isFirstUpload && (
                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <FaUpload className="text-blue-500" />
                      <span className="text-blue-500">Upload Profile Picture</span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="space-y-2">

              {/* Edit The Data Option................................................... */}
            {isDataEditMode ? (
              <>
                {["firstName", "lastName", "doctorField", "doctorExperience"].map((field) => (
                  <div key={field} className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
                    <span className="font-bold text-lg capitalize">{field.replace(/([A-Z])/g, ' $1')}:</span>
                    <input
                      type="text"
                      name={field}
                      value={editData[field] || ""}
                      onChange={handleInputChange}
                      className="font-semibold border-b-2 border-gray-300"
                    />
                  </div>
                ))}
                <button onClick={saveProfileData} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                  <FaSave className="inline-block mr-2" />
                  Save
                </button>
              </>
            ) : (
              // All Data Show the Profile ...........................................................
              <>
                {["role", "firstName", "lastName", "email", "gender", "number", "doctorField", "doctorExperience"].map((field) => (
                  <div key={field} className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
                    <span className="font-bold text-lg capitalize">{field.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-semibold">{doctordata[field]}</span>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setIsDataEditMode(true);
                    setEditData({
                      firstName: doctordata.firstName,
                      lastName: doctordata.lastName,
                      doctorField: doctordata.doctorField,
                      doctorExperience: doctordata.doctorExperience,
                    });
                  }}
                  className="bg-blue-500 text-white py-3 px-5 rounded-md"
                >
                  <FaRegEdit className="inline-block mr-2" />
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
