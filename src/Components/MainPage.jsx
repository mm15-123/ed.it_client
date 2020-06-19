import React, { useState, useEffect, useContext } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Content from './Content';
import UploadContent from './UploadContent';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import './MainPage.css';
import TextField from '@material-ui/core/TextField';
import { Container, Grid } from '@material-ui/core';
import SearchPage from './SearchPage'
import { GlobalContext } from '../Context/GlobalContext';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import ProfilePicture from '../uploadedFiles/shiftan92.jpg'
// import ProfilePicture2 from '../uploadedFiles/almog_levi.jpeg'
import User from './User';
import Graphs from './Graphs';
import UserProfile from './UserProfile';
import AdminPage from './AdminPage';
import axios from 'axios';
import UserTable from './UserTable';
import Holiday from './Holiday'

const useStyles = makeStyles((theme) => ({
    ProfileDiv: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(7),
            height: theme.spacing(7),

        },
        // display: 'inline-block',
        margin: '5px',
        fontWeight: 'bold',

    },
    ProfilePic: {
        width: '-webkit-fill-available',
        height: '-webkit-fill-available',

    },


}));


const MainPage = () => {
    const classes = useStyles();
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContentHoliday, setGlobalContentHoliday, RememberMe, setRememberMe] = useContext(GlobalContext);//מושך פרטי משתמש גלובליים ואת הנתיב לקבצים
    //let a = UrlPath + GlobalUser.UrlPicture
    console.log("From main page", GlobalUser)
    //const [RememberMe,setRememberMe]=useContext(GlobalContext);
    //console.log( localStorage.getItem('rememberMe')!==null ?localStorage.getItem('rememberMe') : 'somyhing wrong' )
   

      //יציאה מהמשתמש,אתחול לוקל_סטורג' אתחול גלובל_יוזר וגלובל_רממברמי
    const LogOut = () => {
        localStorage.setItem('rememberMe', false);
        localStorage.setItem('User', null)
        setRememberMe(false)
        setGlobalUser(null)
    }

    return (
        <div>
            <nav className="navbar" style={{ direction: 'rtl' }}>

                <ul >
                    <li >
                        <div> <NavLink to='/' exact >בית</NavLink></div>
                    </li>
                    <li >
                        {//GlobalUser == null &&
                            <NavLink to='/SignIn' style={{pointerEvents: GlobalUser == null ?"auto": "none"}} >התחבר</NavLink>}
                    </li>
                    <li >
                        {//GlobalUser == null &&
                            <NavLink to='/SignUp' style={{pointerEvents: GlobalUser == null ?"auto": "none"}} >הרשם</NavLink>}
                    </li>
                    <li >
                        {//GlobalUser !== null && 
                            <NavLink to='/UploadContent' style={{pointerEvents: GlobalUser !== null ?"auto": "none"}} >העלאת תוכן</NavLink>}
                    </li>
                    {/* <li className="logout">
                        {GlobalUser !== null && <NavLink to='/' onClick={LogOut}>התנתק</NavLink>}
                    </li>
                    <li className="textProfile">

                        {GlobalUser !== null && <NavLink to='/User' >{ GlobalUser.Name}</NavLink>}
                    </li> */}

                </ul>
                <div className={classes.ProfileDiv} >
                    <div className='userNav' style={{ width: 'auto' }}>
                        {GlobalUser !== null && <NavLink to='/User' >{GlobalUser.Name}</NavLink>} <span> | </span>
                        {GlobalUser !== null && <NavLink to='/' onClick={LogOut}>התנתק</NavLink>}
                    </div>
                    {GlobalUser !== null && <Link to='/User'>
                        <Avatar alt="Remy Sharp" src={UrlPath + GlobalUser.UrlPicture} className={classes.ProfilePic} />
                    </Link>}
                </div>
            </nav>

            <Switch>
                <Route path='/' exact component={SearchPage} />
                <Route path='/Content/:ContentID' component={Content} />
                <Route path='/SignIn' component={SignIn} />
                <Route path='/SignUp' component={SignUp} />
                <Route path='/UploadContent' component={UploadContent} />
                <Route path='/User' component={User} />
                <Route path='/Graphs/:UserName' component={Graphs} />
                <Route path='/UserProfile/:UserName' component={UserProfile}/>
                <Route path='/AdminPage' component={AdminPage}/>
                <Route path='/UserTable/:UserName' component={UserTable}/>
                <Route path='/Holiday' component={Holiday}/>
            </Switch>

        </div>
    )
}
export default MainPage