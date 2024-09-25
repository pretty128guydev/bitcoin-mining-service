import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for our context
interface MyContextType {
  mybalance: number;
  setMybalance: (value: number) => void;
  myunreadmessage: number;
  setMyunreadmessages: (value: number) => void;
  package_remain: number;
  setpackage_remain: (value: number) => void;
  selectedMenu: string;
  setSelectedMenu: (data: any) => void
  package_status: string;
  setpackage_status: (data: any) => void
  package_role: string;
  setpackage_role: (data: any) => void
}

// Create the context with default values
export const MyContext = createContext<MyContextType>({
  mybalance: 0,
  setMybalance: () => { }, // Placeholder function
  package_remain: 0,
  setpackage_remain: () => { }, // Placeholder function
  myunreadmessage: 0,
  setMyunreadmessages: () => { }, // Placeholder function
  package_status: "",
  setpackage_status: () => { }, // Placeholder function
  selectedMenu: "news",
  setSelectedMenu: () => { },
  package_role: "",
  setpackage_role: () => { }
});

// Create a provider component with props type
interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [mybalance, setMybalance] = useState<number>(0);
  const [myunreadmessage, setMyunreadmessages] = useState<number>(0);
  const [package_remain, setpackage_remain] = useState<number>(0);
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [package_status, setpackage_status] = useState<string>("");
  const [package_role, setpackage_role] = useState<string>("");

  return (
    <MyContext.Provider
      value={{ mybalance, setMybalance, myunreadmessage, setMyunreadmessages, selectedMenu, setSelectedMenu, package_role, setpackage_role, package_status, setpackage_status, package_remain, setpackage_remain }}
    >
      {children}
    </MyContext.Provider>
  );
};
