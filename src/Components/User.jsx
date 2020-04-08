import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import './User.css'
import ProfilePicture2 from '../uploadedFiles/almog_levi.jpeg'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Button, Container, CssBaseline, Typography, Grid, TextField, Select, MenuItem } from '@material-ui/core';

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
        width: theme.spacing(22),
        height: theme.spacing(20),
    },
}));

const User = () => {
    const classes = useStyles();
    const [GlobalUser, setGlobalUser] = useContext(GlobalContext);
    const [Edit, setEdit] = useState(false)

    const [Name, setName] = useState(GlobalUser.Name)
    const [Password, setPassword] = useState(GlobalUser.Password)
    const [TeacherType, setTeacherType] = useState(GlobalUser.TeacherType)
    const [BDate, setBDate] = useState(GlobalUser.BDate)
    const [SchoolType, setSchoolType] = useState(GlobalUser.SchoolType)
    const [AboutMe, setAboutMe] = useState(GlobalUser.AboutMe)

    useEffect(() => {
        const BirthDate = GlobalUser.BDate.split(' ')[0].split('/')
        const DateFromat = BirthDate[2] + '-' + BirthDate[1] + '-' + BirthDate[0]
        setBDate(DateFromat)
        console.log(DateFromat)
    }, [])

    const changestate = () => {
        setEdit(!Edit)
    }

    const UpdateDetails = () => {
        const NewUSer = {
            'Name': Name,
            'Password': Password,
            'Email':GlobalUser.Email,
            'TeacherType': TeacherType,
            'BDate': BDate,
            'SchoolType': SchoolType,
            'AboutMe': AboutMe,
            'UrlPicture': GlobalUser.UrlPicture,
            'FormDataPic': GlobalUser.FormDataPic,
            'ContentsUser': GlobalUser.ContentsUser,
            'TagsUser': GlobalUser.TagsUser,
            'Subjects': GlobalUser.Subjects,
            'TagsScore': GlobalUser.TagsScore
        }
        console.log('New USer ', NewUSer)
        setGlobalUser(NewUSer)
        console.log(GlobalUser)

        const apiUrl = 'http://localhost:55263/api/User/UpdateUser';
        fetch(apiUrl, {
            method: 'PUT',
            body: JSON.stringify(NewUSer),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then((result) => {
                console.log('Success:', result);
            })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <div className='UserBody'>
            <div className='MainDetails'>
                <div>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div>
                            <Typography component="h1" variant="h5" >דף פרופיל אישי</Typography>
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <td>
                                        <h2>{GlobalUser.Name}</h2>
                                        {<Avatar className={classes.large} src={ProfilePicture2} />}
                                    </td>
                                    <td >
                                        <tr>
                                            <td><h3>מייל:</h3></td>
                                            <td><h3>{GlobalUser.Email}</h3></td>
                                        </tr>
                                        <tr>
                                            <td><h3>מלמד ב:</h3></td>
                                            <td><h3>{GlobalUser.SchoolType}</h3></td>
                                        </tr>
                                        <tr>
                                            <td><h3>מורה ל:</h3></td>
                                            <td><h3>{GlobalUser.TeacherType}</h3></td>
                                        </tr>
                                        <tr>
                                            <td><h3>תאריך יום הולדת:</h3></td>
                                            {<td>
                                                <h3>{GlobalUser.BDate.split(' ')[0]}</h3>
                                            </td>}
                                        </tr>
                                    </td>
                                </tr>
                            </table>
                            {<Button
                                variant="contained"
                                //color="primary"           
                                onClick={changestate}>ערוך פרטים</Button>}
                        </div>
                    </Container>
                </div>
                <div >
                    <h3>קצת על עצמי: </h3>
                    <h3>{GlobalUser.AboutMe}</h3>
                </div>
            </div>

            {Edit &&
                <div>
                    <Grid container className={classes.root} spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        defaultValue={GlobalUser.Name}
                                        required
                                        //fullWidth
                                        name="Name"
                                        label="שם"
                                        id="Name"
                                        autoComplete="Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        type='password'
                                        defaultValue={GlobalUser.Password}
                                        //required
                                        //fullWidth
                                        name="password"
                                        label="סיסמה"
                                        id="password"
                                        autoComplete="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <label style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>סוג בית ספר</label>
                                    <Select
                                        labelId="SchoolType"
                                        defaultValue={GlobalUser.SchoolType}
                                        id="SchoolType"
                                        fullWidth
                                        //value={SchoolType}
                                        //required
                                        onChange={(e) => setSchoolType(e.target.value)}
                                    >
                                        <MenuItem value="יסודי">יסודי</MenuItem>
                                        <MenuItem value="חטיבת ביניים">חטיבת ביניים</MenuItem>
                                        <MenuItem value="חטיבה עליונה">חטיבה עליונה - תיכון</MenuItem>
                                    </Select>
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        defaultValue={GlobalUser.TeacherType}
                                        //required
                                        //fullWidth
                                        name="TeacherType"
                                        label="מקצועות לימוד"
                                        id="TeacherType"
                                        autoComplete="TeacherType"
                                        onChange={(e) => setTeacherType(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        variant="outlined"
                                        id="BDate"
                                        label="Birthday"
                                        fullWidth
                                        type="date"
                                        defaultValue={BDate}
                                        //className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => setBDate(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={9} >
                                    <TextField
                                        id="outlined-multiline-static"
                                        fullWidth
                                        label="קצת על עצמי"
                                        multiline
                                        rows="4"
                                        defaultValue={GlobalUser.AboutMe}
                                        variant="outlined"
                                        onChange={(e) => setAboutMe(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {<div><Button
                        variant="contained"
                        onClick={UpdateDetails}>בצע שינוי</Button>
                        <Button
                        variant="contained"
                        onClick={changestate}>חזור</Button></div>}
                </div>}
        </div>
    );

}

export default User;