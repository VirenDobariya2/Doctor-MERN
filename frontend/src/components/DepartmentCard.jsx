import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./context/Context";

const DepartmentCard = ({ department }) => {
  const { setSelectedDepartment, setSelectedDoctor } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSelected = () => {
    setSelectedDepartment(department.doctorField);
    setSelectedDoctor(department.firstName);
    navigate("/appoinment", {
      state: { doctor: department.firstName, doctorField: department.doctorField }
    });
  };

  return (
    <div className="w-80 max-w-xs md:max-w-sm lg:max-w-md bg-white shadow-lg rounded-lg overflow-hidden m-7">
      <img
        src={`https://localhost:3000${department.profilePic}`}
        alt={department.firstName}
        className="w-full h-36 object-cover md:h-48 lg:h-64"
      />
      <div className="p-4 text-center">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">
          {department.firstName}
        </h3>
        <h2 className="text-lg font-semibold mb-2">
          {department.doctorField}
        </h2>
        <p className="text-gray-700 mb-4 text-sm lg:text-lg text-left ml-5">
          Experience: {department.doctorExperience}
        </p>
        <button
          type="button"
          onClick={handleSelected}
          className="border hover:scale-95 duration-300 relative group cursor-pointer text-gray-800 overflow-hidden h-16 w-72 rounded-md bg-blue-300 p-2 flex justify-center items-center font-extrabold"
        >
          <p className="z-40">Book Appointment</p>
        </button>
      </div>
    </div>
  );
};

export default DepartmentCard;
