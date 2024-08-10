import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import "./usermanagement.css"
import { Topnav } from '../topNav/Topnav';
import "bootstrap/dist/css/bootstrap.min.css"

export const Usermanagement_login = (props) => {
  const navigate = useNavigate()
  const { email } = useParams()

  const hideValue = (e) => {
    console.log(document.getElementById('hide').style.display = "none")
  }
  function deleteUser() {
    console.log("delete")
  }
  const deleteData = async (e) => {
    let user = e.target.name
    document.getElementById('hide').style.display = "block"
    document.getElementById('delete').setAttribute('name', `${user}`)
    document.getElementById('delete').addEventListener('click', async (e) => {
      try {
        let user = e.target.name
        const res = await fetch(`/userDelete/${user}`,
          {
            method: 'delete',
            headers: {
              'content-Type': 'application/json'
            },
            body: JSON.stringify({

            }),

            credentials: 'include'
          })


        const data = res.json({}).then((result) => {
          console.log(result.messege)

          if (res.status === 200) {
            window.alert("User delete successfully")
            document.getElementById('hide').style.display = "none"
            props.fun()
            //  let userInformation = result.data
            //  setInfo({userInformation})
            // navigate(`/Loginsuccess/${email}`)
            //  let use =  userInfo.userInformation.username
            //   history.push('/DATA/'+ userInformation.username)              
          }
          else {
            window.alert(result.messege)
          }
        }).catch((error) => {
          console.log(error)
          window.alert(error)
        });
      }
      catch (e) {
        console.log(e)
      }
    })
  }
  const editData = (e) => {
    let name = e.target.id
    let Editemail = e.target.name
    let rowData = { name, email }
    navigate(`/Edit/${Editemail}/${name}/${email}`);
  }
  let datavalue = props.data.map((data) => {
    return <tbody> <tr><td className="label">{data.name}</td><td className="label">{data.email}</td><td className="Another-label d-flex w-100"><input className="w-25" type="button" name={data.email} id={data.name} value="edit" onClick={editData} />|<input type="button" className="w-25" name={data.email} value="delete" onClick={deleteData} /></td></tr></tbody>
  })



  return (
    <div>
      <div>
        <title>Manage User</title>
        <Topnav />
        <div>
          <h2 className="user-heading">Users</h2>
          <center>
            <table class="table table-striped w-100">
              <thead>
                <tr>
                  <th className="bg-secondary text-light">Name</th>
                  <th className="bg-secondary text-light">User Email ID</th>
                  <th className="bg-secondary text-light">Username</th>
                </tr>
              </thead>

              {datavalue}

            </table>
          </center>
        </div>
        <div>
        </div>
      </div>
      <div className="popup " id="hide">
        <div class="flexData" >
          <div className="popupInner">
            <div className="hedding">
              Confirm user Deletion
            </div>
            <div className="popbody">
              <center>Are you Sure ?</center>
            </div>
            <center>
              <div className="btn-g">
                <button className="btn btn-primary btn-r" id="delete" >ok</button>
                <button className="btn btn-secondary " id="cancel" onClick={hideValue}>cancel</button>
              </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  )
}