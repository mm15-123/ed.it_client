import React, { useState, useEffect, useContext } from 'react';
import { MDBDataTable, MDBBtn } from 'mdbreact';
import { GlobalContext } from '../Context/GlobalContext';


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
]

const AdminPage = () => {
  //את השורות תקבלו ממסד הנתונים
  const [GlobalUser, setGlobalUser, UrlPath, UrlPathFiles, Server_Url, GlobalContentHoliday, setGlobalContentHoliday, RememberMe, setRememberMe] = useContext(GlobalContext);
  const [ShowUsersTB, setShowUsersTB] = useState(false)
  const [ShowContentsTB, setShowContentsTB] = useState(false)
  const [ContentRows, setContentRows] = useState([
    {
      ContentId: 1,
      ContentName: 'hey',
      Content: 'hey2',
      ContentDate: 'hey3',
      ByUser: 'hey4',
      UserPic: 'hey5'
    }
  ])
  const [UsersRows, setUsersRows] = useState([
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
        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => editUser('Tiger Nixon')} color="warning">Edit user</MDBBtn>
        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => deleteUser('Tiger Nixon')} color="danger">Delete user</MDBBtn>
      </div>
    },
    {
      name: 'Garrett Winters',
      password: '123',
      Email: 'Accountant',
      SchoolType: 'Tokyo',
      TeacherType: '63',
      Birthday: '2011/07/25',
      ProfilePic: '$170',
      actions: <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
        {/*<MDBBtn onClick={() => this.showUser('Garrett Winters')} color="info">Show user info</MDBBtn>*/}
        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => editUser('Garrett Winters')} color="warning">Edit user</MDBBtn>
        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => deleteUser('Garrett Winters')} color="danger">Delete user</MDBBtn>
      </div>
    },
    {
      name: 'Ashton Cox',
      password: '123',
      Email: 'Junior Technical Author',
      SchoolType: 'San Francisco',
      TeacherType: '66',
      Birthday: '2009/01/12',
      ProfilePic: '$86',
      actions: <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
        {/*<MDBBtn onClick={() => this.showUser('Ashton Cox')} color="info">Show user info</MDBBtn>*/}
        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => editUser('Ashton Cox')} color="warning">Edit user</MDBBtn>
        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => deleteUser('Ashton Cox')} color="danger">Delete user</MDBBtn>
      </div>
    },
  ])

  useEffect(() => {
    async function GetUsers() {
      const response = await fetch(`${Server_Url}User/GetUsers2`)
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
            {/*<MDBBtn onClick={() => this.showUser('Ashton Cox')} color="info">Show user info</MDBBtn>*/}
            <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => editUser(result[i].Name)} color="warning">ערוך משתמש</MDBBtn>
            <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => deleteUser(parseInt(i + 1))} color="danger">מחק משתמש</MDBBtn>
          </div>
        }
        NewRows.push(NewObj)
      }
      setUsersRows(NewRows)
    }

    async function GetLatestContent() {
      const response = await fetch(`${Server_Url}Content/GetLatestContent/${30}`)
      const result = await response.json()
      console.log('latest content', result)
      const contentsROWS = []
      for (let i = 0; i < result.length; i++) {
        const obj = {
          ContentId: result[i].ContentID,
          ContentName: result[i].ContentName,
          Content: <div><img style={{ width: '100px', height: '100px' }}
            src={UrlPathFiles + result[i].PathFile} alt='img proccesing' /> </div>,
          ContentDate: result[i].UploadedDate,
          ByUser: result[i].ByUser,
          UserPic: <div><img style={{ width: '100px', height: '100px', borderRadius: '80%' }}
            src={UrlPath + result[i].UserPic} /></div>
        }
        contentsROWS.push(obj)
        console.log('content path', UrlPathFiles + result[i].PathFile)
        console.log('user pic', UrlPath + result[i].UserPic)
      }
      setContentRows(contentsROWS)
    }
    
    GetUsers()
    GetLatestContent()
  }, [])

  const deleteUser = (index) => {
    console.log('UsersRows - delete f', UsersRows)
    console.log('index - delete f', index)
    //const index2 = UsersRows.findIndex((user) => user.index === index);
    //console.log(index2);
    let newRows=[...UsersRows]
    console.log('newRows - delete f befor',newRows)
    newRows = newRows.filter((person) => person.index !== index);
    console.log('newRows - delete f after',newRows)
    //setUsersRows(newRows);
  }
  const editUser = (userName) => {
    alert(`edit user ${userName}`);
  }
  const showUser = (userName) => {
    alert(`show user ${userName}`);
  }
  const addNewUser = () => {
    let userName = prompt("user name: ");
    let password = prompt("password: ")
    let position = prompt("user position: ");
    let office = prompt("user office: ");
    let age = prompt("user age: ")
    let date = new Date();
    date = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    let salary = prompt("user salary: ")
    const newUser = {
      name: userName,
      position: position,
      office: office,
      age: age,
      date: date,
      salary: salary,
      actions: <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
        {/*<MDBBtn  onClick={() => showUser(userName)} color="info">Show user info</MDBBtn>*/}
        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => editUser(userName)} color="warning">Edit user</MDBBtn>
        <MDBBtn style={{ width: '48%', height: '90%', margin: 'auto' }} onClick={() => deleteUser(userName)} color="danger">Delete user</MDBBtn>
      </div>
    }
    let data = [...UsersRows];
    data.push(newUser);
    setUsersRows(data);
  }

  return (
    <div style={{ padding: '2%' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        {/*<MDBBtn onClick={() => addNewUser('Ashton Cox')} color="success">Add new user</MDBBtn>*/}
        <MDBBtn style={{width:'40%',height:'90%', margin:'auto', backgroundColor:ShowUsersTB ? 'red':'green'}} onClick={() => setShowUsersTB(!ShowUsersTB)} color="success">{ShowUsersTB ? 'close':'show'} Users Details</MDBBtn>
        <MDBBtn style={{width:'40%',height:'90%', margin:'auto',backgroundColor:ShowContentsTB ? 'red':'green'}} onClick={() => setShowContentsTB(!ShowContentsTB)} color="success">{ShowContentsTB ? 'close':'show'} latest slides</MDBBtn>
      </div>
      {ShowUsersTB &&
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
            columns: Userscolumns,
            rows: UsersRows
          }}
        />}
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
        />
      }
      {console.log('UsersRows',UsersRows)}
    </div>
  )

}

export default AdminPage;