import { createContext, useState } from "react";

// Create the context
const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [allDoctors, setAllDoctors] = useState("");

  return (
    <AppContext.Provider
      value={{
        allDoctors,
        setAllDoctors,
        selectedDepartment,
        setSelectedDepartment,
        selectedDoctor,
        setSelectedDoctor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { ContextProvider, AppContext };
