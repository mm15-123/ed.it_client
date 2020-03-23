import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Content from './Content';
import UploadContent from './UploadContent';
import { Route, NavLink } from 'react-router-dom';
import './MainPage.css';


const MainPage = () => {

    

    return (
        <div>
            <nav className="navbar">
                <ul >
                    <li >
                        <NavLink   to='/' exact>Content</NavLink>
                    </li>
                    <li >
                        <NavLink   to='/SignIn'>Sign In</NavLink>
                    </li>
                    <li >
                        <NavLink   to='/SignUp'>Sign Up</NavLink>
                    </li>
                    <li >
                        <NavLink   to='/UploadContent'>Upload Content</NavLink>
                    </li>
                </ul>
            </nav>

            <Route path='/' exact component={Content} />
            <Route path='/SignIn' component={SignIn} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/UploadContent' component={UploadContent} />
        </div>
    )
}
export default MainPage