import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Ragister from "./pages/register";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";
import Deshboard from "./pages/doctor/Deshboard";
import Appoinment from "./components/Appoinment";
import Connect from "./components/Connect";
import { ContextProvider } from "./components/context/Context";
import Department from "./components/Department";
import About from "./components/About";
import Service from "./components/Service";
import AdminUser from "./admin/AdminUser";
import Inbox from "./components/doctor/Inbox";
import PublicRoutes from "./PublicRoutes";

const App = () => {
  return (
    <>
      <ContextProvider>
        <Router>
          <Routes>
           
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Ragister />}></Route>
           

            {/* is Protect */}
            {/* User Side Pages */}
            <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/appoinment" element={<Appoinment />}></Route>
              <Route path="/department" element={<Department />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/service" element={<Service />}></Route>
              <Route path="/connect" element={<Connect />}></Route>
            </Route>



            {/* doctor side pages */}
            
            <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
              <Route path="/deshboard" element={<Deshboard />} />
              <Route path="/inbox" element={<Inbox/>} />
            </Route>

            {/* admin page */}

            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<AdminUser />} />
            </Route>
          </Routes>
        </Router>
      </ContextProvider>
    </>
  );
};

export default App;
