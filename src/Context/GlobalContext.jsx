import React, { useState, createContext } from "react";

//הגדרת ניתוב לתיקייה 
let local=true;//לשנות בהתאם לסוג העבודה שלנו
let Url=''
if(local){
  Url=process.env.PUBLIC_URL + `uploadedPicturesPub/`//uploadedFilesPub למצגות
}
else{
  Url=process.env.PUBLIC_URL + `uploadedPicturesPub/`;//לשים את הכתובת של השרת
}

// Create Context Object
export const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalContextProvider = props => {
  const [GlobalUser, setGlobalUser] = useState('');//תשאיר ככה,זה פרטי יוזר כללי
  const [UrlPath,setUrlPath]=useState(Url)
  const [RememberMe,setRememberMe]=useState(false)
  console.log(UrlPath)

  //שאיבת משתמש אם קיים בלוקל סטורג
  //setRememberMe( (typeof localStorage.getItem('rememberMe')!=='undefined' && localStorage.getItem('rememberMe')!==null)? localStorage.getItem('rememberMe') : false);// === 'true'
  //setGlobalUser(RememberMe ? localStorage.getItem('User') : '');


  
  return (
    
      <GlobalContext.Provider value={[GlobalUser, setGlobalUser,UrlPath,RememberMe,setRememberMe]}> 
      {props.children}
    </GlobalContext.Provider>
  
  );
};

{// const [GlobalUserName, setGlobalUserName] = useState('');
  //<GlobalContext.Provider value={{GlobalUserName: GlobalUserName, setGlobalUserName:setGlobalUserName}}>
 }