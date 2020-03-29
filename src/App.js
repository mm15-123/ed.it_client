import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './Components/MainPage';
//import Navbar from './Components/Navbar';
import { BrowserRouter } from "react-router-dom";
import {GlobalContextProvider} from './Context/GlobalContext'

//import SignIn from './Components/SignIn';
//import SignUp from './Components/SignUp';
//import UploadContent from './Components/UploadContent';
//import Content from './Components/Content';
//import styled from 'styled-components';

/*const AppWrapper = styled.div`
display:flex;
justify-content:center;
`*/
class App extends React.Component {

  render() {


    return (
      <BrowserRouter>
        <div className="App">
          <GlobalContextProvider>
            <MainPage />
          </GlobalContextProvider>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
