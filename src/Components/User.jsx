import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../Context/GlobalContext';
import './User.css'
import ProfilePicture2 from '../uploadedFiles/almog_levi.jpeg'
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

class Popup extends React.Component {
    render() {
        return (

            <div className='popup'>
                <div className='popup_inner'>
                    <Container>
                        <h1>{this.props.text}</h1>

                        <input type='file' onChange={this.props.KeepPath} />
                        <button onClick={this.props.ChangePic}>החלף תמונה</button>
                        <button onClick={this.props.closePopup}>סגור</button>

                    </Container>
                </div>
            </div>

        );
    }
}

const User = () => {
    const classes = useStyles();
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContent, setGlobalContent, RememberMe, setRememberMe] = useContext(GlobalContext);
    const [Edit, setEdit] = useState(false)

    const [Name, setName] = useState(GlobalUser.Name)
    const [Password, setPassword] = useState(GlobalUser.Password)
    const [TeacherType, setTeacherType] = useState(GlobalUser.TeacherType)
    const [BDate, setBDate] = useState(GlobalUser.BDate)
    const [SchoolType, setSchoolType] = useState(GlobalUser.SchoolType)
    const [AboutMe, setAboutMe] = useState(GlobalUser.AboutMe)
    const [UrlPicture, setUrlPicture] = useState(GlobalUser.UrlPicture)
    const [ShowPopUp, setShowPopUp] = useState(false)
    const [NewUrlPicture, setNewUrlPicture] = useState('')
    const [formDataPic, setformDataPic] = useState('')
    const [UserContent, setUserContent] = useState('')
    const [UserLikedContent, setUserLikedContent] = useState('')
    const [ContentNames, setContentNames] = useState('')
    const [Likes, setLikes] = useState('')

    const togglePopup = () => {
        const boolshow = !ShowPopUp
        setShowPopUp(!ShowPopUp)
        if (!boolshow)
            GetDetailsAfterChangePic()//לאחר שינוי תמונה נשאב שוב נתונים מהדאטה בייס, כי לא ניתן בעדכון תמונה להחזיר את פרטי היוזר בחדש - נתיב של תמונה חדשה        
    }
    const KeepPath = (e) => {
        console.log(e.target.files[0])
        console.log(UrlPicture)
        const fd = new FormData()
        fd.append('image', e.target.files[0], e.target.files[0].name)
        setformDataPic(fd)
    }
    const ChangePic = () => {
        const apiUrl2 = `${Server_Url}User/update/${UrlPicture}/${GlobalUser.Email}/1`
        //const SapiUrl2=`http://proj.ruppin.ac.il/igroup20/prod/api/User/update/${UrlPicture}/${GlobalUser.Email}/1`
        fetch(apiUrl2, {
            method: 'post',
            body: formDataPic,
            contentType: false,
            processData: false,
            mode: 'no-cors',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        }).then(res => {
            console.log('res=', res);
            console.log('res.status', res.status);
            console.log('res.ok', res.ok);
        }).then((result) => {
            console.log('result ', result)
        })

    }
    const GetDetailsAfterChangePic = () => {
        const apiUrl = `${Server_Url}User/GetUserDetails`
        //const SapiUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/User/GetUserDetails`

        const Nuser = {
            'Email': GlobalUser.Email,
            'Password': Password,
        }
        console.log('Nuser ', Nuser)
        fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(Nuser),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        }).then(res => {
            console.log('res=', res);
            console.log('res.status', res.status);
            console.log('res.ok', res.ok);
            return res.json()
        }).then((result) => {
            console.log('result ', result)
            setUrlPicture(result.UrlPicture)
            setGlobalUser(result)
            localStorage.setItem('User', RememberMe ? JSON.stringify(result) : null);
        })
    }


    useEffect(() => {
        const BirthDate = GlobalUser.BDate.split(' ')[0].split('/')
        let DateFromat = ``
        if (Server_Url === `http://localhost:55263/api/`)
            DateFromat = BirthDate[2] + '-' + BirthDate[1] + '-' + BirthDate[0]
        else
            DateFromat = BirthDate[0] + '-' + BirthDate[1] + '-' + BirthDate[2]
        setBDate(DateFromat)
        console.log('DateFromat', DateFromat)
        console.log('get user content url', `${Server_Url}/Content/GetUserContents/${GlobalUser.Email.split('@')[0]}`)

        async function fetcUserContent() {
            const response = await fetch(`${Server_Url}/Content/GetUserContents/${GlobalUser.Email.split('@')[0]}`)
            const result = await response.json()
            setUserContent(result)
        }
        async function fetcUserLikedContent() {
            const response = await fetch(`${Server_Url}/Content/GetUserLikedContents/${GlobalUser.Email.split('@')[0]}`)
            const result = await response.json()
            setUserLikedContent(result)
            console.log(result)
        }

        //async function fetchTOPUserLikedContent() {
          //  const response = await fetch(`${Server_Url}User/TOPUserLikedContent/${GlobalUser.Email.split('@')[0]}`)
            //const result = await response.json()
            //console.log('TOPUserLikedContent', result)
            //const ContentNames2 = result.map(content => '"'+content.ContentName+'"')
            //const Likes2 = result.map(content => parseInt(content.Likes))
            //setContentNames(ContentNames2)
            //setLikes(Likes2)
        //}
        fetcUserContent()
        fetcUserLikedContent()
        //fetchTOPUserLikedContent()

    }, [GlobalUser, UrlPicture])

    const changestate = () => {
        setEdit(!Edit)
    }

    const UpdateDetails = () => {
        const NewUSer = {
            'Name': Name,
            'Password': Password,
            'Email': GlobalUser.Email,
            'TeacherType': TeacherType,
            'BDate': BDate,
            'SchoolType': SchoolType,
            'AboutMe': AboutMe,
            'UrlPicture': UrlPicture,
            'FormDataPic': GlobalUser.FormDataPic,
            'ContentsUser': GlobalUser.ContentsUser,
            'TagsUser': GlobalUser.TagsUser,
            'Subjects': GlobalUser.Subjects,
            'TagsScore': GlobalUser.TagsScore
        }
        console.log('New USer ', NewUSer)
        setGlobalUser(NewUSer)
        console.log(GlobalUser)
        localStorage.setItem('User', NewUSer)

        const apiUrl3 = `${Server_Url}User/UpdateUser`;
        //const SapiUrl3=`http://proj.ruppin.ac.il/igroup20/prod/api/User/UpdateUser`
        fetch(apiUrl3, {
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
        <div
            className='UserBody'>
            <div
            //className='MainDetails'
            >
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center" >
                    <FaceSharpIcon />
                    <Typography variant="h4" >דף פרופיל אישי</Typography>

                </Grid>

                <Grid container item sm={12} >
                    <Grid container item sm={8} spacing={2}>
                        <Grid container item sm={12} spacing={2}>
                            <Grid container item sm={5} name='Picture'>
                                <Grid container direction='column' justify="flex-start" >
                                    <Paper className={classes.paper}>
                                        <Typography component="h3" variant="h5" >{GlobalUser.Name}</Typography>
                                        {/*<Typography component="h3" variant="h5" >החלף תמונה</Typography>*/}

                                        <Grid container direction="row">
                                            <AddAPhotoIcon onClick={togglePopup} />
                                            {ShowPopUp &&
                                                <Popup
                                                    text='תמונה חדשה '
                                                    closePopup={togglePopup}
                                                    ChangePic={ChangePic}
                                                    KeepPath={KeepPath}
                                                />}
                                            {<Avatar
                                                className={classes.large}
                                                src={UrlPath + GlobalUser.UrlPicture} />}
                                        </Grid>
                                    </Paper>
                                    {<Button
                                        variant="contained"
                                        style={{ backgroundColor: '#173f5f8a' }}
                                        onClick={changestate}>ערוך פרטים</Button>}
                                    {<Link to={'/Graphs/'+GlobalUser.Email.split('@')[0]}>
                                        <Button
                                            variant="contained"
                                            style={{ backgroundColor: '#173f5f8a' }}
                                        >הצג גרפים</Button>
                                    </Link>}
                                </Grid>
                            </Grid>
                            <Grid container item sm={7}>
                                <Grid container direction="column" justify="flex-start" item sm={12}>
                                    <Typography variant="h5" >פרטים אישיים : </Typography>
                                    <Paper className={classes.paper}>
                                        <Typography variant="h5" >מייל {GlobalUser.Email}</Typography>
                                        <Typography variant="h5" >מלמד ב{GlobalUser.SchoolType}</Typography>
                                        <Typography variant="h5" >מלמד מקצועות {GlobalUser.TeacherType}</Typography>
                                        <Typography variant="h5" >תאריך יום הולדת {GlobalUser.BDate.split(' ')[0]}</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                    <Grid container item sm={4} direction='column' name='AboutMe'>

                        <Typography variant="h5" >קצת על עצמי :</Typography>
                        <Paper className={classes.paper}>
                            <Typography variant="h5" >{GlobalUser.AboutMe}</Typography>
                        </Paper>
                    </Grid>

                </Grid>
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
                                        label="יום הולדת "
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
                                <Grid item xs={12} sm={6} >
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

                    {<Grid container direction="row" justify="center" alignItems="center" >

                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#173f5f8a' }}
                            onClick={UpdateDetails}>בצע שינוי</Button>


                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#80421e6c' }}
                            onClick={changestate}>חזור</Button>

                    </Grid>}
                </div>}
            <p className="headerContents">תכנים שלי ...</p>
            <br></br>
            <Grid item lg={12} xs={12}>
                <Slider
                    speed={500}
                    slidesToShow={4}
                    slidesToScrol={1}
                    infinite={true}
                    dots={false}
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
            <p className="headerContents">תכנים שאהבתי...</p>
            <br></br>
            <Grid item lg={12} xs={12}>
                <Slider
                    speed={500}
                    slidesToShow={4}
                    slidesToScrol={1}
                    infinite={true}
                    dots={false}
                    rtl={false}
                >
                    {UserLikedContent !== '' &&
                        UserLikedContent.map((content, index) =>
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

export default User;