import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, withRouter, Switch, Route, Link } from "react-router-dom";
import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import UploadContent from './Components/UploadContent';
import Content from './Components/Content';
import styled from 'styled-components';

const AppWrapper = styled.div`
display:flex;
justify-content:center;
`
class App extends React.Component {
  state={
    selectedFile:null
  }

   fileSelectedHandler=event=>{
     this.setState({
       selectedFile:event.target.files[0]
     })
    // console.log(event.target.files[0]);
}

fileUpload=()=>{
  const apiUrl='http://localhost:55263/api/UploadContent/1'
  
  const formData = new FormData();
  formData.append('content1',this.state.selectedFile,this.state.selectedFile.name)
  fetch('http://localhost:55263/api/UploadContent/1', {
    method: 'post',
    contentType: false,
    processData: false,
    mode:'no-cors',
    body: formData
  })
  .then((response) => response.json())
  .then((result) => {
    console.log('Success:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}


  render() {
    
    const router = (
      <Router>
        <Navbar />
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
        <Navbar />
        {
          <AppWrapper>

            {/* <SignIn />
            <SignUp />
            <UploadContent /> */}
            {/* <Content /> */}
            <input type="file" onChange={this.fileSelectedHandler}></input>
            <button onClick={this.fileUpload}>upload</button>
          </AppWrapper>

        }
      </div>
    );
  }
}
export default App;
