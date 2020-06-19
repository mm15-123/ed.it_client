import React, { useState, useEffect, useContext,useRef } from 'react'
import { Route, Link, NavLink, Redirect} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Button } from '@material-ui/core';
import { GlobalContext } from '../Context/GlobalContext';
import axios from 'axios';
import Slider from 'react-slick';
import './User.css'
import './MainPage.css';
import CardContentt from './CardContent'


const Holiday = () => {
    const [HolidayToAlert, setHolidayToAlert] = useState([])
    const [HolidayContent, setHolidayContent] = useState('')
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContentHoliday, setGlobalContentHoliday, RememberMe, setRememberMe] = useContext(GlobalContext);
    const [PopUpShow,setPopUpShow]=useState(true)
    
     //התראות חגים
     const Holidayarr=[];
     useEffect( () => {
        console.log("holidays",GlobalContentHoliday)
        async function fetchMyAPI() {
            if(GlobalContentHoliday){
                console.log("fetchMyAPI",GlobalContentHoliday)
                const result = await axios(
                //   `https://holidayapi.com/v1/holidays?pretty&key=2f3e33d8-d3f1-4c7d-b62d-d3f33ee96651&country=IL&year=2019`,
                `https://www.hebcal.com/hebcal/?v=1&cfg=json&maj=on&min=on&mod=on&nx=on&year=now&month=x&ss=on&mf=on&c=off&geo=geoname&geonameid=3448439&m=50&s=off`
                );
             
                // setData(result.data);
                console.log(result.data.items)
                console.log(result.data)
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
        
                today = `${yyyy}-${mm}-${dd}`;
                console.log(today)
                console.log(result.data.items[0].name)
                result.data.items.map((item)=>{
                    // console.log(item.hebrew)
                    let t2 = new Date(today);
                    let t1 = new Date(item.date);
                    // var difference = parseInt((t2-t1)/(24*3600*1000));
                    console.log(item.hebrew)
                    console.log(item.date)
                    let datediff=((t1-t2)/(1000 * 60 * 60 * 24))
                    console.log(datediff)
                  
                    if(datediff<=30 && datediff>=0){
                        Holidayarr.push(item.hebrew)
                        console.log("הגיע")
                    }                                    
                }        
                )
                
                setHolidayToAlert(Holidayarr)
                console.log(Holidayarr)
       
              //שליפת מצגת של התראת חגים
       
                console.log("HolidayToAlert",HolidayToAlert[0])
                if(Holidayarr[0]!=undefined){
                    let HolidayApiUrl = `${Server_Url}Content/GetHolidayAlert/${Holidayarr[0]}`
                    console.log(HolidayApiUrl)
                    const response = await fetch(HolidayApiUrl)
                    const res = await response.json()
                    console.log(res)
                    console.log("res.length",res.length)
                    if(res.length!=0)
                    setHolidayContent(res)
                }
              
               }
        } 
        fetchMyAPI()
       },[]);

    //    useEffect( () => {
    //     console.log("הגיעעעעעעעעעעעעעעעעעעעעעעעעעעעעעעעעעע")
    //     setGlobalContentHoliday(true)
    //     //  console.log("HolidayContent",HolidayContent.length)
    //    },[HolidayContent]);
 
       const ButtonCloseClicked=()=>{
        setGlobalContentHoliday(!GlobalContentHoliday)

       }

    if(HolidayContent!='' && GlobalContentHoliday ){
        return (
            <Container>
                {HolidayContent[0]!="undefined" && <div className='popupHoliday'>
                    {console.log("whyyyyyyyyyyy",HolidayContent[0])}
                    <br></br>
                    <h1 className='soonHoliday'>בקרוב יחול {HolidayToAlert[0]} </h1>
                    <div className='popupContetnt'>
                    <Slider
                            spedd={500}
                            slidesToShow={1}
                            slidesToScrol={1}
                            infinite={false}
                            dots={true}
                            arrows={true}
                            rtl={false}
                            
    
                        >
                            {
                                
                                    <div className='contentStyle'  >
                                        <CardContentt content={HolidayContent[0].ContentName} content={HolidayContent[0].ContentName} Description={HolidayContent[0].Description} ID={HolidayContent[0].ContentID} PathFile={HolidayContent[0].PathFile} UserPic={HolidayContent[0].UserPic}></CardContentt>
                                    </div>
                                
    
                            }
                        </Slider>
                        </div> 
                        <div className="buttomHoliday">
                         <span>לחץ על המצגת כדי לצפות</span><br></br>
                         <input type='button' className='btnComment' onClick={ButtonCloseClicked} value='סגור חלון'></input>
                        </div>
                        
                        </div>}
            </Container>
        )
    }
    else
    return(<div></div>) ;
    
}
export default Holiday