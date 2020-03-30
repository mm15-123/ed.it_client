import React, { useState, createContext } from "react";

// Create Context Object
export const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalContextProvider = props => {
  const [GlobalUserName, setGlobalUserName] = useState('');

  return (
    <GlobalContext.Provider value={{GlobalUserName: GlobalUserName, setGlobalUserName:setGlobalUserName}}> 
      {props.children}
    </GlobalContext.Provider>
  );
};

