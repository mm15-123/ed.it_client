import React, { useState, useEffect, useContext, useRef } from 'react'
import { Container, Avatar, Button, Grid } from '@material-ui/core';
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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

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

let update = false;//מונע עדכון לייק בעת עליית מסך 

const Content = (props) => {
    const [ContentToShow, setContentToShow] = useState('')
    const [PagesSourceList, setPagesSourceList] = useState([])
    const [Comments, setComments] = useState([])
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContent, setGlobalContent, RememberMe, setRememberMe] = useContext(GlobalContext);
    const [Tagslist, setTagslist] = useState('')
    const [URLserver, setURLserver] = useState(`http://proj.ruppin.ac.il/igroup20/prod/api/`)
    const [Like, setLike] = useState('')
    const [Download, setDownload] = useState(false)
    const [NewComment, setNewComment] = useState('')
    const [Animation, setAnimation] = useState('')
    const [Disable, setDisable] = useState('')
    const [LikeCount, setLikeCount] = useState(0)
    const commentInput = useRef(null);

    useEffect(() => {
        update = false;
        console.log('content Server_Url ', Server_Url)
        const ContentApiUrl = GlobalUser !== null ?
            `${Server_Url}Content/GetContent/${props.match.params.ContentID}/${GlobalUser.Email.split("@", 1)}`
            : `${Server_Url}Content/GetContent/${props.match.params.ContentID}/Guest`
        //const ContentApiUrl = `http://localhost:55263/api/Content/GetContent/${props.match.params.ContentID}`//go to DB and brings the specific presentation with her likes
        //const SContentApiUrl=`http://proj.ruppin.ac.il/igroup20/prod/api/Content/GetContent/${props.match.params.ContentID}`
        console.log('ContentApiUrl', ContentApiUrl)
        axios.get(ContentApiUrl)//משיכת פרטי התוכן בעת עליית הקומפוננטה
            .then(res => {
                console.log(res.data)
                setContentToShow(res.data)
                setComments(res.data.CommentsList)
                MakePages(res.data) // do nothing, just for console.log() staf
                const PagesSourceNewList = []
                for (var i = 1; i <= res.data.PagesNumber; i++) { // fill list with the presentasion slides as pictures
                    PagesSourceNewList.push(UrlPathFiles + `${res.data.PathFile.split('.', 1)}_${i}.jpg`)
                    console.log(UrlPathFiles + `${res.data.PathFile.split('.', 1)}_${i}.jpg`)
                }
                setPagesSourceList(PagesSourceNewList)
                console.log(res.data.TagsContent)

                res.data.TagsContent.map((page, index) => {
                    return (
                        <span>#{page}</span>
                    )

                })
                //רשימת תגים של התוכן
                setTagslist(() => {
                    return (
                        res.data.TagsContent.map((page, index) => {
                            return (
                                <span style={{ fontSize: '1.0rem',color:'#004085' }}>#{page}</span>
                            )
                        })
                    )
                })
                if (GlobalUser != null) {
                    setLike(res.data.LikedByUserWhoWatch)
                }
                setLikeCount(res.data.Likes)

            })

        //עדכון ניקוד עבור המשתמש
        if (GlobalUser != null) {
            axios.put(`${Server_Url}User/UpdateScore/${props.match.params.ContentID}/${GlobalUser.Email.split("@", 1)}/watch`)
                .then(res => console.log('hey'))
        }


    }, [])

    //משתמש עשה לייק/הוריד את הלייק
    useEffect(() => {
        let mode = ''
        if (Like) {
            console.log("like ", Like)
            mode = 'like'
            setLikeCount(LikeCount + 1)
        }
        else {
            console.log("like ", Like)
            mode = 'unlike'
            setLikeCount(LikeCount - 1)
        }
        //עדכון ניקוד עבור המשתמש
        if (update) {
            axios.put(`${Server_Url}User/UpdateScore/${props.match.params.ContentID}/${GlobalUser.Email.split("@", 1)}/${mode}`)
                .then(res => console.log('hey'))
        }

    }, [Like])
    //נלחץ כפתור לייק
    const LikedClicked = () => {
        console.log("like ", Like)
        setLike(!Like)
        update = true;//שחרור עדכון לייק בדטהבייס
    }

    //נלחץ על כפתור הורדת מצגת
    const ButtonDownloadClicked = () => {
        console.log('Download clicked', Download)
        setDownload(true)
    }
    useEffect(() => {
        console.log('Download', Download)
        if (Download) {
            axios.put(`${Server_Url}User/UpdateScore/${props.match.params.ContentID}/${GlobalUser.Email.split("@", 1)}/downloaded`)
                .then(res => console.log('hey'))
        }
        setTimeout(() => {
            setDownload(false);
        }, 3000);
    }, [Download])

    let NewCommentInput = React.createRef();
    const AddComment = () => {
        // setAnimation('newcomment')
        // setDisable('disabled')
        setComments(null)
        console.log(GlobalUser.Email.split("@", 1)[0])
        axios.post(`${Server_Url}/Content/AddComment`, {
            ContentID: props.match.params.ContentID,
            NameWhoCommented: GlobalUser.Email.split("@", 1)[0],
            Comment: NewComment
        }).
            then(res => {
                console.log(res.data)
                setComments(res.data)
                // console.log(NewCommentInput.current.value);
                console.log(commentInput.current.value)
                commentInput.current.value = '';//ניקוי התגובה
            })
        setTimeout(() => {
            // setAnimation('')
        }, 3000);

    }

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

                <div
                //className='contentDiv'
                >
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                    //alignItems="center"
                    >
                        <Grid item sm={4} >
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
                        </Grid>
                        <Grid item sm={5}
                            direction="column"
                            justify="center"
                            alignItems="center">
                            <div
                                className='TitlesContent'
                            >
                                <div>
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                    <h1 style={{ fontSize: '4.0rem', fontWeight: 'bolder' }}>{ContentToShow.ContentName}</h1>
                                    <h4>{ContentToShow.Description}</h4>
                                    <Grid container direction="row"
                                        justify="center"
                                        alignItems="center">
                                        <ThumbUpAltIcon></ThumbUpAltIcon>
                                        <span style={{ fontSize: '1.0rem', fontWeight: 'bolder',color:'#004085' }}>  {LikeCount} משתמשים אהבו את המצגת</span><br></br>
                                    </Grid>
                                    {/* <span>#{ContentToShow.TagsContent[0]}</span><span>#{ContentToShow.TagsContent[1]} </span><span>#{ContentToShow.TagsContent[2]} </span> */}
                                    {Tagslist}
                                    <div>
                                        <hr />

                                        <table style={{ position: 'relative',right:'38%' }}>
                                            <tr>
                                                <td>              <Avatar alt="Remy Sharp" src={UrlPath + `${ContentToShow.UserPic}`} className='inline' />
                                                    {console.log('img path ', process.env.PUBLIC_URL + '/uploadedPicturesPub/Shiftan92.jpg')}
                                                    {console.log('avatar Path ', UrlPath + `${ContentToShow.UserPic}`)}
                                                </td>
                                                <td>
                                                    <Link to={"/UserProfile/" + ContentToShow.ByUser}>
                                                        <h5>{ContentToShow.ByUser}</h5>
                                                    </Link>
                                                </td>
                                            </tr>

                                        </table>
                                        <hr />

                                    </div>
                                    <div>
                                        <div className='buttonDownload'>
                                            <Button onClick={ButtonDownloadClicked}><SystemUpdateAltOutlinedIcon style={{ fontSize: '2.5rem' }} />
                                            </Button>
                                            <span>  הורדת המצגת</span>
                                        </div>
                                        <div className='likeDiv'>
                                            <FavoriteOutlinedIcon className='like' onClick={LikedClicked} style={{ color: Like ? 'red' : 'black', fontSize: '2.5rem' }}></FavoriteOutlinedIcon>
                                            <span style={{ fontSize: '1.0rem', fontWeight: 'bolder' }}>אהבתי</span>
                                        </div>
                                        {Download && <iframe src={UrlPathFiles + ContentToShow.PathFile} allowfullscreen frameborder="0" scrolling="no" > </iframe>}
                                    </div>
                                    {

                                        <div
                                        //className='commentDiv'
                                        >
                                            <Grid

                                                direction="column"
                                                justify="flex-start"
                                                alignItems="flex-start"
                                            >

                                                <div>
                                                    <br></br>

                                                    <Grid container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center" >

                                                        <TextareaAutosize className={`commentbox  ${Animation}`} aria-label=" maximum height" rowsMin={3} rowsMax={4} placeholder="כתוב תגובה" {...Disable} onChange={(e) => setNewComment(e.target.value)} ref={commentInput} />
                                                        <input type='button'
                                                            className='btnComment '
                                                            value='הוסף תגובה' onClick={AddComment}   ></input>
                                                    </Grid>
                                                </div>

                                                <div className={`comment ${Animation}`}>

                                                    {Comments != null &&

                                                        Comments.map((commentObj, index) =>
                                                            <div>
                                                                <div className="commentDesc">
                                                                    <Link to='/User'>
                                                                        <span>{commentObj.NameWhoCommented}  {commentObj.PublishedDate}</span>
                                                                    </Link>
                                                                </div>
                                                                <TextareaAutosize className='commentbox' aria-label=" maximum height" rowsMin={3} rowsMax={4} defaultValue={commentObj.Comment} disabled />


                                                            </div>)
                                                    }
                                                </div>
                                            </Grid>
                                        </div>
                                    }
                                </div>


                            </div>
                        </Grid>


                        {/* <iframe src={myPDF} width="540" height="450"></iframe> */}
                        {/* <iframe src={myPDF} className="pdf" allowfullscreen frameborder="0" scrolling="no" > </iframe> */}
                        {/* הורדה של התוכן */}
                        {/* <iframe src={presentation} width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"  allowfullscreen> </iframe> */}
                    </Grid>
                </div>

            </div>
        </div >

    )
}

export default Content;
//<img className="picContent" src={`'${page}'`} alt='loading'/> public\uploadedPicturesPub\eli.PNG