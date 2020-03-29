import React, { useState,useEffect,useContext} from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Content from './Content';
import UploadContent from './UploadContent';
import { Route, Link, NavLink } from 'react-router-dom';
import './MainPage.css';
import TextField from '@material-ui/core/TextField';
import { Container, Grid } from '@material-ui/core';
import SearchPage from './SearchPage'
import { GlobalContext } from '../Context/GlobalContext';


const MainPage = () => {
    const {userID,setuserID} = useContext(GlobalContext);//חייב אותם שמות בconst
    console.log(userID)
    setuserID(1);//מעדכן משתנה גלובלי
    console.log(userID)

    //useEffect(()=>console.log('begin to start'),[ShowPic])

    return (
        <div>
            <nav className="navbar">
                
                <ul >
                <li >
                        <NavLink to='/' exact>HOME</NavLink>
                    </li>
                    <li >
                        <NavLink to='/SignIn'>Sign In</NavLink>
                    </li>
                    <li >
                        <NavLink to='/SignUp'>Sign Up</NavLink>
                    </li>
                    <li >
                        <NavLink to='/UploadContent'>Upload Content</NavLink>
                    </li>
                </ul>
            </nav> 
            <Route path='/' exact component={SearchPage}/>
            <Route path='/Content' component={Content} />
            <Route path='/SignIn' component={SignIn} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/UploadContent' component={UploadContent} />
        </div>
        
    )
}
export default MainPage