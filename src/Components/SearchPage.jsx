import React, { useState, useEffect, useContext } from 'react'
import { Route, Link, NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Button } from '@material-ui/core';
import Content from './Content';
import logo from '../uploadedFiles/edit logo.png';
import './MainPage.css';
import { GlobalContext } from '../Context/GlobalContext';
import Autocomplete from '@material-ui/lab/Autocomplete';

import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import CardContentt from './CardContent'

const SearchPage = () => {
    const [Contents, setContents] = useState(['first', 'second', 'third', 'forth', 'fifth', 'sixth', 'seventh', 'eight', 'nine', 'ten'])
    const [ShowPic, setShowPic] = useState(true)
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles,Server_Url, GlobalContent, setGlobalContent] = useContext(GlobalContext);
    const [SuggestionContents, setSuggestionContents] = useState([])
    const [autoTags, setautoTags] = useState('');
    //const [URLserver,setURLserver]=useState(`http://proj.ruppin.ac.il/igroup20/prod/api/`)

    // const cotentStyle = {
    //     display: 'inline-block',
    //     border: '2px solid #eee',
    //     boxShadow: '4px 4px 4px 4px #333',
    //     margin: '10px',
    //     padding: '10px',
    // }

    //משיכת נתונים מהסרבר לגבי תכנים מוצעים 

    useEffect(() => {
        let apiUrl = ''
        let SapiUrl = ''
        console.log('GlobalUser ',GlobalUser)
        console.log('Server_Url ',Server_Url)
        //console.log('UrlPath',UrlPath)
        if (GlobalUser != null) {
            apiUrl = `${Server_Url}Content/SuggestContent/${GlobalUser.Email.split("@", 1)}`
            //apiUrl = `http://localhost:55263/api/Content/SuggestContent/${GlobalUser.Email.split("@", 1)}`
            //SapiUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/Content/SuggestContent/${GlobalUser.Email.split("@", 1)}`
        }
        else {
            apiUrl = `${Server_Url}Content/SuggestContentForGuest`
            //apiUrl = `http://localhost:55263/api/Content/SuggestContentForGuest`
            //SapiUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/Content/SuggestContentForGuest`
        }
        console.log('SuggestContent URL', apiUrl)
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
        requestTags();
    }, [])

    const requestTags = async () => {
        const GetUrl = `${Server_Url}User/GetTags`
        //const GetUrl = `http://localhost:55263/api/User/GetTags`
        //const SGetUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/User/GetTags`
        console.log('get tags url ', GetUrl)
        const response = await fetch(GetUrl)
        const result = await response.json()
        console.log(result)
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
    }

    const KeepTag = (event, NewValue) => {
        console.log(NewValue)
    }

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
                            <Grid item xs={4}  >
                                <Autocomplete
                                    id="combo-box-demo"
                                    options={autoTags}
                                    fullWidth
                                    getOptionLabel={(option) => option.title}
                                    //style={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="חפש לפי תגית" variant="outlined" />}
                                    onChange={(event, NewValue) => KeepTag(event, NewValue)}
                                />
                                {/*<TextField
                            variant="outlined"
                            margin="normal"
                            required
                            //fullWidth
                            id="Search"
                            label="חיפוש"
                            name="Search"
                            autoComplete="Search"
                            autoFocus
                        />*/}
                            </Grid>
                        </Grid>
                    </div><br></br>
                    <p className="headerContents">...תכנים אלה עלולים לעניין אותך</p>
                    <br></br>
                </div>
                <div className='ListContents' >
                    <Grid item lg={12} xs={12}>
                        <Slider
                            spedd={500}
                            slidesToShow={4}
                            slidesToScrol={1}
                            infinite={false}
                            dots={false}
                            rtl={false}

                        >
                            {
                                SuggestionContents.map((content, index) =>
                                    <div className='contentStyle' key={index}>
                                        <CardContentt content={content.ContentName} content={content.ContentName} Description={content.Description} ID={content.ContentID} PathFile={content.PathFile}></CardContentt>
                                    </div>
                                )

                            }
                            {
                                SuggestionContents.map((content, index) =>
                                    <div className='contentStyle' key={index}>
                                        <CardContentt content={content.ContentName} content={content.ContentName} Description={content.Description} ID={content.ContentID} PathFile={content.PathFile}></CardContentt>
                                    </div>
                                )
                            }
                            {
                                SuggestionContents.map((content, index) =>
                                    <div className='contentStyle' key={index}>
                                        <CardContentt content={content.ContentName} content={content.ContentName} Description={content.Description} ID={content.ContentID} PathFile={content.PathFile}></CardContentt>
                                    </div>
                                )
                            }
                            {/* <div className='contentStyle' >
                                <h4>מה קורה</h4>
                                <h6> היי</h6>
                            </div>
                            <div className='contentStyle' >
                                <h4>מה קורה</h4>
                                <h6> היי</h6>
                            </div> <div className='contentStyle' >
                                <h4>מה קורה</h4>
                                <h6> היי</h6>
                            </div> <div className='contentStyle' >
                                <h4>מה קורה</h4>
                                <h6> היי</h6>
                            </div> <div className='contentStyle' >
                                <h4>מה קורה</h4>
                                <h6> היי</h6>
                            </div> <div className='contentStyle' >
                                <h4>מה קורה</h4>
                                <h6> היי</h6>
                            </div> */}
                        </Slider>
                    </Grid>
                </div>


            </Container>
        </div>
    )
}

export default SearchPage;