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
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ProfilePicture from '../uploadedFiles/shiftan92.jpg'
import ProfilePicture2 from '../uploadedFiles/almog_levi.jpeg'
import User from './User'

const useStyles = makeStyles((theme) => ({
    ProfileDiv: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    },
    ProfilePic: {
        left: '126%',
        position: 'relative',
    },


}));

const MainPage = () => {
    const classes = useStyles();
    const [GlobalUser, setGlobalUser] = useContext(GlobalContext);
    //const {GlobalUserName, setGlobalUserName} = useContext(GlobalContext);//חייב אותם שמות בconst
    console.log(GlobalUser)

    // setGlobalUserName('hadar');//מעדכן משתנה גלובלי
    // console.log(GlobalUserName)

    //useEffect(()=>console.log('begin to start'),[ShowPic])

    return (
        <div>
            <nav className="navbar">

                <ul >
                    <li >
                       <div> <NavLink to='/' exact>HOME</NavLink></div>
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
                    <li className="logout">
                        <NavLink to='/User'>Log Out |</NavLink>
                    </li>
                    <li className="textProfile">
                        <NavLink to='/User'>{GlobalUser.Name}</NavLink>
                    </li>
                    {/* <li> */}
                   
                    {/* </li> */}
                </ul>
                <div className={classes.ProfileDiv}>
                    <Link to='/User'>
                    <Avatar alt="Remy Sharp" src={ProfilePicture} className={classes.ProfilePic} />
                    </Link>
                </div>
               
            </nav> 
            <Route path='/' exact component={SearchPage}/>
            <Route path='/Content' component={Content} />
            <Route path='/SignIn' component={SignIn} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/UploadContent' component={UploadContent} />
            <Route path='/User' component={User} />
              

        </div>
    )
}
export default MainPage