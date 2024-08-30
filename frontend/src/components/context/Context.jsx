import { createContext, useState } from "react";

// Create the context
const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [allData, setAllData] = useState({ departments: [], doctors: [] });

  return (
    <AppContext.Provider
      value={{
        allData,
        setAllData,
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
