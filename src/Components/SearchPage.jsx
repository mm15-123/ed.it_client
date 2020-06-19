import React, { useState, useEffect, useContext,useRef } from 'react'
import { Route, Link, NavLink, Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Button } from '@material-ui/core';
import Content from './Content';
import logo from '../uploadedFiles/edit logo.png';
import './MainPage.css';
import { GlobalContext } from '../Context/GlobalContext';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import CardContentt from './CardContent'
import Holiday from './Holiday'
import Radio from '@material-ui/core/Radio';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

var searchUser='';
const SearchPage = () => {
    const [Contents, setContents] = useState(['first', 'second', 'third', 'forth', 'fifth', 'sixth', 'seventh', 'eight', 'nine', 'ten'])
    const [ShowPic, setShowPic] = useState(true)
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContentHoliday, setGlobalContentHoliday, RememberMe, setRememberMe] = useContext(GlobalContext);
    const [SuggestionContents, setSuggestionContents] = useState([])
    const [PopularContents, setPopularContents] = useState([])
    const [ResultsSearchContents, setResultsSearchContents] = useState([])
    const [autoComplete, setautoComplete] = useState('');
    const [titleSuggest, settitleSuggest] = useState('');
    const [titleResultsSearch, settitleResultsSearch] = useState('');
    const [tagToSearch, settagToSearch] = useState('');
    const [selectedValueToSearch, setselectedValueToSearch] = useState('Tags');//חיפוש דיפולטיבי לפי תגיות
    const [HolidayPopup,setHolidayPopup]=useState(false)
    //רשימות של חיפושים
    const [TagsArray,setTagsArray]=useState([])
    const [UserArray,setUserArray]=useState([])
    const [ContentArray,setContentArray]=useState([])
    const [MoveToUserProfile,setMoveToUserProfile]=useState(false)

    //משיכת נתונים מהסרבר לגבי תכנים מוצעים 

    useEffect(() => {
        let apiUrl = ''//עבור תכנים מוצעים
        let SapiUrl = ''
        console.log('GlobalUser ', GlobalUser)
        console.log('Server_Url ', Server_Url)

        if (GlobalUser != null) //אם משתמש מחובר יציע לו תכנים לפי הפרופיל שלו
            apiUrl = `${Server_Url}Content/SuggestContent/${GlobalUser.Email.split("@", 1)}`
        //apiUrl = `http://localhost:55263/api/Content/SuggestContent/${GlobalUser.Email.split("@", 1)}`
        //SapiUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/Content/SuggestContent/${GlobalUser.Email.split("@", 1)}`
        settitleSuggest(function () {
            return (
                <div>
                    <p className="headerContents">...תכנים אלה עשויים לעניין אותך</p>
                    <br></br></div>
            )
        });
        console.log('SuggestContent URL', apiUrl)
        //function UserFetch() {
        fetch(apiUrl, {
            method: 'GET',
            //mode: 'no-cors',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then((result) => {
                console.log('Success:', result);
                result.json().then(data => {
                    console.log(data)
                    setSuggestionContents(data);
                });

            })
            .catch((error) => {
                console.error('Error:', error);
            });
        // }

        //שליפת תכנים פופולריים גם לאורח וגם למשתמש מחובר
        apiUrl = `${Server_Url}Content/SuggestContentForGuest`
        //apiUrl = `http://localhost:55263/api/Content/SuggestContentForGuest`
        //SapiUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/Content/SuggestContentForGuest`
        //function GestANDUserFetch() {
        fetch(apiUrl, {
            method: 'GET',
            //mode: 'no-cors',
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
            })
        })
            .then((result) => {
                console.log('Success:', result);
                result.json().then(data => {
                    console.log(data)
                    setPopularContents(data);
                });

            })
            .catch((error) => {
                console.error('Error:', error);
            });
        requestTags();//מושך רשימת תגים עבור מנוע חיפוש
        setHolidayPopup(true)
    }, [])

   
    const requestTags = async () => {
        let GetUrl = `${Server_Url}User/GetTags`
        //const GetUrl = `http://localhost:55263/api/User/GetTags`
        //const SGetUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/User/GetTags`
        console.log('get tags url ', GetUrl)
        const response = await fetch(GetUrl)
        const result = await response.json()
        console.log(result)
        const TagsArr = [];
        for (let i = 0; i < result.length; i++) {
            const obj = {
                'title': result[i],
                'id': i
            }
            TagsArr.push(obj)
        }
        console.log(TagsArr)
        setTagsArray(TagsArr)
        setautoComplete(TagsArr)//השלמה אוטומטית דיפולטיבית של תגיות

        //משיכת רשימת משתמשים 
        GetUrl=`${Server_Url}User/GetUsersForSearch`
        const response1 = await fetch(GetUrl)
        const result1 = await response1.json()
        const UserArr=[];
        for (let i = 0; i < result1.length; i++) {
            const obj1 = {
                'title': result1[i],
                'id': i
            }
            UserArr.push(obj1)
        }
        console.log(UserArr)
        setUserArray(UserArr)

        //משיכת רשימת מצגות
        GetUrl=`${Server_Url}Content/GetContents`
        const response2 = await fetch(GetUrl)
        const result2 = await response2.json()
        const ContentsArr=[];
        for (let i = 0; i < result2.length; i++) {
            const obj2 = {
                'title': result2[i],
                'id': i
            }
            ContentsArr.push(obj2)
        }
        console.log(ContentsArr)
        setContentArray(ContentsArr)
    }

    const KeepTag = (event, NewValue) => {
        if (NewValue != null) {
            console.log(NewValue)
            settagToSearch(NewValue)
        }
    }
    
    //מביא תוצאות חיפוש
    const SearchFunc = (e) => {
        if (e.key === 'Enter') {
            if(selectedValueToSearch=="Users"){//יעבור לעמוד של המשתמש
                searchUser=tagToSearch.title.split("-", 2);
                setMoveToUserProfile(true)
                return;
            }
           //חיפוש לפי שמות מצגות או לפי תגיות
            const SearchApiUrl = `${Server_Url}Content/Search/${selectedValueToSearch}/${tagToSearch.title}`
            console.log("enter", tagToSearch.title, SearchApiUrl)
            axios.get(SearchApiUrl)
                .then(res => {
                    console.log(res.data)
                    settitleResultsSearch(
                        function () {
                            return (
                                <div><br></br>
                                    <p className="headerContents">תוצאות חיפוש עבור {tagToSearch.title}</p>
                                    <br></br></div>
                            )
                        }
                    )
                    setResultsSearchContents(res.data);

                })
        }
    }

    //שינוי של מה מחפשים
    const handleChange = (event) => {
        setselectedValueToSearch(event.target.value);
        console.log(event.target.value)
        switch (event.target.value) {
            case 'Tags':
                setautoComplete(TagsArray)
                break;

            case 'Users':
                setautoComplete(UserArray)
                break;

            case 'Contents':
                setautoComplete(ContentArray)
                break;

        }
        
    };
  
    if(MoveToUserProfile!=false){
        return(
        <div>
            <Redirect to={"/UserProfile/"+searchUser[1].trim()} />
      </div>
    )}

    return (
        <div>

            <Container component="main" maxWidth="xl">
                   
                <div className='SearchFirstDiv'>
                    {console.log("s", SuggestionContents)}
                    <img src={logo} className="logo"></img>
                    {/* <img src={process.env.PUBLIC_URL + 'uploadedFilesPub/shiftan92.jpg'} className="logo"></img> */}

                    <div className="searchText" style={{ direction: 'rtl' }}>
                        <br></br>
                        <Grid container spacing={2}>
                            <Grid item xs={10}  >
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={autoComplete}
                                    fullWidth
                                    getOptionLabel={(option) => option.title}
                                    //style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label={` חפש לפי ${selectedValueToSearch} `} variant="outlined"  />}
                                    onChange={(event, NewValue) => KeepTag(event, NewValue)}
                                    onKeyDown={(e) => SearchFunc(e)}
                                   
                                />
                          
                                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                                        <FormControlLabel  control={<FormLabel />} label="חיפוש לפי"  checked={selectedValueToSearch === 'תגיות'} onChange={handleChange}/>
                                        <FormControlLabel  value="Tags" control={<Radio color="primary" />} label="תגיות"  checked={selectedValueToSearch === 'Tags'} onChange={handleChange}/>
                                        <FormControlLabel  value="Users" control={<Radio color="primary" />} label="משתמשים"  checked={selectedValueToSearch === 'Users'} onChange={handleChange} />
                                        <FormControlLabel  value="Contents" control={<Radio color="primary" />} label="מצגות"  checked={selectedValueToSearch === 'Contents'} onChange={handleChange}/>                         
                                    </RadioGroup>                     
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <div className='ListContents' >
                    {titleResultsSearch}
                    <Slider
                        spedd={500}
                        slidesToShow={4}
                        slidesToScrol={1}
                        infinite={false}
                        dots={true}
                        arrows={true}
                        rtl={false}

                    >
                        {
                            ResultsSearchContents.map((content, index) =>
                                <div className='contentStyle' key={index}>
                                    <CardContentt content={content.ContentName} content={content.ContentName} Description={content.Description} ID={content.ContentID} PathFile={content.PathFile} UserPic={content.UserPic}></CardContentt>
                                </div>
                            )

                        }
                    </Slider>
                    {titleSuggest}
                    <Grid item lg={12} xs={12}>
                        <Slider
                            spedd={500}
                            slidesToShow={4}
                            slidesToScrol={1}
                            infinite={false}
                            dots={true}
                            arrows={true}
                            rtl={false}

                        >
                            {
                                SuggestionContents.map((content, index) =>
                                    <div className='contentStyle' key={index}>
                                        <CardContentt content={content.ContentName} content={content.ContentName} Description={content.Description} ID={content.ContentID} PathFile={content.PathFile} UserPic={content.UserPic}></CardContentt>
                                        {console.log(content)}
                                    </div>
                                )

                            }
                        </Slider>
                    </Grid>
                    <p className="headerContents">הפופולריים ביותר</p>
                    <br></br>
                    <Slider
                        spedd={500}
                        slidesToShow={4}
                        slidesToScrol={1}
                        infinite={false}
                        dots={true}
                        arrows={true}
                        rtl={false}

                    >
                        {
                            PopularContents.map((content, index) =>
                                <div className='contentStyle' key={index}>
                                    <CardContentt content={content.ContentName} content={content.ContentName} Description={content.Description} ID={content.ContentID} PathFile={content.PathFile} UserPic={content.UserPic}></CardContentt>
                                </div>
                            )

                        }
                    </Slider>
                    {console.log(PopularContents)}
                </div>

               
            </Container>
                    { HolidayPopup && <Holiday/>} 
            {MoveToUserProfile}
        </div>
    )
}

export default SearchPage;