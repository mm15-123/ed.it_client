import React, { Component } from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { Button, Container, CssBaseline, Typography, Grid, TextField, Select, MenuItem, Input, CardContent } from '@material-ui/core';
import './User.css';
import axios from 'axios'
import Switch from '@material-ui/core/Switch';
import swal from 'sweetalert';
//הגדרת העמודות מראש
const Userscolumns = [
    {
        label: '#',
        field: 'index',
        sort: 'asc',
        width: 100
    },
    {
        label: 'שם',
        field: 'name',
        sort: 'asc',
        width: 100
    },
    {
        label: 'סיסמא',
        field: 'password',
        sort: 'asc',
        width: 100
    },
    {
        label: 'מייל',
        field: 'Email',
        sort: 'asc',
        width: 100
    },
    {
        label: 'סוג בית ספר',
        field: 'SchoolType',
        sort: 'asc',
        width: 100
    },
    {
        label: 'מקצועות לימוד',
        field: 'TeacherType',
        sort: 'asc',
        width: 100
    },
    {
        label: 'תאריך לידה',
        field: 'Birthday',
        sort: 'asc',
        width: 100
    },
    {
        label: 'תמונת פרופיל',
        field: 'ProfilePic',
        sort: 'asc',
        width: 100
    },
    {
        label: 'פעולות',
        field: 'actions',
        sort: 'asc',
        width: 100
    }]
//////////////////////////////////////
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
    {
        label: 'פעולות',
        field: 'actions',
        sort: 'asc',
        width: 100
    }
]

////////////////////////////////////////
class Popup extends React.Component {
    constructor(props) {
        super(props)
        console.log('propsssss', props)
        this.state = {
            Rows: this.props.Rows,
            ContentId: this.props.ContentId,
            Content: this.props.Rows.find(row => row.ContentId == this.props.ContentId),
            type: this.props.type,
            Server_Url: `http://localhost:55263/api/`,
            //Server_Url:`http://proj.ruppin.ac.il/igroup20/prod/api/`,
            comments: []
        }
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
    Remove = (CommentID) => {
        console.log('CommentID', CommentID)
        const newComments = this.state.comments.filter(comment => comment.CommentID !== CommentID)
        this.setState({ comments: newComments })
        axios.post(`${this.state.Server_Url}Content/DeleteComment/${CommentID}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
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
////////////////////////////////////////

class AdminPage1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ShowUsersTB: false,
            ShowContentsTB: false,
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
                    actions: <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
                        {/*<MDBBtn style={{ width: '32%', height: '90%', margin: 'auto' }} onClick={() => this.showUser('Tiger Nixon')} color="info">Show user info</MDBBtn>*/}
                        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => this.editUser('Tiger Nixon')} color="warning">Edit user</MDBBtn>
                        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => this.deleteUser('Tiger Nixon')} color="danger">Delete user</MDBBtn>
                    </div>
                }
            ],
            UsersRows: [
                {
                    name: 'Tiger Nixon',
                    password: '123',
                    Email: 'System Architect',
                    SchoolType: 'Edinburgh',
                    TeacherType: '61',
                    Birthday: '2011/04/25',
                    ProfilePic: '$320',
                    actions: <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
                        {/*<MDBBtn style={{ width: '32%', height: '90%', margin: 'auto' }} onClick={() => this.showUser('Tiger Nixon')} color="info">Show user info</MDBBtn>*/}
                        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => this.editUser('Tiger Nixon')} color="warning">Edit user</MDBBtn>
                        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => this.deleteUser('Tiger Nixon')} color="danger">Delete user</MDBBtn>
                    </div>
                }],
            ContentId: '',
            ShowPopUp: false,
            type: '',
            Days: 0,
        }
    }

    componentDidMount() {
        // const GetUsers = async () => { //fetch all users in system
        //     const response = await fetch(`${this.state.Server_Url}User/GetUsers2`)
        //     const result = await response.json()
        //     console.log('from admin page', result)
        //     const NewRows = []
        //     for (let i = 0; i < result.length; i++) {
        //         const NewObj = {
        //             index: i + 1,
        //             name: result[i].Name,
        //             password: result[i].Password,
        //             Email: result[i].Email,
        //             SchoolType: result[i].SchoolType,
        //             TeacherType: result[i].TeacherType,
        //             Birthday: result[i].BDate.split(' ', 1),
        //             ProfilePic: result[i].UrlPicture,
        //             actions: <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
        //                 {/*<MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => this.editUser(result[i].Name)} color="warning">ערוך משתמש</MDBBtn>*/}
        //                 {/*<MDBBtn style={{ width: '95%', height: '90%', margin: 'auto' }} onClick={() => this.Block(parseInt(i + 1), result[i].Email.split('@', 1), result[i].Blocked)} color={result[i].Blocked == 'False' ? "danger" : "warning"}>{result[i].Blocked == 'False' ? 'חסום' : 'שחרר'}</MDBBtn>*/}
        //                 <Switch
        //                     checked={result[i].Blocked == 'False' ? true : false}
        //                     onChange={(event) => this.Block(event, parseInt(i + 1), result[i].Email.split('@', 1), result[i].Blocked)}
        //                     color="primary"
        //                     name="checkedB"
        //                     className={`switch${i + 1}`}
        //                     inputProps={{ 'aria-label': 'primary checkbox' }}
        //                 />
        //             </div>
        //         }
        //         NewRows.push(NewObj)
        //     }
        //     this.updateState("users", NewRows)// there is a problem to set states in componentDidMount or in async function
        // }

        // const GetLatestContent = async () => { //fetch all contents that uploaded 30 days ago
        //     const response = await fetch(`${this.state.Server_Url}Content/GetLatestContent/${this.state.Days}/Admin`)
        //     const result = await response.json()
        //     console.log('latest content', result)
        //     const contentsROWS = []
        //     for (let i = 0; i < result.length; i++) {
        //         const obj = {
        //             ContentId: result[i].ContentID,
        //             ContentName: result[i].ContentName,
        //             Content: <div><img style={{ width: '100px', height: '100px' }}
        //                 src={this.state.UrlPathFiles + result[i].PathFile} alt='img proccesing' /> </div>,
        //             ContentDate: result[i].UploadedDate,
        //             ByUser: result[i].ByUser,
        //             UserPic: <div><img style={{ width: '100px', height: '100px', borderRadius: '80%' }}
        //                 src={this.state.UrlPath + result[i].UserPic} /></div>,
        //             actions: <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
        //                 <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => this.Edit(result[i].ContentID, 'content')} color="warning">פרטי מצגת</MDBBtn>
        //                 <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => this.Edit(result[i].ContentID, 'comment')} color="danger">תגובות</MDBBtn>
        //             </div>
        //         }
        //         contentsROWS.push(obj)
        //         console.log('content path', this.state.UrlPathFiles + result[i].PathFile)
        //         console.log('user pic', this.state.UrlPath + result[i].UserPic)
        //     }
        //     this.updateState("contents", contentsROWS) // there is a problem to set states in componentDidMount or in async function
        // }

        // GetUsers()
        // GetLatestContent()
    }

      GetUsers = async () => { //fetch all users in system
            const response = await fetch(`${this.state.Server_Url}User/GetUsers2`)
            const result = await response.json()
            console.log('from admin page', result)
            const NewRows = []
            for (let i = 0; i < result.length; i++) {
                const NewObj = {
                    index: i + 1,
                    name: result[i].Name,
                    password: result[i].Password,
                    Email: result[i].Email,
                    SchoolType: result[i].SchoolType,
                    TeacherType: result[i].TeacherType,
                    Birthday: result[i].BDate.split(' ', 1),
                    ProfilePic: result[i].UrlPicture,
                    actions: <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
                        {/*<MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => this.editUser(result[i].Name)} color="warning">ערוך משתמש</MDBBtn>*/}
                        {/*<MDBBtn style={{ width: '95%', height: '90%', margin: 'auto' }} onClick={() => this.Block(parseInt(i + 1), result[i].Email.split('@', 1), result[i].Blocked)} color={result[i].Blocked == 'False' ? "danger" : "warning"}>{result[i].Blocked == 'False' ? 'חסום' : 'שחרר'}</MDBBtn>*/}
                        <Switch
                            checked={result[i].Blocked == 'False' ? true : false}
                            onChange={(event) => this.Block(event, parseInt(i + 1), result[i].Email.split('@', 1), result[i].Blocked)}
                            color="primary"
                            name="checkedB"
                            className={`switch${i + 1}`}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                }
                NewRows.push(NewObj)
            }
            this.updateState("users", NewRows)// there is a problem to set states in componentDidMount or in async function
            this.setState({ ShowUsersTB: !this.state.ShowUsersTB })
        }

         GetLatestContent = async () => { //fetch all contents that uploaded X days ago
            if(this.state.Days==0){ 
                swal({
                    title: "Sorry, out of range",
                    text: `insert number bigger than 0`,
                    icon: "error",
                })
                return
            }
            const response = await fetch(`${this.state.Server_Url}Content/GetLatestContent/${this.state.Days}/Admin`)
            const result = await response.json()
            console.log('latest content', result)
            if(result.length==0){ 
                swal({
                    title: "No Result",
                    text: `Search is too short`,
                    icon: "error",
                })
                return
            }
            const contentsROWS = []
            for (let i = 0; i < result.length; i++) {
                const obj = {
                    ContentId: result[i].ContentID,
                    ContentName: result[i].ContentName,
                    Content: <div><img style={{ width: '100px', height: '100px' }}
                        src={this.state.UrlPathFiles + result[i].PathFile} alt='img proccesing' /> </div>,
                    ContentDate: result[i].UploadedDate,
                    ByUser: result[i].ByUser,
                    UserPic: <div><img style={{ width: '100px', height: '100px', borderRadius: '80%' }}
                        src={this.state.UrlPath + result[i].UserPic} /></div>,
                    actions: <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
                        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => this.Edit(result[i].ContentID, 'content')} color="warning">פרטי מצגת</MDBBtn>
                        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => this.Edit(result[i].ContentID, 'comment')} color="danger">תגובות</MDBBtn>
                    </div>
                }
                contentsROWS.push(obj)
                console.log('content path', this.state.UrlPathFiles + result[i].PathFile)
                console.log('user pic', this.state.UrlPath + result[i].UserPic)
            }
            this.updateState("contents", contentsROWS) // there is a problem to set states in componentDidMount or in async function
            this.setState({ ShowContentsTB: !this.state.ShowContentsTB })
        }

    updateState = (type, array) => { // there is a problem to set states in componentDidMount or in async function 
        type == "users" ?
            this.setState({ UsersRows: array })
            : this.setState({ ContentRows: array })
    }

    editUser = (name) => {
        alert("hey " + name)
    }

    Block = async (event, index, Name, Blocked) => {
        console.log("event", event.target.checked)
        let newUsersList = [...this.state.UsersRows]
        for (var i = 1; i < newUsersList.length; i++) {
            if (newUsersList[i].index == index) {
                newUsersList[i].actions = (
                    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
                        <Switch
                            //checked={this.state.UsersRows[index].Blocked == 'False' ? false : true}
                            checked={event.target.checked}
                            onChange={(event) => this.Block(event, parseInt(index), this.state.UsersRows[index].Email.split('@', 1), this.state.UsersRows[index].Blocked)}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </div>
                )
            }
        }
        this.setState({ UsersRows: newUsersList })
        console.log('user name', Name)
        console.log('index - delete f', index)
        console.log('Blocked? ', Blocked)
        console.log(`${this.state.Server_Url}User/Block/${Name}/${Blocked}`)
        axios.post(`${this.state.Server_Url}User/Block/${Name}/${Blocked}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        //console.log('UsersRows - delete f', this.state.UsersRows)
        // let newRows = [...this.state.UsersRows]
        //console.log('newRows - delete f befor', newRows)
        //newRows = newRows.filter((person) => person.index !== index);
        //this.setState({UsersRows:newRows})
        //console.log('newRows - delete f after', newRows)
    }

    Edit = (ContentId, type) => {
        console.log('type =', type)
        console.log('content id', ContentId)
        console.log('rows', this.state.ContentRows)
        this.setState({
            ContentId: ContentId,
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

    handleDays = (e) => {
        if (e.target.value >= 0)
            this.setState({ Days: e.target.value })
        console.log(this.state.Days)
    }


    render() {
        return (
            <div style={{ padding: '2%' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    {/*<MDBBtn onClick={() => addNewUser('Ashton Cox')} color="success">Add new user</MDBBtn>*/}
                    {/* <MDBBtn style={{ width: '40%', height: '90%', margin: 'auto', backgroundColor: this.state.ShowUsersTB ? 'red' : 'green' }} onClick={() => this.setState({ ShowUsersTB: !this.state.ShowUsersTB })} color="success">{this.state.ShowUsersTB ? 'close' : 'show'} Users Details</MDBBtn>
                    <MDBBtn style={{ width: '40%', height: '90%', margin: 'auto', backgroundColor: this.state.ShowContentsTB ? 'red' : 'green' }} onClick={() => this.setState({ ShowContentsTB: !this.state.ShowContentsTB })} color="success">{this.state.ShowContentsTB ? 'close' : 'show'} latest slides</MDBBtn> */}
                    <MDBBtn style={{ width: '40%', height: '90%', margin: 'auto', backgroundColor: this.state.ShowUsersTB ? 'red' : 'green' }} onClick={this.GetUsers } color="success">{this.state.ShowUsersTB ? 'close' : 'show'} Users Details</MDBBtn>
                    <MDBBtn style={{ width: '40%', height: '90%', margin: 'auto', backgroundColor: this.state.ShowContentsTB ? 'red' : 'green' }} onClick={this.GetLatestContent } color="success">{this.state.ShowContentsTB ? 'close' : 'show'} latest slides</MDBBtn>
                    <TextField style={{ width: '5%' }} variant="outlined" type="number" label={'Days'} min={1} onChange={this.handleDays} />
                </div>
                {this.state.ShowPopUp &&
                    <Popup
                        text='פרטי מצגת'
                        closePopup={this.togglePopup}
                        ContentId={this.state.ContentId}
                        Rows={this.state.ContentRows}
                        type={this.state.type}
                    />}
                {this.state.ShowUsersTB &&
                    <MDBDataTable
                        //theadColor="#b3d7ff"
                        paging={true}
                        //className='dataTable'
                        sortable
                        //autoWidth
                        striped
                        bordered
                        hover
                        scrollX
                        style={{ direction: 'rtl', width: '100%' }}
                        paginationLabel={["הקודם", "הבא"]}
                        data={{
                            columns: Userscolumns,
                            rows: this.state.UsersRows
                        }}
                    />}
                {this.state.ShowContentsTB &&
                    <MDBDataTable
                        //theadColor="#b3d7ff"
                        paging={true}
                        //className='dataTable'
                        sortable
                        //autoWidth
                        striped
                        bordered
                        hover
                        scrollX
                        style={{ direction: 'rtl', width: '100%' }}
                        paginationLabel={["הקודם", "הבא"]}
                        data={{
                            columns: Contentscolumns,
                            rows: this.state.ContentRows
                        }}
                    />
                }
                {console.log('UsersRows', this.state.UsersRows)}
            </div>
        );
    }
}

export default AdminPage1;