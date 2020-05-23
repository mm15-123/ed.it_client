import React, { Component, useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import { MDBDataTable, MDBBtn } from 'mdbreact';
////////////////////////////////////////
import DataTable, { createTheme } from 'react-data-table-component';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';


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

class MyComponent extends Component {
    render() {
        return (
            <DataTable style={{ direction: 'rtl' }}
                title="Arnold Movies"
                columns={columns}
                theme="solarized"
                data={data}
            />
        )
    }
};
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

const UserTable = (props) => {
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
            action: 'hey'
        },
        {
            ContentId: 2,
            ContentName: 'hey',
            Content: 'hey2',
            ContentDate: 'hey3',
            ByUser: 'hey4',
            UserPic: 'hey5',
            action: 'hey'
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
                    action: <div style={{display:'column'}}>
                        <Button
                            variant="contained"
                            //color="primary"
                            style={{backgroundColor:'#dab136'}}
                            className={classes.button}
                            startIcon={<EditIcon />}
                            onClick={() => Edit(result[i].ContentID)}
                        />                        
                        <Button
                            variant="contained"
                            //color="primary"
                            style={{backgroundColor:'#6198d2'}}
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
            console.log('new rows',contentsROWS)
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
            </div>*/}
            <DataTable style={{ direction: 'rtl', width:'95%',margin:'auto' }}
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
}

export default UserTable
