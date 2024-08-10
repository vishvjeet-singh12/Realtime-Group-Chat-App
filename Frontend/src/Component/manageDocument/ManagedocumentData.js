import React, { useState } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import './Managedocument.css'
import { Topnav } from '../topNav/Topnav'
export const ManagedocumentData = (props) => {
  const navigate = useNavigate()
  const { email } = useParams()
  const [Previous, setPrevious] = useState({
    oldDes: "",
    id: ""
  })
  const [Description, setDescription] = useState("")
  const [DeletedId, setDeletedId] = useState("")
  const deleteuserData = async (e) => {
    document.getElementById('hideDeletePopup').style.display = "block"
    console.log(e.target.name)
    document.getElementById('deleteDoc').setAttribute("name", e.target.name)
    document.getElementById('hideDeletePopup').addEventListener('click', async (e) => {
      try {
        console.log(e.target)
        const res = await fetch(`/deleteDoc`,
          {
            method: 'delete',
            headers: {
              'content-Type': 'application/json'
            },
            body: JSON.stringify({

              id: e.target.name
            }),

            credentials: 'include'
          })


        const data = res.json({}).then((result) => {
          console.log(result.messege)

          if (res.status === 200) {
            document.getElementById('hideDeletePopup').style.display = "none"
            // window.alert("delete successfully")
            props.fun()
            //  let userInformation = result.data
            //  setInfo({userInformation})
            // navigate(`/Loginsuccess/${email}`)
            //  let use =  userInfo.userInformation.username
            //   history.push('/DATA/'+ userInformation.username)              
          }
          else {
            // window.alert(result.messege)
          }
        }).catch((error) => {
          console.log(error)
          // window.alert(error)
        });
      }
      catch (e) {
        console.log(e)
      }
    })
  }
  const hideValue = () => {
    document.getElementById('Show-hide-popup').style.display = "none"
  }
  const editValue = (e) => {
    document.getElementById('Show-hide-popup').style.display = "block"
    setPrevious({
      oldDes: e.target.name,
      id: e.target.id
    })
    setDescription(e.target.name)
  }
  const newDes = async (e) => {

    console.log(Previous.oldDes)
    console.log(Previous.id)
    console.log(Description)
    try {
      const res = await fetch(`/editDoc/`,
        {
          method: 'put',
          headers: {
            'content-Type': 'application/json'
          },
          body: JSON.stringify({
            editdes: Description,
            id: Previous.id
          }),

          credentials: 'include'
        })


      const data = res.json({}).then((result) => {
        console.log(result.messege)

        if (res.status === 200) {
          document.getElementById("Show-hide-popup").style.display = "none"
          window.alert("doc edit successfully")
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


  }
  const setDes = (e) => {
    setDescription(e.target.value)
    console.log(Previous.oldDes + " " + Description)
  }
  const hideDeletePopup = (e) => {
    document.getElementById('hideDeletePopup').style.display = "none"

  }


  let datavalue = props.data.map((data) => {
    return <tr><td className="w-33 p-2">{data.des}</td><td className="">{data.doc}</td><td className=" d-flex">
      <input type="button" className="w-25" id={data._id} name={data.des} value="edit" onClick={editValue} />|<input type="button" className="w-25" value="delete" name={data._id} onClick={deleteuserData} /></td></tr>
  })
  let uploadTo = "/uploadManagement/"
  return (
    <div>
      <Topnav />
      <div className="mb-3">
        <h2 className="docs">My Uploads</h2>
      </div>
      <div className="docs1">
        <table className="table table-striped mt-2">
          <tr className="back">
            <th className="bg-silver p-3">Label</th>
            <th className="bg-silver">File Name</th>
            <th className="bg-silver">Action</th>
          </tr>

          <tbody className="tbody">
            {datavalue}
          </tbody>
        </table>

      </div>
      <div className="mb-4">
        <h2>Shared Uploads</h2>
      </div>
      <div className="">
        <table className="table table-striped">
          <tr className="">
            <th className="bg-silver p-3">Label</th>
            <th className="bg-silver">File Name</th>
            <th className="bg-silver">Shred by</th>
          </tr>
          <tbody>
            <tr className="">
              <td className="">Sales Team Attendence Sept 2014</td>
              <td className="">sales-Attend-Sep2014.xls</td>
              <td className="">anne.hunter@mail.com</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="">
              <td className="">Office Rules</td>
              <td className="">officeRules.doc</td>
              <td className="">hr@office.com</td>
            </tr>
          </tbody>
          <tbody>
            <tr className="">
              <td>
                <button className="button-cyan border border-dark border-radius-3"><Link to={uploadTo} className=" text-decoration-none text-dark">+ Add Upload
                </Link></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="popup " id="Show-hide-popup">
        <div class="flexData" >
          <div className="popupInner">
            <div className="hedding">
              Confirm user Deletion
            </div>
            <div className="popbody d-flex justify-content-center">
              <div>Description</div>
              <input className="control-form Login-margin-left w-75 p-1 border border-dark border-2" type="text" value={Description} onChange={setDes}></input>
            </div>
            <div className="btn-g text-center">
              <button className="btn btn-light btn-r" id="delete" onClick={newDes} >ok</button>
              <button className="btn btn-light " onClick={hideValue}>cancel</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="popup " id="hideDeletePopup">
          <div class="flexData" >
            <div className="popupInner">
              <div className="hedding text-center">
                Confirm user Deletion
              </div>
              <div className="popbody text-center">
                Are you Sure ?
              </div>
              <div className="btn-g text-center">
                <button className="btn btn-primary btn-r" id="deleteDoc" >ok</button>
                <button className="btn btn-secondary " onClick={hideDeletePopup}>cancel</button>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}