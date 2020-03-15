import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router,withRouter,Switch,Route,Link} from "react-router-dom";
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import MainPage from './Components/MainPage';
import UploadContent from './Components/UploadContent';

class App extends React.Component {
 
  render(){
    const router =(
      <Router>
        <Navbar/>
      <Link to='/'></Link>
      <Switch>
        <Route exact path="/">   
        </Route>
        <Route path='/signin'>
          <SignIn />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
      </Switch>
      </Router>

    )
  return (
    <div className="App">
     <Navbar/>
     {
       //<SignUp/>
     <UploadContent/>
     }
    </div>
  );
}
}
export default App;
