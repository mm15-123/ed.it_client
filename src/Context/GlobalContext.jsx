import React, { useState, createContext } from "react";

//הגדרת ניתוב לתיקייה 
let local=true;//לשנות בהתאם לסוג העבודה שלנו
let UrlPictures=''
let UrlFiles=''
if(local){
  UrlPictures=process.env.PUBLIC_URL + `uploadedPicturesPub/`//uploadedFilesPub למצגות
  UrlFiles=process.env.PUBLIC_URL + `uploadedFilesPub/`
}
else{
  UrlPictures=process.env.PUBLIC_URL + `uploadedPicturesPub/`;//לשים את הכתובת של השרת
  UrlFiles=process.env.PUBLIC_URL + `uploadedFilesPub/`
}

//שאיבת נתונים מלוקל סטורג
//שאיבת משתמש אם קיים בלוקל סטורג
const rememberMe = localStorage.getItem('rememberMe') === null ? false : localStorage.getItem('rememberMe');// === 'true'

const UserVar = rememberMe ? JSON.parse(localStorage.getItem('User')) : null;


console.log(rememberMe)
console.log(UserVar)


// Create Context Object
export const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalContextProvider = props => {
  const [GlobalUser, setGlobalUser] = useState(UserVar);//תשאיר ככה,זה פרטי יוזר כללי
  const [UrlPath,setUrlPath]=useState(UrlPictures)
  const [UrlPathFiles,setUrlPathFiles]=useState(UrlFiles)
  const [GlobalContent,setGlobalContent]=useState('')
  const [RememberMe, setRememberMe] = useState(rememberMe)
  console.log(GlobalUser)




  return (    
      <GlobalContext.Provider value={[GlobalUser, setGlobalUser,UrlPath,UrlPathFiles,GlobalContent,setGlobalContent, RememberMe, setRememberMe]}> 
      {props.children}
    </GlobalContext.Provider>

  );
};

