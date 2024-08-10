import React from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
export const Topnav = (props) => {
  const { email } = useParams()
  const navigate = useNavigate()
  const Logout = async () => {
    const res = await fetch(`/logout`,
      {
        method: 'Get',
        headers: {
          'content-Type': 'application/json'
        },
        credentials: 'include'
      })

    const data = res.json({}).then((result) => {
      console.log(result.messege)

      if (res.status === 200) {
        window.alert("logout successfull")

        navigate('/1')

      }
      else {
        window.alert(result.messege)
      }
    }).catch((error) => {
      console.log(error)
      window.alert(error)
    });
  }
  var user = "/manageDocument/"
  var manageUser = "/usermangement/"
  var group = "/Chatmgmt/"
  return (
    <>
      <table className="table bg-silver text-dark text-center ">
        <tr className="">
          <th className="p-3 h-over"><Link to={group} className="text-decoration-none text-dark">Group chat</Link></th>
          <th className="p-3 h-over"><Link to={manageUser} className="text-decoration-none text-dark">Manage Users</Link></th>
          <th className="p-3 h-over"><Link to={user} className="text-decoration-none text-dark" >Manage Document</Link></th>
          <th className="cursor-point h-over"><div onClick={Logout}>Logout</div></th>
        </tr>

      </table><br></br>
    </>
  )
}
