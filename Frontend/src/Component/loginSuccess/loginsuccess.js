import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './loginsuccess.css'
import { Topnav } from '../topNav/Topnav'
import { NotAccess } from '../NotAccess'
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
                console.log(result)

                if (res.status === 200) {
                    console.log(result)
                    setemail(result.email)
                    setLogin(1)
                    //    setUsers(result)
                    //    setlogin(1)
                    //  setInfo({userInformation})
                    //  let use =  userInfo.userInformation.username
                    //   history.push('/DATA/'+ userInformation.username)              
                }

            }).catch((error) => {
                console.log("err2")
                console.log(error)
                // window.alert(error)
            });

        }
        catch (e) {
            console.log("err")
            console.log(e)

        }
    }

    useEffect(() => {
        fetchUser()

    }, [])
    let Logged = () => {
        return <div>
            <Topnav email={email} />
            <div>
                <center>
                    <label for=""> <h2 style={{ "margin-top": "20px ;" }}>Login Successful</h2></label><br />
                    <label for="" ><p style={{ "margin-top": "50px ;" }}><b>Welcome ! </b>{email}</p></label>
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