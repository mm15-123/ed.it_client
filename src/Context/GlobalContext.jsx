import React, { useState, createContext } from "react";
 // 
//הגדרת ניתוב לתיקייה 
const local = true;//לשנות בהתאם לסוג העבודה שלנו
// add to package.json when deploy -- "homepage":"/igroup20/prod/Client/",
let UrlPictures = ''
let UrlFiles = ''
let UrlServer = ''
if (local) {
  UrlPictures = process.env.PUBLIC_URL + `/uploadedPicturesPub/`//uploadedFilesPub למצגות
  UrlFiles = process.env.PUBLIC_URL + `/uploadedFilesPub/`
  UrlServer = `http://localhost:55263/api/`
}
else {
  UrlPictures = `http://proj.ruppin.ac.il/igroup20/prod/uploadedPictures/`;//לשים את הכתובת של השרת
  UrlFiles = `http://proj.ruppin.ac.il/igroup20/prod/uploadedContents/`
  UrlServer = `http://proj.ruppin.ac.il/igroup20/prod/api/`
}

//שאיבת נתונים מלוקל סטורג
//שאיבת משתמש אם קיים בלוקל סטורג
const rememberMe = localStorage.getItem('rememberMe') === null ? false : localStorage.getItem('rememberMe');// === 'true'
let UserVar = null
try {
  UserVar = rememberMe ? JSON.parse(localStorage.getItem('User')) : null;
} catch (err) {
  console.error(err);
}

console.log(rememberMe)
console.log(UserVar)

// Create Context Object
export const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalContextProvider = props => {

  const [GlobalUser, setGlobalUser] = useState(UserVar);//תשאיר ככה,זה פרטי יוזר כללי
  const [UrlPath, setUrlPath] = useState(UrlPictures)
  const [UrlPathFiles, setUrlPathFiles] = useState(UrlFiles)
  const [Server_Url, setServer_Url] = useState(UrlServer)
  const [GlobalContent, setGlobalContent] = useState('')
  const [RememberMe, setRememberMe] = useState(rememberMe)
  console.log('process.env.PUBLIC_URL', process.env.PUBLIC_URL)
  console.log(GlobalUser)
  console.log('UrlPictures', UrlPictures)
  console.log('UrlFiles', UrlFiles)



  return (
    <GlobalContext.Provider value={[GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContent, setGlobalContent, RememberMe, setRememberMe]}>
      {props.children}
    </GlobalContext.Provider>

  );
};

