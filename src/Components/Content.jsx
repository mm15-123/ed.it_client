import React, { useState, useEffect, useContext } from 'react'
import { Container, Avatar, Button } from '@material-ui/core';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import styled from 'styled-components';
import presentation from '../uploadedFiles/presentaion1.pptx';//ככה מורידים את המצגת
import myPDF from '../uploadedFiles/myPDF.pdf';
import './MainPage.css';
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalContext';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';

const Local = true;

const Wrapper = styled.div`
width: 100%;
`;

const Page = styled.div`
width:100%;
font-weight:bold;
font-size:50px;
margin-top:20%;
`;

const settings = {
    dots: false,
    fade: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};


const Content = (props) => {
    const [ContentToShow, setContentToShow] = useState('')
    const [PagesSourceList, setPagesSourceList] = useState([])
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles,Server_Url, GlobalContent, setGlobalContent] = useContext(GlobalContext);
    const [URLserver,setURLserver]=useState(`http://proj.ruppin.ac.il/igroup20/prod/api/`)
    const [Like, setLike] = useState(true)
    useEffect(() => {
        console.log('Server_Url ',Server_Url)
        const ContentApiUrl=`${Server_Url}Content/GetContent/${props.match.params.ContentID}`
        //const ContentApiUrl = `http://localhost:55263/api/Content/GetContent/${props.match.params.ContentID}`//go to DB and brings the specific presentation with her likes
        //const SContentApiUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/Content/GetContent/${props.match.params.ContentID}`
        console.log('ContentApiUrl',ContentApiUrl)
        axios.get(ContentApiUrl)
            .then(res => {
                console.log(res.data)
                setContentToShow(res.data)
                MakePages(res.data) // do nothing, just for console.log() staf
                const PagesSourceNewList = []
                for (var i = 1; i < 22; i++) { // fill list with the presentasion slides as pictures
                    PagesSourceNewList.push(  UrlPathFiles + `${res.data.PathFile.split('.', 1)}_${i}.jpg`)
                }
                setPagesSourceList(PagesSourceNewList)
            })

    }, [])

    //לייק
    // useEffect(() => {
    //     if(Like)
    //     {
    //         console.log("like ",Like)
    //         colorLikee.color='red'
    //     }
    //     else
    //     {
    //         console.log("like ",Like)
    //         colorLikee.color='black'
    //     }
    //   }, [Like])


    console.log(props)
    let path = ""
    // if(Local)//אם עובדים על מקומי המקור של תמונות המצגת הוא מתקייה מקומית אחרת מהשרת
    // {
    //     // path
    // }
    //ניסוי לראות אם מציג את התמונות של המצגת
    //todo- לשאוב את שם המשתמש בשביל להשלים שם תמונה
    //todo- לקבל מהשרת כמה תמונות יש בכלל בתיקייה

    const MakePages = (data) => { //do nothing
        console.log('make pages')
        console.log('ContentToShow ', data)
        console.log('PagesSourceList ', PagesSourceList)
        //console.log('Local ', Local)
    }

    return (

        <div>
            <div>
                <div className='contentDiv'>
                    <Slider
                        {...settings}
                        className="sliderContent "
                    >
                        {

                            PagesSourceList.map((page, index) =>
                                <div>
                                    <Page key={index}>
                                        <img className="picContent border-button" src={page} alt='loading' />
                                        {console.log(page)}
                                    </Page>
                                </div>)
                        }


                    </Slider>
               <div className='TitlesContent' >
                        <div>
                            <br></br>
                            <br></br>
                            <br></br>

                            <h1>{ContentToShow.ContentName}</h1>
                            <h2>{ContentToShow.Description}</h2>
                            <h6>{ContentToShow.Likes} משתמשים אהבו את המצגת</h6>
                            <span>#תגית 1 </span><span>tag2# </span><span>tag3# </span>
                            <div>
                                ______________________________________________________________________________
                            <table>
                                    <tr>
                                        <td>              <Avatar alt="Remy Sharp" src={ UrlPath + `${ContentToShow.UserPic}`} className='inline' />
                                            {console.log('img path ', process.env.PUBLIC_URL + '/uploadedPicturesPub/Shiftan92.jpg')}
                                            {console.log('avatar Path ',  UrlPath + `${ContentToShow.UserPic}`)}
                                        </td>
                                        <td><h3>{ContentToShow.ByUser}  </h3>
                                        </td>
                                    </tr>

                                </table>
                            ______________________________________________________________________________
                        </div>
                            <div>
                                <div className='buttonDownload'>
                                <Button><SystemUpdateAltOutlinedIcon style={{fontSize: '2.5rem' }}/>
                                </Button>
                                <span>  הורדת המצגת</span>
                                </div>
                                <div className='likeDiv'> 
                                <FavoriteOutlinedIcon className='like' onClick={(e) => setLike(!Like)} style={{ color: Like ? 'red' : 'black', fontSize: '2.5rem' }}></FavoriteOutlinedIcon>
                                <span>אהבתי</span>      
                                </div> 
                            </div>
                        </div>


                    </div>


                    {/* <iframe src={myPDF} width="540" height="450"></iframe> */}
                    {/* <iframe src={myPDF} className="pdf" allowfullscreen frameborder="0" scrolling="no" > </iframe> */}
                    {/* הורדה של התוכן */}
                    {/* <iframe src={presentation} width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"  allowfullscreen> </iframe> */}
                </div>
            </div>
        </div>

    )
}

export default Content;
//<img className="picContent" src={`'${page}'`} alt='loading'/> public\uploadedPicturesPub\eli.PNG