import React, { createContext, useMemo, useState } from "react";

export const DashboardContext = createContext();

const ComponentContextProvier = ({ children }) => {
  const [component, setComponent] = useState("Products");

  const value = useMemo(
    () => ({
      component,
      setComponent,
    }),
    [component]
  );
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
export default ComponentContextProvier;
