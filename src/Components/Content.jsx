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

let update=false;//מונע עדכון לייק בעת עליית מסך 

const Content = (props) => {
    const [ContentToShow, setContentToShow] = useState('')
    const [PagesSourceList, setPagesSourceList] = useState([])
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContent, setGlobalContent, RememberMe, setRememberMe] = useContext(GlobalContext);
    const [Tagslist,setTagslist]=useState('')
    const [URLserver,setURLserver]=useState(`http://proj.ruppin.ac.il/igroup20/prod/api/`)
    const [Like, setLike] = useState('')
    const [Download,setDownload]=useState(false)
  

    useEffect(() => {
        update=false;
        console.log('content Server_Url ',Server_Url)
        const ContentApiUrl=`${Server_Url}Content/GetContent/${props.match.params.ContentID}/${GlobalUser.Email.split("@", 1)}`
        //const ContentApiUrl = `http://localhost:55263/api/Content/GetContent/${props.match.params.ContentID}`//go to DB and brings the specific presentation with her likes
        //const SContentApiUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/Content/GetContent/${props.match.params.ContentID}`
        console.log('ContentApiUrl',ContentApiUrl)
        axios.get(ContentApiUrl)//משיכת פרטי התוכן בעת עליית הקומפוננטה
            .then(res => {
                console.log(res.data)
                setContentToShow(res.data)
                MakePages(res.data) // do nothing, just for console.log() staf
                const PagesSourceNewList = []
                for (var i = 1; i <= res.data.PagesNumber; i++) { // fill list with the presentasion slides as pictures
                    PagesSourceNewList.push(  UrlPathFiles + `${res.data.PathFile.split('.', 1)}_${i}.jpg`)
                    console.log( UrlPathFiles + `${res.data.PathFile.split('.', 1)}_${i}.jpg`)
                }               
                setPagesSourceList(PagesSourceNewList)
                console.log(res.data.TagsContent)

                res.data.TagsContent.map((page, index) =>{
                    return(
                        <span>#{page}</span>
                    )
                    
                })
                //רשימת תגים של התוכן
               setTagslist(()=>{
                return(
                    res.data.TagsContent.map((page, index) =>{
                        return(
                            <span>#{page}</span>
                        )
                    })
                )
               }) 
               setLike(res.data.LikedByUserWhoWatch) 
        
            })

            //עדכון ניקוד עבור המשתמש
            axios.put(`${Server_Url}User/UpdateScore/${props.match.params.ContentID}/${GlobalUser.Email.split("@", 1)}/watch`)
            .then(res=>console.log('hey'))

    }, [])

   //משתמש עשה לייק/הוריד את הלייק
   useEffect(() => {
        let mode=''
        if(Like)
        {
            console.log("like ",Like)
            mode='like'
        }
        else
        {
            console.log("like ",Like)
            mode='unlike'
        }
        //עדכון ניקוד עבור המשתמש
        if(update){
            axios.put(`${Server_Url}User/UpdateScore/${props.match.params.ContentID}/${GlobalUser.Email.split("@", 1)}/${mode}`)
            .then(res=>console.log('hey'))
        }
    
      }, [Like])
      //נלחץ כפתור לייק
      const LikedClicked=()=>{
        console.log("like ",Like)
        setLike(!Like)
        update=true;//שחרור עדכון לייק בדטהבייס
      }

    //נלחץ על כפתור הורדת מצגת
    const ButtonDownloadClicked = () => {
        console.log('Download clicked',Download)
        setDownload(true)          
      }
      useEffect(() => {     
        console.log('Download',Download)
        if(Download){
            axios.put(`${Server_Url}User/UpdateScore/${props.match.params.ContentID}/${GlobalUser.Email.split("@", 1)}/downloaded`)
            .then(res=>console.log('hey')) 
        }
        setTimeout(() => {
            setDownload(false);
          }, 3000);
      }, [Download])


    console.log(props)
    let path = ""

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
                            {/* <span>#{ContentToShow.TagsContent[0]}</span><span>#{ContentToShow.TagsContent[1]} </span><span>#{ContentToShow.TagsContent[2]} </span> */}
                            {Tagslist}
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
                                <Button onClick={ButtonDownloadClicked }><SystemUpdateAltOutlinedIcon style={{fontSize: '2.5rem' }}/>
                                </Button>
                                <span>  הורדת המצגת</span>
                                </div>
                                <div className='likeDiv'> 
                                <FavoriteOutlinedIcon className='like' onClick={LikedClicked} style={{ color: Like ? 'red' : 'black', fontSize: '2.5rem' }}></FavoriteOutlinedIcon>
                                <span>אהבתי</span>      
                                </div> 
                                {Download && <iframe src={UrlPathFiles+ContentToShow.PathFile}  allowfullscreen frameborder="0" scrolling="no" > </iframe>}

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