import React, { useEffect, useState, useHistory } from 'react'
import { Usermanagement_login } from './Usermanagement_login'
import { NotAccess } from '../NotAccess'
// import {NavLink,Route,Switch} from "react-router-dom";
import './usermanagement.css'

export const Usermangement = () => {
  // const history = useHistory();
  const [users, setUsers] = useState([])
  const [islogin, setlogin] = useState(0)
  async function fetchUser() {
    try {
      const res = await fetch(`/userList`,
        {
          method: 'Post',
          headers: {
            'content-Type': 'application/json'
          },

          credentials: 'include'
        })

      const data = res.json({}).then((result) => {
        console.log(result)

        if (res.status === 200) {


          setUsers(result)
          setlogin(1)
          //  setInfo({userInformation})
          //  let use =  userInfo.userInformation.username
          //   history.push('/DATA/'+ userInformation.username)              
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

  useEffect(() => {
    fetchUser()

  }, [])



  return (

    <div>
      {islogin == 1 ? <Usermanagement_login data={users} fun={fetchUser} /> : <NotAccess />}
    </div>
  )
}