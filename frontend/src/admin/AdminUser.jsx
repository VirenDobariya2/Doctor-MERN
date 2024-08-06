import { useState } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { IoPower } from "react-icons/io5";
import Home from "./AdminHome";
import AdminLogOut from "./AdminLogOut";
import DoctorData from "./DoctorData";

const AdminUser = () => {
  const [adminView, setAdminView] = useState("home");

  const AdminMenu = [
    { name: "Home", path: "adminhome", icon: AiTwotoneHome },
    { name: "Doctor", path: "doctor", icon: FaUserDoctor },
    { name: "Log Out", path: "logout", icon: IoPower },
  ];

  const renderView = () => {
    switch (adminView) {
      case "home":
        return <Home />;
        case "doctor":
          return <DoctorData/>
        case "logout":
          return <AdminLogOut/>;
      default:
        return <Home />;
    }
  };
  return (
    <div>
      <div
        id="cta-button-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-300 dark:bg-gray-800">
          <h1 className="font-bold text-center m-5 text-4xl">Admin</h1>
          <ul className="space-y-2 font-medium">
            {AdminMenu.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => setAdminView(item.path)}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <item.icon className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ms-3">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="ml-64 p-4">{renderView()}</div>
    </div>
  );
};

export default AdminUser;

//  import { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminUser = () => {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get('/api/admin/get-pending-doctors', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setDoctors(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   const handleApprove = async (doctorId) => {
//     try {
//       await axios.post('/api/admin/approve-doctor', { doctorId }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleReject = async (doctorId) => {
//     try {
//       await axios.post('/api/admin/reject-doctor', { doctorId }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setDoctors(doctors.filter((doctor) => doctor.id !== doctorId));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h1>Pending Doctors</h1>
//       <ul>
//         {doctors.map((doctor) => (
//           <li key={doctor.id}>
//             {doctor.name} - {doctor.doctorField}
//             <button onClick={() => handleApprove(doctor.id)}>Approve</button>
//             <button onClick={() => handleReject(doctor.id)}>Reject</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminUser;
