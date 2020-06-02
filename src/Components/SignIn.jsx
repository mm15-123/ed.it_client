import React, { useState, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Route, Link } from "react-router-dom";
import { GlobalContext } from '../Context/GlobalContext';
import { Alert } from '@material-ui/lab';
import SearchPage from './SearchPage'
import { Redirect } from 'react-router-dom'


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



const SignIn = () => {
  //const [GlobalUser, setGlobalUser,Server_Url]=useContext(GlobalContent)
  const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContent, setGlobalContent, RememberMe, setRememberMe] = useContext(GlobalContext);
  const classes = useStyles();
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [Message, setMessage] = useState('');
  const [moveMainPage, setmoveMainPage] = useState(false)

  const prevent = (e) => {
    e.preventDefault()
  }


  //change RememberMe checkbox and save in local storage
  const RememberMeChanged = (event) => {
    console.log("RememberMe_Before_change ", RememberMe)
    if (RememberMe) {
      setRememberMe(false)
      localStorage.setItem('rememberMe', false)
    }
    else if (RememberMe === null || RememberMe === false) {
      setRememberMe(true)
      localStorage.setItem('rememberMe', true)
    }
    console.log("RememberMe_After_change ", RememberMe)
    /*if (localStorage.getItem('rememberMe') === null)
      setRememberMe(true)
    else if (localStorage.getItem('rememberMe') === false)
      setRememberMe(true)
    else setRememberMe(false)*/

  }
  useEffect(() => {
    console.log("RememberMe ", RememberMe)
    //localStorage.setItem('rememberMe',JSON.stringify(RememberMe))//save in localstorage
  }, [RememberMe])


  const ConfirmUser = () => {
    // const apiUrl = `api/User/GetUserDetails/${UserName}/${Password}`
    console.log('Server_Url', Server_Url)
    const apiUrl = `${Server_Url}User/GetUserDetails`
    //const SapiUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/User/GetUserDetails`
    const user = {
      'Email': Email,
      'Password': Password,
    }
    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(user),
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
          if (result == null) {//הזנת שם משתמש או סיסמא לא נכונים
            setMessage(<div className={classes.root}>    <Alert variant="filled" severity="error">
              שם משתמש ואו סיסמה לא נכונים
            </Alert></div>)
            console.log(Message)
          }
          else if (result.Blocked == 'True') {
            setMessage(<div className={classes.root}>    <Alert variant="filled" severity="error">
              משתמש חסום, פנה להנהלת האתר
            </Alert></div>)
            setRememberMe(false)
            localStorage.setItem('rememberMe', false)
          }
          else {
            console.log("result is ", result)
            //הוספה ללוקל סטורג'

            localStorage.setItem('User', RememberMe ? JSON.stringify(result) : null);//only if remember me checked
            //console.log(localStorage.getItem('User'))
            setMessage(<div className={classes.root}>
              <Alert variant="filled" severity="success">
                התחברות הצליחה
              </Alert> </div>)
            setGlobalUser(result);
            setmoveMainPage(true)//מעבר לעמוד הראשי לאחר התחברות מוצלחת
          }
        })


  }

  if (moveMainPage) {
    return (
      <div>
        {/* <Route path='/' exact component={SearchPage}/> */}
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
          התחברות למשתמש
        </Typography>
        <form className={classes.form} noValidate onSubmit={prevent}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="כתובת מייל"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {Message}


          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={RememberMe} onChange={RememberMeChanged} />}
            label="זכור אותי"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={ConfirmUser}
          >
            התחבר
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                שכחת סיסמה?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/SignUp'
              // variant="body2"
              >
                {"עדיין אין לך חשבון משתמש? הרשם "}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

    </Container>

  );
}
export default SignIn;