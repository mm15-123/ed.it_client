import React from 'react';
import { MDBDataTable,MDBBtn } from 'mdbreact';

//הגדרת העמודות מראש
const columns =  [
  {
  label: 'שם',
  field: 'name',
  sort: 'asc',
  width: 80
  },
  {
  label: 'מייל',
  field: 'position',
  sort: 'asc',
  width: 270
  },
  {
  label: 'סוג בית ספר',
  field: 'office',
  sort: 'asc',
  width: 100
  },
  {
  label: 'מקצועות לימוד',
  field: 'age',
  sort: 'asc',
  width: 100
  },
  {
  label: 'תאריך לידה',
  field: 'date',
  sort: 'asc',
  width: 100
  },
  {
  label: 'תמונת פרופיל',
  field: 'salary',
  sort: 'asc',
  width: 100
  },
  {
    label:'פעולות',
    field:'actions',
    sort:'asc',
    width:130
  }]

export default class AdminPage extends React.Component{
    state={
        //את השורות תקבלו ממסד הנתונים
        rows: [
        {
          name: 'Tiger Nixon',
          position: 'System Architect',
          office: 'Edinburgh',
          age: '61',
          date: '2011/04/25',
          salary: '$320',
          actions: <div style={{textAlign:'center'}}>
                      <MDBBtn onClick={()=>this.showUser('Tiger Nixon')} color="info">Show user info</MDBBtn>
                      <MDBBtn onClick={()=>this.editUser('Tiger Nixon')} color="warning">Edit user</MDBBtn>
                      <MDBBtn onClick={()=>this.deleteUser('Tiger Nixon')} color="danger">Delete user</MDBBtn>
                  </div>
        },
        {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        age: '63',
        date: '2011/07/25',
        salary: '$170',
        actions: <div style={{textAlign:'center'}}>
                    <MDBBtn onClick={()=>this.showUser('Garrett Winters')} color="info">Show user info</MDBBtn>
                    <MDBBtn onClick={()=>this.editUser('Garrett Winters')} color="warning">Edit user</MDBBtn>
                    <MDBBtn onClick={()=>this.deleteUser('Garrett Winters')} color="danger">Delete user</MDBBtn>
                </div>
        },
        {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        age: '66',
        date: '2009/01/12',
        salary: '$86',
        actions:<div style={{textAlign:'center'}}>
                    <MDBBtn onClick={()=>this.showUser('Ashton Cox')} color="info">Show user info</MDBBtn>
                    <MDBBtn onClick={()=>this.editUser('Ashton Cox')} color="warning">Edit user</MDBBtn>
                    <MDBBtn onClick={()=>this.deleteUser('Ashton Cox')} color="danger">Delete user</MDBBtn>
                </div>
        },
        ],
    }
    deleteUser = (userName)=>{
      const index = this.state.rows.findIndex((user)=>user.name===userName);
      console.log(index);
      const newRows = this.state.rows.filter((person,key)=>key!==index);
      this.setState({rows:newRows});
    }
    editUser = (userName)=>{
      alert(`edit user ${userName}`);
    }
    showUser = (userName)=>{
      alert(`show user ${userName}`);
    }
    addNewUser = ()=>{
      let userName = prompt("user name: ");
      let position = prompt("user position: ");
      let office = prompt("user office: ");
      let age = prompt("user age: ")
      let date = new Date();
      date = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
      let salary = prompt("user salary: ")
      const newUser = {
        name: userName,
        position:position,
        office:office,
        age:age,
        date:date,
        salary:salary,
        actions: <div style={{textAlign:'center'}}>
                  <MDBBtn onClick={()=>this.showUser(userName)} color="info">Show user info</MDBBtn>
                  <MDBBtn onClick={()=>this.editUser(userName)} color="warning">Edit user</MDBBtn>
                  <MDBBtn onClick={()=>this.deleteUser(userName)} color="danger">Delete user</MDBBtn>
                </div>
      }
      let data = [...this.state.rows];
      data.push(newUser);
      this.setState({rows:data});
    }
    render(){
        return(
            <div style={{padding:'2%'}}>
                <MDBBtn onClick={()=>this.addNewUser('Ashton Cox')} color="success">Add new user</MDBBtn>
                <MDBDataTable
                theadColor="#B5DBF8"
                paging={true}
                className='dataTable'
                sortable
                striped
                bordered
                hover
                style={{direction:'rtl'}}
                paginationLabel={["הקודם", "הבא"]} 
                data={{
                  columns:columns,
                  rows:this.state.rows
                }}
                />
            </div>
        )
    }
}

