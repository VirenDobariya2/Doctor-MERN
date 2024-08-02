import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminLogOut = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, [])

  const  handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false)
    navigate("/")
  }
  return (
    <div>
   {isLoggedIn ? (
        <button onClick={handleLogout} className= " group block border border-black bg-red-500 hover:bg-red-600 hover:ring-red-600  text-slate-900 group-hover:text-white px-10 py-3 rounded font-bold ">
          LogOut
        </button>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  )
}

export default AdminLogOut
