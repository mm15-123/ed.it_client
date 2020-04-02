import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Input } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { Link } from "react-router-dom";
import uuid from 'uuid/v4';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const SignUp = () => {
    const classes = useStyles();
    //const [UserName, setUserName] = useState('')
    const [Name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [Email, setEmail] = useState('')
    const [TeacherType, setTeacherType] = useState('')
    const [BDate, setBDate] = useState('')
    const [SchoolType, setSchoolType] = useState('')
    const [AboutMe, setAboutMe] = useState('')
    const [UrlPic, setUrlPic] = useState('')
    const [FormDataPic, setFormDataPic] = useState('')
    const [Tags, setTags] = useState(['one', 'two'])
    // tagsList: ['שלום', 'שואה', 'מלחמת העצמאות']
    //})
    const [ChosenTag, setChosenTag] = useState('')
    const [ChosenTags, setChosenTags] = useState([])
    const [moveMainPage,setmoveMainPage]=useState(false);//בסיום הרשמה יעבור לעמוד הראשי

    useEffect(() => {
        const apiUrl = `http://localhost:55263/api/User/GetTags`
        fetch(apiUrl,
            {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                })
            })
            .then(res => {
                console.log('res=', res);
                console.log('res.status', res.status);
                console.log('res.ok', res.ok);
                return res.json()
            })
            .then(
                (result) => {
                    console.log("fetch get tags= ", result);
                    result.map(tag => console.log(tag));
                    console.log('result[0]', result[0]);
                    setTags(result)
                },
                (error) => {
                    console.log("err post=", error);
                });
    }
        , []);

    const chooseTags = (e) => {
        if (ChosenTags.length === 3) return;
        const tags = ChosenTags
        setChosenTag(e.target.value)
        const chosen = e.target.value
        tags.push(chosen)
        setChosenTags(tags)
        console.log('tags', ChosenTags)
    }

    const theme = useTheme();
    const prevent = (e) => {
        e.preventDefault()
    }

    const CreatUser = () => {
        const user = {
            //'UserID': uuid.v4(),
            //'UserName': UserName,
            'Name': Name,
            'Password': Password,
            'Email': Email,
            'TeacherType': TeacherType,
            'BDate': BDate,
            'SchoolType': SchoolType,
            'AboutMe': AboutMe,
            'UrlPicture': UrlPic.name,
            'FormDataPic': FormDataPic,
            'TagsUser': ChosenTags
        }
        if ( Name !== '' && Password !== '' && Email !== '' && TeacherType !== '' && BDate !== '' && SchoolType !== '' && AboutMe !== '') {
            alert('good')
            console.log(FormDataPic, "hey")
            PostUser(user, FormDataPic)
        }
        else {
            alert('fiil all the field pls')
            PostUser(user, FormDataPic)
        }
        console.log(user)
    }

    const UploadPict = () => {
        //console.log(UrlPic)
        const fd = new FormData()
        fd.append('image', UrlPic, UrlPic.name)
        console.log(fd, UrlPic, UrlPic.name)
        setFormDataPic(fd)

    }

    const PostUser = (data, fd) => {

        const formData = new FormData();
        formData.append('content1', UrlPic, UrlPic.name)
        const apiUrl = 'http://localhost:55263/api/User/CreateUser'
        const apiUrl2 = `http://localhost:55263/api/AddPic/${Email.split("@",1)}` ///${rName}

        fetch(apiUrl, {
            method: 'post',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then((result) => {
                console.log('Success:', result);
                fetch(apiUrl2, {
                    method: 'post',
                    body: fd,
                    contentType: false,
                    processData: false,
                    mode: 'no-cors',
                    headers: new Headers({
                        'Content-Type': 'application/json; charset=UTF-8',
                    })

                })
            })

            // .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
                swal({
                    title: "Welcome",
                    text: "User successfully added!",
                    icon: "success",
                  });
            }).then(()=>{
                setmoveMainPage(true)//מעבר לעמוד הראשי לאחר התחברות מוצלחת
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }

    
  if(moveMainPage){
    return(
        <div>
            <Redirect to='/' />
        </div>
    )
  }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate onSubmit={prevent}>
                    <Grid container spacing={2}>
                        {/*<Grid item xs={12}>
                            <TextField
                                autoComplete="UserName"
                                name="UserName"
                                variant="outlined"
                                required
                                fullWidth
                                id="UserName"
                                label="UserName"
                                autoFocus
                                onChange={(e) => setUserName(e.target.value)}
                            />
    </Grid>*/}
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="Name"
                                name="Name"
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label="Name"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                required
                                name="TeacherType"
                                label="Teacher Type"
                                id="TeacherType"
                                autoComplete="Teacher Type"
                                onChange={(e) => setTeacherType(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                id="BDate"
                                label="Birthday"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setBDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <label style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>School Type</label>
                            <Select
                                labelId="SchoolType"
                                id="SchoolType"
                                fullWidth
                                value={SchoolType}
                                required
                                onChange={(e) => setSchoolType(e.target.value)}
                            >
                                <MenuItem value="יסודי">יסודי</MenuItem>
                                <MenuItem value="חטיבת ביניים">חטיבת ביניים</MenuItem>
                                <MenuItem value="חטיבה עליונה">חטיבה עליונה - תיכון</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="AboutMe"
                                label="About Me"
                                name="About Me"
                                autoComplete="AboutMe"
                                onChange={(e) => setAboutMe(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>upload picture</label>
                            <Input
                                variant="outlined"
                                accept="image/*"
                                type='file'
                                required
                                fullWidth
                                id="pic"
                                autoComplete="pic"
                                onChange={(e) => setUrlPic(e.target.files[0])}
                            />
                            <button onClick={UploadPict}>upload</button>
                        </Grid>
                        <Grid item xs={12}>
                            <img
                                src={UrlPic} alt="image" />
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-mutiple-chip-label">Tags</InputLabel>
                                <Select
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"

                                    value={ChosenTag}
                                    onChange={chooseTags}

                                >
                                    {Tags.map((tag, index) => (
                                        <MenuItem key={index} value={tag} style={getStyles(tag, Tags, theme)}>
                                            {tag}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>tags</label>
                            <h3
                                labelId="ChoosenTags"
                                id="ChoosenTags"
                                fullWidth
                                value={ChosenTag}
                                required

                            >
                                {
                                    ChosenTags.map((tag, index) => <MenuItem key={index} value={tag}>{tag}</MenuItem>)
                                }
                            </h3>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={CreatUser}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/SignIn'>Already have an account? Sign in</Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default SignUp;