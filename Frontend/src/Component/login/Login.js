import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Loginsuccess } from '../loginSuccess/loginsuccess';
import { Logdin } from './Logdin';
import "./Login.css"
// import { Loggedin } from './Loggedin';
export const Login = () => {
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
    return (
        <>
            {isLogin == 1 ? <Loginsuccess email={email} /> : <Logdin />}
        </>

    )
}
