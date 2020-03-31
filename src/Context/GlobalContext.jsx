import React, { useState, createContext } from "react";

// Create Context Object
export const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalContextProvider = props => {
  const [GlobalUserEmail, setGlobalUserEmail] = useState('');

  return (
    
      <GlobalContext.Provider value={[GlobalUserEmail, setGlobalUserEmail]}> 
      {props.children}
    </GlobalContext.Provider>
  
  );
};

{// const [GlobalUserName, setGlobalUserName] = useState('');
  //<GlobalContext.Provider value={{GlobalUserName: GlobalUserName, setGlobalUserName:setGlobalUserName}}>
 }