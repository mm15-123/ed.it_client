import React, { useState } from 'react';
//import './NavbarStyle.css'; 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BrowserRouter as Router, withRouter, Switch, Route, Link } from "react-router-dom";


const Navbar = () => {

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();
    //const [toggle, usetoggle]= useState(false)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Ed.it
                </Typography>
                <Router>
                <Link to={'/signin'}>
                        <Button color="inherit">
                        SignIn
                    </Button>
                    </Link>
                </Router>
                <Router>
                    <Link to={'/signup'}>
                        <Button color="inherit">
                            SignUp
                    </Button>
                    </Link>
                    </Router>
                    <Button color="inherit">
                        New content
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );

}

export default Navbar;