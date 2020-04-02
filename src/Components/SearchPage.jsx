import React, {useState, useEffect} from 'react'
import { Route, Link, NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Container, Grid } from '@material-ui/core';
import Content from './Content';
import logo from '../uploadedFiles/edit logo.png';
import './MainPage.css';

const SearchPage =()=>{
    const [Contents, setContents] = useState(['first', 'second', 'third', 'forth', 'fifth', 'sixth', 'seventh', 'eight', 'nine', 'ten'])
    const [ShowPic, setShowPic] = useState(true)
    const cotentStyle = {
        display: 'inline-block',
        border: '2px solid #eee',
        boxShadow: '4px 4px 4px 4px #333',
        margin: '10px',
        padding: '10px'
    }
    return (
        <div>
            
        { ShowPic &&  <div className={Container}>
        <img src={logo} className="logo"></img>
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
        { 
            Contents.map((con, index) =>
                <div style={cotentStyle} key={index}>
                    <h2>{con}</h2>
                    <h3>image {index + 1}</h3>
                    <Link to='/Content' params={{ testvalue: "hello" }}>
                        <img style={{ height: '90px', width: '120px' }} onClick={()=>setShowPic(!ShowPic)} src='https://slidescarnival-d1aa.kxcdn.com/wp-content/uploads/2018/12/Juliet-720x405.jpg' alt='loading' />
                    </Link>
                </div>
            )
        }
    </div>  }
    </div>
    )
}

export default SearchPage;