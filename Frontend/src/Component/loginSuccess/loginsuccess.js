import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './loginsuccess.css'
import { Topnav } from '../topNav/Topnav'
import { NotAccess } from '../NotAccess'
import { toast } from 'sonner'
export const Loginsuccess = () => {
    const [email, setemail] = useState("")
    const [isLogin, setLogin] = useState(0)

    async function fetchUser() {
        try {
            const res = await fetch(`/isLogin`,
                {
                    method: 'Post',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
            const data = res.json({}).then((result) => {
                if (res.status === 200) {
                    setemail(result.email)
                    setLogin(1)
                    //    setUsers(result)
                    //    setlogin(1)
                    //  setInfo({userInformation})
                    //  let use =  userInfo.userInformation.username
                    //   history.push('/DATA/'+ userInformation.username)              
                }

            }).catch((error) => {
               toast.error(error)
            });

        }
        catch (e) {
            console.log(e)

        }
    }

    useEffect(() => {
        fetchUser()

    }, [])
    let Logged = () => {
        return <div>
            <Topnav email={email} />
            <div style={{backgroundColor:"lightgreen",padding:'20px'}}>
                <center>
                    <label for=""> <h2 style={{ "margin-top": "20px ;" }}>Login Successfully</h2></label><br />
                    <label for="" ><p style={{ "margin-top": "50px ;" }}><b>Welcome ! </b>{email}</p></label>
                    <h6 style={{fontSize:'20px',marginTop:'10px'}}>Click on the Group Chat to see the chats</h6>
                </center>
            </div>

        </div>
    }
    return (

        <div>
            {isLogin == 1 ? <Logged /> : <NotAccess />}
        </div>
    )
}