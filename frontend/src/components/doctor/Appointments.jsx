import axios from "axios";
import { useEffect, useState } from "react";


const Appoinments = () => {
  const [appoinmentdata, setAppoinmentdata] = useState(null);

  const getUser = async () => {

    const token = localStorage.getItem("token");

    const appoinments = await axios.get(
      "http://localhost:3000/api/appoinment/appoinment-data",
      { headers: { authorization: token } }
    );
    console.log(appoinments)

    setAppoinmentdata(appoinments.data.appointments);
  };

  useEffect(() => {
    if (!appoinmentdata) getUser();
  }, [appoinmentdata]);


  return (
    <div>
    appoimtr
    </div>
  )
}

export default Appoinments
