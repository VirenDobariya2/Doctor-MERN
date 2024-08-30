import { useContext, useEffect, useState } from 'react';
import DepartmentCard from '../components/DepartmentCard';
import axios from 'axios';
import { AppContext } from './context/Context';

const Department = () => {
  const { setAllData, allData } = useContext(AppContext);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDoctor();
  }, []);

  const getDoctor = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/doctors/doctor-data/?data=approved`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      const doctors = response.data;

      // Update allData in the context
      setAllData({
        departments: doctors,
        doctors: doctors,
      });

      // Filter departments with status 'approved'
      setDepartments(doctors.filter(department => department.status === 'approved'));
    } catch (error) {
      toast.error("Failed to fetch doctors");
    }
  };

  return (
    <div className="p-4" id='userDepartment'>
      <h2 className="text-4xl text-center font-bold mb-8 mt-10 uppercase">Doctors</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {departments.map(department => (
          <DepartmentCard key={department._id} department={department} />
        ))}
      </div>
    </div>
  );
};

export default Department;
