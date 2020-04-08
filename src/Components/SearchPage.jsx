import React, { useState, useEffect, useContext } from 'react'
import { Route, Link, NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Container, Grid } from '@material-ui/core';
import Content from './Content';
import logo from '../uploadedFiles/edit logo.png';
import './MainPage.css';
import { GlobalContext } from '../Context/GlobalContext';


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
        fetch(`http://localhost:55263/api/Content/SuggestContent/${GlobalUser.Email.split("@", 1)}`, {
            method: 'GET',
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
                    <img src={logo} className="logo"></img>
                    {/* <img src={process.env.PUBLIC_URL + 'uploadedFilesPub/shiftan92.jpg'} className="logo"></img> */}

                    <div className="searchText">
                        <Grid item xs >

                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                //fullWidth
                                id="Search"
                                label="Search"
                                name="Search"
                                autoComplete="Search"
                                autoFocus
                            />
                        </Grid>
                    </div>
                        <h3 className="headerContents">...תכנים אלה עלולים לעניין אותך</h3>           
                        <div className='ListContents'>
                    {
                        SuggestionContents.map((content, index) =>
                            <div className='contentStyle' key={index}>
                                <h4>{content.ContentName}</h4>
                                <h6> {content.Description}</h6>
                                <Link to='/Content' params={{ testvalue: "hello" }}>
                                    <img style={{ height: '90px', width: '120px' }} onClick={() => setShowPic(!ShowPic)} src={UrlPathFiles + content.PathFile} alt='loading' />
                                </Link>
                            </div>
                        )
                    }
                                        </div>

                
            </Container>
        </div>
    )
}

export default SearchPage;