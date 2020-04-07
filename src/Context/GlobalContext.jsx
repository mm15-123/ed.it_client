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


//שאיבת נתונים מלוקל סטורג
 //שאיבת משתמש אם קיים בלוקל סטורג
 const rememberMe = localStorage.getItem('rememberMe');// === 'true'
 const UserVar = rememberMe ? JSON.parse(localStorage.getItem('User'))  : '';
 
 console.log(rememberMe)
 console.log(UserVar)


// Create Context Object
export const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalContextProvider = props => {
  const [GlobalUser, setGlobalUser] = useState(UserVar);//תשאיר ככה,זה פרטי יוזר כללי
  const [UrlPath,setUrlPath]=useState(Url)
  console.log(GlobalUser)


  
  return (
    
      <GlobalContext.Provider value={[GlobalUser, setGlobalUser,UrlPath]}> 
      {props.children}
    </GlobalContext.Provider>
  
  );
};

{// const [GlobalUserName, setGlobalUserName] = useState('');
  //<GlobalContext.Provider value={{GlobalUserName: GlobalUserName, setGlobalUserName:setGlobalUserName}}>
 }