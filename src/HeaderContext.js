import { createContext, useContext, useState } from "react";

const HeaderContext = createContext();

export function HeaderProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <HeaderContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}
