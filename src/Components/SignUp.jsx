import React, { useState, useEffect,useContext } from 'react';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { GlobalContext } from '../Context/GlobalContext';


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
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContentHoliday, setGlobalContentHoliday, RememberMe, setRememberMe] = useContext(GlobalContext);
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
    const [moveMainPage, setmoveMainPage] = useState(false);//בסיום הרשמה יעבור לעמוד הראשי
    const [autoTags, setautoTags] = useState('')

    useEffect(() => {
        const apiUrl = `${Server_Url}User/GetTags`
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
                    const auto = [];
                    for (let i = 0; i < result.length; i++) {
                        const obj = {
                            'title': result[i],
                            'id': i
                        }
                        auto.push(obj)
                    }
                    console.log(auto)
                    setautoTags(auto)
                },
                (error) => {
                    console.log("err post=", error);
                });
    }
        , []);

    const chooseTags = (event, NewValue) => {
        //if (ChosenTags.length === 3) return;
        const tags = ChosenTags
        setChosenTag(NewValue.title)
        const chosen = NewValue.title
        tags.push(chosen)
        setChosenTags(tags)
        console.log('tags', ChosenTags)
    }

    // מחיקת תגיות שנבחרו
    const RemoveTag = (tag) => {
        console.log(tag)
        const tags = ChosenTags.filter((T) => T !== tag)
        setChosenTags(tags)
        console.log(tags)
    }

    const theme = useTheme();

    const prevent = (e) => {
        e.preventDefault()
        CreatUser()
    }

    const CreatUser = () => {

        const user = {
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
        if (BDate !== '' && SchoolType !== '' && ChosenTags.length >= 3) {
            swal({
                title: "good",
                text: "all details were filled",
                icon: "success",
            })
            console.log(FormDataPic, "hey")
            PostUser(user, FormDataPic)

        }
        else {
            const BDerr = BDate === '' ? 'fill date pls.' : '';
            const Schoolerr = SchoolType === '' ? 'fill school type pls.' : '';
            const Tsgserr = ChosenTags.length < 3 ? 'choose at least 3 tags.' : '';
            swal({
                title: "Sorry, there are missing details",
                text: `${BDerr}  ${Schoolerr}  ${Tsgserr}`,
                icon: "error",
            })
            //alert(`sorry, there is validate error: ${BDerr}  ${Schoolerr}  ${Tsgserr}`)
            //PostUser(user, FormDataPic)
        }
        console.log(user)
    }

    const UploadPict = (e) => {
        const fd = new FormData()
        fd.append('image', e.target.files[0], e.target.files[0].name)
        console.log(fd, e.target.files[0], e.target.files[0].name)
        setUrlPic(e.target.files[0])
        setFormDataPic(fd)

    }

    const PostUser = (data, fd) => {

        const formData = new FormData();
        formData.append('content1', UrlPic, UrlPic.name)
        const apiUrl1 = `${Server_Url}User/CreateUser`
        //const SapiUrl = `http://proj.ruppin.ac.il/igroup20/prod/api/User/CreateUser`
        const apiUrl2 = `${Server_Url}AddPic/${Email.split("@", 1)}` ///${rName}
        //const SapiUrl2 = `http://proj.ruppin.ac.il/igroup20/prod/api/AddPic/${Email.split("@", 1)}`
        fetch(apiUrl1, {
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
            }).then(() => {
                setmoveMainPage(true)//מעבר לעמוד הראשי לאחר התחברות מוצלחת
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }


    if (moveMainPage) {
        return (
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
                    הרשמה
        </Typography>
                <form  className={classes.form} onSubmit={prevent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="Name"
                                name="Name"
                                variant="outlined"
                                required
                                fullWidth
                                id="Name"
                                label="שם"
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
                                label="כתובת מייל"
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
                                label="סיסמה"
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
                                label="מקצועות הוראה"
                                id="TeacherType"
                                autoComplete="Teacher Type"
                                onChange={(e) => setTeacherType(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                id="BDate"
                                required
                                label="תאריך לידה"
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
                            <label style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>סוג בית ספר</label>
                            <Select
                                labelId="SchoolType"
                                id="SchoolType"
                                fullWidth
                                value={SchoolType}
                                required={true}
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
                                label="קצת על עצמי"
                                name="About Me"
                                autoComplete="AboutMe"
                                onChange={(e) => setAboutMe(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>בחר תמונה</label>
                            <Input
                                variant="outlined"
                                accept="image/*"
                                type='file'
                                required
                                fullWidth
                                id="pic"
                                autoComplete="pic"
                                onChange={UploadPict}
                            />
                        </Grid>
                        {/*<Grid item xs={12}>
                            <img src={UrlPic.name} alt="image" />
                            </Grid>*/}
                        <Grid item xs={12} sm={6} >
                            <Autocomplete
                                id="combo-box-demo"
                                options={autoTags}
                                fullWidth
                                getOptionLabel={(option) => option.title}
                                //style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="בחר תגיות" variant="outlined" />}
                                onChange={(event, NewValue) => chooseTags(event, NewValue)}
                            />
                            {/*<FormControl className={classes.formControl}>
                                <InputLabel id="demo-mutiple-chip-label">בחר תגיות</InputLabel>
                                <Select
                                    labelId="demo-mutiple-chip-label"
                                    id="demo-mutiple-chip"
                                    value={ChosenTag}
                                    required
                                    onChange={chooseTags}
                                >
                                    {Tags.map((tag, index) => (
                                        <MenuItem key={index} value={tag} style={getStyles(tag, Tags, theme)}>
                                            {tag}
                                        </MenuItem>
                                    ))}
                                </Select>
                                    </FormControl>*/}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>תגיות שנבחרו</label>
                            <h3
                                labelId="ChoosenTags"
                                id="ChoosenTags"
                                fullWidth
                                value={ChosenTag}
                                required
                            >
                                {
                                    ChosenTags.map((tag, index) =>
                                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', direction: 'rtl', width: '100%' }} >
                                            {index + 1}.<MenuItem key={index} value={tag}>{tag}</MenuItem>
                                            <button style={{ backgroundColor: 'none', border: 'none' }} onClick={() => RemoveTag(tag)}>X</button>
                                        </div>)

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
                    //onClick={CreatUser}
                    >
                        הירשם
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to='/SignIn'>משתמש קיים? התחבר</Link>
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