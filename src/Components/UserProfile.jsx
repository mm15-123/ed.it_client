import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import './User.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Button, Container, CssBaseline, Typography, Grid, TextField, Select, MenuItem, Input, CardContent } from '@material-ui/core';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Paper from '@material-ui/core/Paper';
import FaceSharpIcon from '@material-ui/icons/FaceSharp';
import CardContentt from './CardContent';
import Slider from 'react-slick';
import './MainPage.css';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const UserProfile = (props) => {
    console.log(props)
    const classes = useStyles();
    const [UserName, setUserName] = useState(props.match.params.UserName)
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContentHoliday, setGlobalContentHoliday, RememberMe, setRememberMe] = useContext(GlobalContext);
    const [UserDetails, setUserDetails] = useState('')
    const [UserContent,setUserContent]=useState('')

    useEffect(() => {       
        async function GetUserProfile() {
            const response = await fetch(`${Server_Url}User/GetUserProfile/${UserName}`)
            console.log(`${Server_Url}User/GetUserProfile/${UserName}`)
            const result = await response.json()
            console.log('USer Profile', result)
            setUserDetails(result)
        }
        async function GetUserContent(){
            const response = await fetch(`${Server_Url}/Content/GetUserContents/${UserName}`)
            const result = await response.json()
            console.log('USer Content', result)
            setUserContent(result)
        }
        GetUserProfile()
        GetUserContent()
    }, [])

    return (

        <div className="UserBody">
            {UserDetails !== '' &&
                <Grid container spacing={2} >
                    <Grid item sm={4} spacing={2} direction="column" justify="flex-start" >
                        <Typography component="h3" variant="h5" >פרופיל משתמש</Typography>
                        <Paper className={classes.paper}>
                            <Typography component="h3" variant="h5" >{UserDetails.Name}</Typography>
                            <Avatar className={classes.large}
                                src={UrlPath + UserDetails.UrlPicture} />
                            <h3>{UserDetails.Email}</h3>
                        </Paper>
                    </Grid>


                    <Grid item sm={4} spacing={2} justify="flex-start" direction="column">
                        <Typography component="h3" variant="h5" >פרטים אישיים</Typography>
                        <Paper className={classes.paper}>
                            <Typography component="h3" variant="h5" >{UserDetails.SchoolType}</Typography>
                            <Typography component="h3" variant="h5" >{UserDetails.TeacherType}</Typography>
                            <Typography component="h3" variant="h5" >{UserDetails.BDate.split(' ', 1)}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={4} justify="flex-start">
                        <Typography component="h3" variant="h5" >קצת על עצמי</Typography>
                        <Paper className={classes.paper}>
                            <Typography component="h3" variant="h5" >{UserDetails.AboutMe}</Typography>
                        </Paper>
                    </Grid>

                </Grid>}
            <Grid item sm={12}>
                <Slider
                    speed={500}
                    slidesToShow={4}
                    slidesToScrol={1}
                    infinite={false}
                    dots={true}
                    arrows={true}
                    rtl={false}
                >
                    {UserContent !== '' &&
                        UserContent.map((content, index) =>
                            <div className='contentStyle' key={index}>
                                <CardContentt content={content.ContentName} content={content.ContentName} Description={content.Description} ID={content.ContentID} PathFile={content.PathFile} UserPic={content.UserPic}></CardContentt>
                                {console.log(content)}
                            </div>)
                    }
                </Slider>
            </Grid>

        </div>

    );
}

export default UserProfile;