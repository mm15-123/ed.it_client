import React, { Component, useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import { MDBDataTable, MDBBtn } from 'mdbreact';
////////////////////////////////////////
import DataTable, { createTheme } from 'react-data-table-component';
//import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import './User.css'
import { Button, Container, CssBaseline, Typography, Grid, TextField, Select, MenuItem, Input, CardContent, Link } from '@material-ui/core';
import swal from 'sweetalert';

createTheme('solarized', {
    text: {
        primary: '#FFFFFF',
        secondary: '#2aa198',
    },
    background: {
        default: '#78a7c7',
    },
    context: {
        background: '#cb4b16',
        text: '#FFFFFF',
    },
    divider: {
        default: '#073642',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});

const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
const columns = [
    {
        name: 'Title',
        selector: 'title',
        sortable: true,
    },
    {
        name: 'Year',
        selector: 'year',
        sortable: true,
        right: false,
    },
];

const columns2 = [
    {
        name: 'מספר מצגת',
        selector: 'ContentId',
        sortable: true,
    },
    {
        name: 'שם מצגת',
        selector: 'ContentName',
        sortable: true,
    },
    {
        name: 'מעבר למצגת',
        selector: 'Content',
        sortable: true,
    },
    {
        name: 'תאריך העלאה',
        selector: 'ContentDate',
        sortable: true,
    },
    {
        name: 'הועלה על ידי',
        selector: 'ByUser',
        sortable: true,
    },
    {
        name: 'תמונת משתמש',
        selector: 'UserPic',
        sortable: true,
    },
    {
        name: 'פעולות',
        selector: 'action',
        sortable: true,
    },
]

////////////////////////////////////////

const Contentscolumns = [
    {
        label: 'מספר מצגת',
        field: 'ContentId',
        sort: 'asc',
        width: 100
    },
    {
        label: 'שם מצגת',
        field: 'ContentName',
        sort: 'asc',
        width: 100
    },
    {
        label: 'מעבר למצגת',
        field: 'Content',
        sort: 'asc',
        width: 100
    },
    {
        label: 'תאריך העלאה',
        field: 'ContentDate',
        sort: 'asc',
        width: 100
    },
    {
        label: 'הועלה על ידי',
        field: 'ByUser',
        sort: 'asc',
        width: 100
    },
    {
        label: 'תמונת משתמש',
        field: 'UserPic',
        sort: 'asc',
        width: 100
    },
]

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));


class Popup extends React.Component {
    constructor(props) {
        console.log('propsss',props)
        super(props)
        this.state = {
            Rows: this.props.Rows,
            ContentId: this.props.ContentId,
            Content: this.props.Rows.find(row => row.ContentId == this.props.ContentId),
            type: this.props.type,
            Server_Url: `http://localhost:55263/api/`,
            //Server_Url:`http://proj.ruppin.ac.il/igroup20/prod/api/`,
            comments: []
        }
        console.log('state',this.state)
    }

    componentDidMount() {
        const GetComments = async () => { //show comments of some presentation for admin security
            const response = await fetch(`${this.state.Server_Url}Content/GetCommentsA/${this.state.ContentId}`)
            const result = await response.json()
            console.log('Comment', result)
            this.setState({ comments: result })
        }
        const GetContent = async () => {
            const response = await fetch(`${this.state.Server_Url}Content/GetContent/${this.state.ContentId}/${this.state.Content.ByUser}`)
            const result = await response.json()
            console.log('content details', result)
            this.setState({ Content: result })
        }
        GetComments()
        GetContent()

        console.log("hey content", this.state.Content)
    }

    render(){
        console.log('chosen row', this.props.ChosenRow)
        console.log('rows', this.props.Rows)
        console.log('type', this.props.type)
        if (this.state.type === 'content') {
            return (
                <div className='popup'>
                    <div className='popup_inner'>
                        <Container>
                            <p>מצגת {this.state.Content.ContentID}</p>
                            <p>{this.state.Content.ByUser} הועלתה על ידי  </p>
                            <p className="content-header">{this.state.Content.ContentName}</p>
                            <p className="content-description">{this.state.Content.Description}</p>
                            <button onClick={this.props.closePopup}>סגור</button>
                        </Container>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className='popup'>
                    <div className='popup_inner'>
                        <Container>
                            <h1>תגובות</h1>
                            {/*<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi maiores inventore quibusdam minima pariatur, architecto, cumque illum, repellat unde reiciendis ipsa ducimus veritatis! Maxime, dolores blanditiis? Explicabo numquam quae corrupti impedit modi nostrum tempore placeat maiores, nesciunt deserunt, molestias enim quidem hic facere nemo illo, porro velit quia veritatis ipsum!</p>*/}
                            {
                                this.state.comments.map((comment, index) =>
                                    <div key={index} className="comment-div">
                                        <div className="comment-detail">
                                            <p>{comment.PublishedDate}</p>
                                            <p>{comment.NameWhoCommented}</p>
                                            <p>.{index + 1}</p>
                                        </div>
                                        <div className="comment">
                                            <input type="button" onClick={() => this.Remove(comment.CommentID)} value="הסר תגובה" />
                                            <p>{comment.Comment}</p>
                                        </div>
                                    </div>
                                )
                            }
                            <button onClick={this.props.closePopup}>סגור</button>
                        </Container>
                    </div>
                </div>
            );
        }

    }
}
//     render() {
//         console.log('chosen row', this.props.ChosenRow)
//         console.log('rows', this.props.Rows)
//         console.log('type', this.props.type)
//         if (this.state.type === 'content') {
//             return (
//                 <div className='popup'>
//                     <div className='popup_inner'>
//                         <Container>
//                             <h1>{this.state.type}</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi maiores inventore quibusdam minima pariatur, architecto, cumque illum, repellat unde reiciendis ipsa ducimus veritatis! Maxime, dolores blanditiis? Explicabo numquam quae corrupti impedit modi nostrum tempore placeat maiores, nesciunt deserunt, molestias enim quidem hic facere nemo illo, porro velit quia veritatis ipsum!</p>
//                             <button onClick={this.props.closePopup}>סגור</button>
//                         </Container>
//                     </div>
//                 </div>
//             );
//         }
//         else {
//             return (
//                 <div className='popup'>
//                     <div className='popup_inner'>
//                         <Container>
//                             <h1>{this.state.type}</h1>
//                             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi maiores inventore quibusdam minima pariatur, architecto, cumque illum, repellat unde reiciendis ipsa ducimus veritatis! Maxime, dolores blanditiis? Explicabo numquam quae corrupti impedit modi nostrum tempore placeat maiores, nesciunt deserunt, molestias enim quidem hic facere nemo illo, porro velit quia veritatis ipsum!</p>
//                             <button onClick={this.props.closePopup}>סגור</button>
//                         </Container>
//                     </div>
//                 </div>
//             );
//         }

//     }
// }

export default class UserTable extends Component {

    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            Server_Url: `http://localhost:55263/api/`,
            //Server_Url:`http://proj.ruppin.ac.il/igroup20/prod/api/`,
            UrlPathFiles: `http://proj.ruppin.ac.il/igroup20/prod/uploadedContents/`,
            UrlPath: `http://proj.ruppin.ac.il/igroup20/prod/uploadedPictures/`,
            ContentRows: [
                {
                    ContentId: 1,
                    ContentName: 'hey',
                    Content: 'hey2',
                    ContentDate: 'hey3',
                    ByUser: 'hey4',
                    UserPic: 'hey5',
                    action: <div style={{ display: 'column' }}>
                        <Button
                            variant="contained"
                            //color="primary"
                            style={{ backgroundColor: '#dab136' }}
                            //className={classes.button}
                            startIcon={<EditIcon />}
                            onClick={() => this.Edit(1, 'content')}
                        />
                        <br />
                        <Button
                            variant="contained"
                            //color="primary"
                            style={{ backgroundColor: '#6198d2' }}
                            //className={classes.button}
                            startIcon={<VisibilityIcon />}
                            onClick={() => this.Edit(1, 'comment')}
                        />
                    </div>
                },
                {
                    ContentId: 2,
                    ContentName: 'hey',
                    Content: 'hey2',
                    ContentDate: 'hey3',
                    ByUser: 'hey4',
                    UserPic: 'hey5',
                    action: <div style={{ display: 'column' }}>
                        <Button
                            variant="contained"
                            //color="primary"
                            style={{ backgroundColor: '#dab136' }}
                            //className={classes.button}
                            //startIcon={<EditIcon />}
                            onClick={() => this.Edit(2, 'content')}
                        >פרטים</Button>
                        <br />
                        <Button
                            variant="contained"
                            //color="primary"
                            style={{ backgroundColor: '#6198d2' }}
                            //className={classes.button}
                            //startIcon={<VisibilityIcon />}
                            onClick={() => this.Edit(2, 'comment')}
                        >תגובות</Button>
                    </div>
                }
            ],
            ShowContentsTB: false,
            ShowPopUp: false,
            Days: 0,
            ChosenRow: 1,
            type: ''
        }

    }
    ShowTBL = async () => {
        if (this.state.Days <= 0) {
            swal({
                title: "Sorry, out of range",
                text: `insert number bigger than 0`,
                icon: "error",
            })
            return
        }
        const response = await fetch(`${this.state.Server_Url}Content/GetLatestContent/${this.state.Days}/${this.props.match.params.UserName}`)
        const result = await response.json()
        console.log("contents", result)
        const contentsROWS = []
        for (let i = 0; i < result.length; i++) {
            const obj = {
                ContentId: result[i].ContentID,
                ContentName: result[i].ContentName,
                Content: <div>
                    <Link to={`/Content/${result[i].ContentID}`}>
                    <img style={{ width: '100px', height: '100px' }}
                        src={this.state.UrlPathFiles + result[i].PathFile} alt='img proccesing' />
                        </Link>
                </div>,
                ContentDate: result[i].UploadedDate,
                ByUser: result[i].ByUser,
                UserPic: <div>
                    <img style={{ width: '100px', height: '100px', borderRadius: '80%' }}
                        src={this.state.UrlPath + result[i].UserPic} />
                </div>,
                action: <div style={{ display: 'column' }}>
                    <Button
                        variant="contained"
                        //color="primary"
                        style={{ backgroundColor: '#dab136' }}
                        //className={classes.button}
                        //startIcon={<EditIcon />}
                        onClick={() => this.Edit(result[i].ContentID, 'content')}
                    >פרטים</Button>
                    <br />
                    <Button
                        variant="contained"
                        //color="primary"
                        style={{ backgroundColor: '#6198d2' }}
                        //className={classes.button}
                        //startIcon={<VisibilityIcon />}
                        onClick={() => this.Edit(result[i].ContentID, 'comment')}
                    >תגובות</Button>

                </div>
            }
            contentsROWS.push(obj)
            console.log('content path', this.state.UrlPathFiles + result[i].PathFile)
            console.log('user pic', this.state.UrlPath + result[i].UserPic)
        }
        console.log('new rows', contentsROWS)
        this.setState({
            ContentRows: contentsROWS,
            ShowContentsTB: true,
        })
    }
    Edit = (ContentId, type) => {
        console.log('type =', type)
        console.log('content id', ContentId)
        console.log('rows', this.state.ContentRows)
        this.setState({
            ChosenRow: ContentId,
            ShowPopUp: !this.state.ShowPopUp,
            ShowContentsTB: !this.state.ShowContentsTB,
            type: type
        })
    }
    togglePopup = () => {
        this.setState({
            ShowPopUp: !this.state.ShowPopUp,
            ShowContentsTB: !this.state.ShowContentsTB
        })
        console.log('show popup', this.state.ShowPopUp)
        console.log('show content', this.state.ShowContentsTB)
    }

    render() {

        return (
            <div>
                <p className="prefix">הי {this.props.match.params.Name} כאן תוכל לראות פרטים אודות מצגות שהעלת</p>
                <form className="buttons" //onSubmit={submit}
                    style={{ direction: 'rtl', }}>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center" >
                        {/* <label>מצגות שהועלו לפני</label> */}
                        <Typography component="h3" variant="h5" > מצגות שהועלו בטווח של </Typography>
                        <TextField variant="outlined" style={{ textAlign: 'center' }} type='number' onChange={(e) => this.setState({ Days: e.target.value })} />
                        {/* <input type='number' onChange={(e) => this.setState({ Days: e.target.value })} /> */}
                        <Typography component="h3" variant="h5" > ימים </Typography>
                        {/* <label>ימים</label> */}
                        {/* <input type="button" onClick={this.ShowTBL} value="הצג" className="button" /> */}
                        <Button
                            variant="contained"
                            //color="primary"
                            style={{ backgroundColor: '#6198d2' }}
                            //className={classes.button}
                            //startIcon={<VisibilityIcon />}
                            onClick={this.ShowTBL}
                        >הצג</Button>
                    </Grid>
                </form>
                {this.state.ShowPopUp &&
                    <Popup
                        text='פרטי מצגת'
                        closePopup={this.togglePopup}
                        //ChosenRow={this.state.ChosenRow}
                        ContentId={this.state.ChosenRow}
                        Rows={this.state.ContentRows}
                        type={this.state.type}
                    />}
                {this.state.ShowContentsTB &&
                    <div>
                        <DataTable style={{ direction: 'rtl', width: '95%', margin: 'auto' }}
                            title="My Table"
                            //theme="solarized"
                            columns={columns2}
                            data={this.state.ContentRows}
                            striped
                            highlightOnHover
                            selectableRows
                            selectableRowsHighlight
                            pagination

                        />
                    </div>}

                {console.log(this.state.ContentRows)}
            </div>
        )
    }
} 
