import React, { useState, useEffect, useContext } from 'react'
import { Route, Link, NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Button } from '@material-ui/core';
import Content from './Content';
import logo from '../uploadedFiles/edit logo.png';
import './MainPage.css';
import { GlobalContext } from '../Context/GlobalContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import CardContentt from './CardContent'

const SearchPage = () => {
    const [Contents, setContents] = useState(['first', 'second', 'third', 'forth', 'fifth', 'sixth', 'seventh', 'eight', 'nine', 'ten'])
    const [ShowPic, setShowPic] = useState(true)
    const [GlobalUser, setGlobalUser, UrlPath,UrlPathFiles, GlobalContent, setGlobalContent] = useContext(GlobalContext);
    const [SuggestionContents, setSuggestionContents] = useState([])

    // const cotentStyle = {
    //     display: 'inline-block',
    //     border: '2px solid #eee',
    //     boxShadow: '4px 4px 4px 4px #333',
    //     margin: '10px',
    //     padding: '10px',
    // }

    //משיכת נתונים מהסרבר לגבי תכנים מוצעים 

    useEffect(() => {
        let apiUrl=''
        console.log(GlobalUser)
        if(GlobalUser!=null){
            apiUrl=`http://localhost:55263/api/Content/SuggestContent/${GlobalUser.Email.split("@", 1)}`
        }
        else{
            apiUrl=`http://localhost:55263/api/Content/SuggestContentForGuest`
        }

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
    }, [])



    return (
        <div>

            <Container component="main" maxWidth="xs">
                {console.log("s", SuggestionContents)}
                <div style={{ width: '30%',float: 'right' }}>
                    <img src={logo} className="logo"></img>
                </div>
                    <div className="searchText">
                        <br></br>
                        <Grid item xs >

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                //fullWidth
                                id="Search"
                                label="חיפוש"
                                name="Search"
                                autoComplete="Search"
                                autoFocus
                            />
                        </Grid>
                    </div><br></br>
                        <p  className="headerContents">...תכנים אלה עלולים לעניין אותך</p>           
                       <br></br>
                        <div className='ListContents' >
                        <Slider 
                spedd={500}
                slidesToShow={4}
                slidesToScrol={2}
                infinite={false}
                dots={false}
                rtl={true}
                
            >
                    {
                        SuggestionContents.map((content, index) =>
                            <div className='contentStyle' key={index}>
                                <CardContentt content={content.ContentName}  content={content.ContentName} Description={content.Description} ID={content.ContentID} PathFile={content.PathFile}></CardContentt>
                            </div>
                        )
                    }
                       <div className='contentStyle' >
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
                            </div>
                                </Slider>

                                        </div>

                
            </Container>
        </div>
    )
}

export default SearchPage;