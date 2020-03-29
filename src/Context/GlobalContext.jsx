import React, { useState, createContext } from "react";

// Create Context Object
export const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalContextProvider = props => {
  const [userID, setuserID] = useState(0);

  return (
    <GlobalContext.Provider value={{userID, setuserID:setuserID}}> 
      {props.children}
    </GlobalContext.Provider>
  );
};

// import React ,{createContext,Component} from 'react';  

// export const ThemeContext=createContext();

// class ThemeContextProvider extends Component {
//     state = {
//         UserId:'111'
//      }
//     render() { 
//         return ( 
//             <ThemeContext.Provider value={{...this.state}}>
//                 {this.props.children}
//             </ThemeContext.Provider>
//          );
//     }
// }
 
// export default ThemeContextProvider ;