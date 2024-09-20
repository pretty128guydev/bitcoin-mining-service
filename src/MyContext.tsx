import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the types for our context
interface MyContextType {
  mybalance: number;
  setMybalance: (value: number) => void;
  myunreadmessage: number;
  setMyunreadmessages: (value: number) => void;
}

// Create the context with default values
export const MyContext = createContext<MyContextType>({
  mybalance: 0,
  setMybalance: () => {}, // Placeholder function
  myunreadmessage: 0,
  setMyunreadmessages: () => {}, // Placeholder function
});

// Create a provider component with props type
interface MyProviderProps {
  children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [mybalance, setMybalance] = useState<number>(0);
  const [myunreadmessage, setMyunreadmessages] = useState<number>(0);

  return (
    <MyContext.Provider
      value={{ mybalance, setMybalance, myunreadmessage, setMyunreadmessages }}
    >
      {children}
    </MyContext.Provider>
  );
};
