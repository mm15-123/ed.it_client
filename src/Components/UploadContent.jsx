import uuid from 'uuid/v4';
import React, { useState, useEffect, useContext } from 'react';
// import uuid from 'uuid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Input } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { GlobalContext } from '../Context/GlobalContext';
import Radium from 'radium';
import swal from 'sweetalert';

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
        width: theme.spacing(7),
        height: theme.spacing(7)
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

const UploadContent = () => {//העלאת תוכן
    const classes = useStyles();
    const [GlobalUser, setGlobalUser] = useContext(GlobalContext);
    const [ContentID, setContentID] = useState('')
    const [ContentName, setContentName] = useState('')
    const [PathFile, setPathFile] = useState('')
    const [formData, setFormData] = useState('')
    const [UserID, setUserID] = useState('')
    const [Description, setDescription] = useState('')
    const [UploadDate, setUploadDate] = useState('')
    const [Tags, setTags] = useState(['first tag', 'second tag', 'third tag'])
    const [ChosenTag, setChosenTag] = useState('');
    const [ChoosenTagsList, setChoosenTagsList] = useState([])

    //משיכת רשימת תגיות בהעלאה של הקומפוננטה
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

    //בחירת תגיות עבור המצגת
    const PushToTagsList = (e) => {
        //if (ChoosenTagsList.length == 3) return;//אם 3 אז בסדר
        setChosenTag(e.target.value)
        const chosen = e.target.value
        const tagslist = ChoosenTagsList
        tagslist.push(chosen)
        setChoosenTagsList(tagslist)
        console.log(ChoosenTagsList)
    }

    // מחיקת תגיות שנבחרו
    const RemoveTag = (tag) => {
        console.log(tag)
        const tags = ChoosenTagsList.filter((T) => T !== tag)
        setChoosenTagsList(tags)
        console.log(tags)
    }
    //צירוף קובץ 
    const UploadPpt = (e) => {
        const fd = new FormData()
        fd.append('content', e.target.files[0])
        setPathFile(e.target.files[0])
        setFormData(fd)
    }

    //upload the form-העלאת התוכן לשרת
    const prevent = (e) => {
        e.preventDefault();
        
        if (ChoosenTagsList.length < 3) {
            swal({
                title: 'missing details',
                text: 'choose 3 tags a least pls.',
                icon: 'error'
            })
        }
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        let user = GlobalUser.Email.split("@", 1)
        // const tagsChosen = { ...ChoosenTagsList }
        // console.log(tagsChosen)
        console.log(user[0])
        const Content = {
            'ContentName': ContentName,
            'Description': Description,
            'PathFile': PathFile.name,
            'UploadedDate': today,
            'TagsContent': ChoosenTagsList,
            'ByUser': user[0]
        }
        console.log("content is ", Content)



        fetch("http://localhost:55263/api/Content/AddContent", {
            method: 'post',
            body: JSON.stringify(Content),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then((result) => {
                console.log('Success:', result.status);
                if (result.status < 200 && result.status > 300) {
                    result.json().then(data => {
                        alert(data);
                    });
                }
                else {
                    console.log(ContentName)
                    console.log(`http://localhost:55263/api/Content/UploadContent/${GlobalUser.Email.split("@", 1)}/${ContentName}`)
                    fetch(`http://localhost:55263/api/Content/UploadContent/${GlobalUser.Email.split("@", 1)}/${ContentName}`, {
                        method: 'post',
                        body: formData,
                        contentType: false,
                        processData: false,
                        mode: 'no-cors',
                        headers: new Headers({
                            'Content-Type': 'application/json; charset=UTF-8',
                        })

                    })
                }

            }).then((result) => {
                console.log('Success:', result);
                swal({
                    title: "Content successfully Uploaded!",
                    icon: "success",
                });
            }).catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AssignmentIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Upload Content
        </Typography>
                    <form className={classes.form} onSubmit={prevent} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="Content Name"
                                    name="ContentName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="ContentName"
                                    label="Content Name"
                                    autoFocus
                                    onChange={(e) => setContentName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="Content Description"
                                    name="ContentDescription"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="ContentDescription"
                                    label="Content Description"
                                    autoFocus
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Choose tags</label>
                                <Select
                                    labelId="Tags"
                                    id="Tags"
                                    fullWidth
                                    value={ChosenTag}
                                    required
                                    onChange={PushToTagsList}
                                >
                                    {
                                        Tags.map((tag, index) => <MenuItem key={index} value={tag}>{tag}</MenuItem>)
                                    }
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>tags</label>
                                <h3
                                    labelId="ChoosenTagsList"
                                    id="ChoosenTagsList"
                                    fullWidth
                                    value={ChosenTag}
                                    required

                                >
                                    {
                                        ChoosenTagsList.map((tag, index) =>
                                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', direction: 'rtl', width: '100%' }} >
                                                {index + 1}.<MenuItem key={index} value={tag}>{tag}</MenuItem>
                                                <button style={{ backgroundColor: 'none', border: 'none' }} onClick={() => RemoveTag(tag)}>X</button>
                                            </div>)
                                    }
                                </h3>
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <label style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>upload File</label>
                                <Input
                                    variant="outlined"
                                    //accept="*.pptx"
                                    type='file'
                                    required
                                    fullWidth
                                    id="ppt"
                                    autoComplete="ppt"
                                    onChange={UploadPpt}
                                />
                            </Grid>
                            {/*<Grid item xs={12} sm={4}>
                                <button onClick={UploadPpt}>upload</button>
                            </Grid>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Upload
          </Button>
                        </Grid>
                    </form>
                </div>
            </Container>
        </div>
    );

}

export default UploadContent;