import { useEffect, useState } from 'react';
import DepartmentCard from '../components/DepartmentCard';
import axios from 'axios';


const Department = () => {

  const [departments, setDepartments] = useState([]);

  // useEffect(() => {
  //   const fetchDepartments = async () => {
  //     try {
  //       const response = await axios.get('/api/register', {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       });
  //       setDepartments(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchDepartments();
  // }, []);




  return (
    <div className="p-4" id='userDepartment'>
      <h2 className="text-4xl text-center font-bold mb-8 mt-10 uppercase">Doctors</h2>
      <div className="flex flex-wrap justify-center gap-10">
        {departments.filter(department => department.status === 'approved').map(department => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>
    </div>
  );
};

export default Department;
