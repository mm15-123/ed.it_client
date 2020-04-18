import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './Components/MainPage';
//import Navbar from './Components/Navbar';
import { BrowserRouter } from "react-router-dom";
import {GlobalContextProvider} from './Context/GlobalContext'
import { Route, Link, NavLink,Switch } from 'react-router-dom';
// import SignIn from './Components/SignIn';
// import SignUp from './Components/SignUp';
// import Content from './Components/Content';
// import UploadContent from './Components/UploadContent';
import SearchPage from './Components/SearchPage';
// import User from './Components/User';

class App extends React.Component {

  render() {


    return (
        <div className="App">
          <GlobalContextProvider>
            <MainPage />
          </GlobalContextProvider>
        </div>
    );
  }
}
export default App;
