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
import { Button, Container, CssBaseline, Typography, Grid, TextField, Select, MenuItem, Input, CardContent } from '@material-ui/core';


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

/*const UserTable = (props) => {
    const [Days, setDays] = useState('')
    const classes = useStyles();
    const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContent, setGlobalContent, RememberMe, setRememberMe] = useContext(GlobalContext);
    const [ShowContentsTB, setShowContentsTB] = useState(false)
    const [ContentRows, setContentRows] = useState([
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
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={() => Edit(1)}
                />
                <Button
                    variant="contained"
                    //color="primary"
                    style={{ backgroundColor: '#6198d2' }}
                    className={classes.button}
                    startIcon={<VisibilityIcon />}
                    onClick={() => Edit(1)}
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
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={() => Edit(2)}
                />
                <Button
                    variant="contained"
                    //color="primary"
                    style={{ backgroundColor: '#6198d2' }}
                    className={classes.button}
                    startIcon={<VisibilityIcon />}
                    onClick={() => Edit(2)}
                />
            </div>
        }
    ])

    useEffect(() => {
        console.log('days', Days)
    }, [Days])

    const Edit = (ContentId) => {
        console.log('content id', ContentId)
        console.log('rows', ContentRows)
        ContentRows.forEach(content =>
            console.log(content.ContentId))
    }

    const ShowTBL = () => {
        // e.preventDefault()
        showTable();
        async function showTable() {
            const response = await fetch(`${Server_Url}Content/GetLatestContent/${Days}`)
            const result = await response.json()
            console.log("contents", result)
            const contentsROWS = []
            for (let i = 0; i < result.length; i++) {
                const obj = {
                    ContentId: result[i].ContentID,
                    ContentName: result[i].ContentName,
                    Content: <div>
                        <img style={{ width: '100px', height: '100px' }}
                            src={UrlPathFiles + result[i].PathFile} alt='img proccesing' />
                    </div>,
                    ContentDate: result[i].UploadedDate,
                    ByUser: result[i].ByUser,
                    UserPic: <div>
                        <img style={{ width: '100px', height: '100px', borderRadius: '80%' }}
                            src={UrlPath + result[i].UserPic} />
                    </div>,
                    action: <div style={{ display: 'column' }}>
                        <Button
                            variant="contained"
                            //color="primary"
                            style={{ backgroundColor: '#dab136' }}
                            className={classes.button}
                            startIcon={<EditIcon />}
                            onClick={() => Edit(result[i].ContentID)}
                        />
                        <Button
                            variant="contained"
                            //color="primary"
                            style={{ backgroundColor: '#6198d2' }}
                            className={classes.button}
                            startIcon={<VisibilityIcon />}
                            onClick={() => Edit(result[i].ContentID)}
                        />
                    </div>
                }
                contentsROWS.push(obj)
                console.log('content path', UrlPathFiles + result[i].PathFile)
                console.log('user pic', UrlPath + result[i].UserPic)
            }
            console.log('new rows', contentsROWS)
            setContentRows([...contentsROWS])
            setShowContentsTB(true)
        }

    }
    return (
        <div>
            <p className="prefix">הי {"אלמוג"} כאן תוכל לראות ולשנות פרטים אודות מצגות שהעלת</p>
            <form className="buttons" //onSubmit={submit}
                style={{ direction: 'rtl', }}>
                <label>מצגות שהועלו לפני</label>
                <input type='number' onChange={(e) => setDays(e.target.value)} />
                <label>ימים</label>
                <input type="button" onClick={ShowTBL} value="הצג" className="button" />
            </form>
            {/*<div>
                {ShowContentsTB &&
                    <MDBDataTable
                        theadColor="#b3d7ff"
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
                            rows: ContentRows
                        }}
                    />}
            </div>}
            <DataTable style={{ direction: 'rtl', width: '95%', margin: 'auto' }}
                title="My Table"
                //theme="solarized"
                columns={columns2}
                data={ContentRows}
                striped
                highlightOnHover
                selectableRows
                selectableRowsHighlight
                pagination

            />
            {console.log(ContentRows)}
        </div>


    )
}*/

//export default UserTable
//const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContent, setGlobalContent, RememberMe, setRememberMe] = useContext(GlobalContext);
class Popup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Rows: this.props.Rows,
            ChosenRow: this.props.ChosenRow,
            type: this.props.type
        }
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
                            <h1>{this.state.type}</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi maiores inventore quibusdam minima pariatur, architecto, cumque illum, repellat unde reiciendis ipsa ducimus veritatis! Maxime, dolores blanditiis? Explicabo numquam quae corrupti impedit modi nostrum tempore placeat maiores, nesciunt deserunt, molestias enim quidem hic facere nemo illo, porro velit quia veritatis ipsum!</p>
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
                            <h1>{this.state.type}</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi maiores inventore quibusdam minima pariatur, architecto, cumque illum, repellat unde reiciendis ipsa ducimus veritatis! Maxime, dolores blanditiis? Explicabo numquam quae corrupti impedit modi nostrum tempore placeat maiores, nesciunt deserunt, molestias enim quidem hic facere nemo illo, porro velit quia veritatis ipsum!</p>
                            <button onClick={this.props.closePopup}>סגור</button>
                        </Container>
                    </div>
                </div>
            );
        }

    }
}

export default class UserTable extends Component {

    constructor(props) {
        super(props)
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
            Days: 30,
            ChosenRow: 1,
            type: ''
        }

    }
    ShowTBL = async () => {
        const response = await fetch(`${this.state.Server_Url}Content/GetLatestContent/${this.state.Days}`)
        const result = await response.json()
        console.log("contents", result)
        const contentsROWS = []
        for (let i = 0; i < result.length; i++) {
            const obj = {
                ContentId: result[i].ContentID,
                ContentName: result[i].ContentName,
                Content: <div>
                    <img style={{ width: '100px', height: '100px' }}
                        src={this.state.UrlPathFiles + result[i].PathFile} alt='img proccesing' />
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
                <p className="prefix">הי {"אלמוג"} כאן תוכל לראות ולשנות פרטים אודות מצגות שהעלת</p>
                <form className="buttons" //onSubmit={submit}
                    style={{ direction: 'rtl', }}>
                    <label>מצגות שהועלו לפני</label>
                    <input type='number' onChange={(e) => this.setState({ Days: e.target.value })} />
                    <label>ימים</label>
                    <input type="button" onClick={this.ShowTBL} value="הצג" className="button" />
                </form>
                {this.state.ShowPopUp &&
                    <Popup
                        text='פרטי מצגת'
                        closePopup={this.togglePopup}
                        ChosenRow={this.state.ChosenRow}
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
