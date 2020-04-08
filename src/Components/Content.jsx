import React, { useState, useEffect } from 'react'
import { Container } from '@material-ui/core';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import styled from 'styled-components';
import presentation from '../uploadedFiles/presentaion1.pptx';//ככה מורידים את המצגת
import myPDF from '../uploadedFiles/myPDF.pdf';
import './MainPage.css';

const Local=true;

const Wrapper = styled.div`
width: 100%;
`;

const Page = styled.div`
width:100%;
font-weight:bold;
font-size:50px;
margin-top:20%;
`;

const Content = (props) => {

    useEffect(() => {
    }, [])

console.log(props)
    let path=""
    // if(Local)//אם עובדים על מקומי המקור של תמונות המצגת הוא מתקייה מקומית אחרת מהשרת
    // {
    //     // path
    // }

    // const [pages, setpages] = useState(['page 1', 'page 2', 'page 3 ', 'page 4'])
    const [pages, setpages] = useState([])
    //ניסוי לראות אם מציג את התמונות של המצגת
    //todo- לשאוב את שם המשתמש בשביל להשלים שם תמונה
    //todo- לקבל מהשרת כמה תמונות יש בכלל בתיקייה
    const PagesSourceList=[]
    for (var i = 1; i < 4; i++) {
        PagesSourceList.push( process.env.PUBLIC_URL +`uploadedFilesPub/hadar_${i}.jpg`)
    } 
    // setpages(PagesSourceList);
    console.log(PagesSourceList)
    console.log(Local)
    useEffect(()=>console.log("props are ",props),[])
    
    return (
        <Wrapper className={Container}>
            <Slider 
                spedd={500}
                slidesToShow={1}
                slidesToScrol={1}
                infinite={false}
                dots={true}
                className="sliderContent"
            >
                {
                    // PagesSourceList.map((page, index) => <Page key={index}><img className="picContent" src={process.env.PUBLIC_URL + `uploadedFilesPub/${page}`}></img>{console.log(page)} </Page>)
                    PagesSourceList.map((page, index) => <Page key={index}><img className="picContent" src={`${page}`}></img>{console.log(page)} </Page>)

                }
            </Slider>
            {/* <iframe src={myPDF} width="540" height="450"></iframe> */}
                {/* <iframe src={myPDF} className="pdf" allowfullscreen frameborder="0" scrolling="no" > </iframe> */}
                {/* הורדה של התוכן */}
                {/* <iframe src={presentation} width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"  allowfullscreen> </iframe> */}
        </Wrapper>
    )
}

export default Content;