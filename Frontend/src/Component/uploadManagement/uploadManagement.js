import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'

import { UploadMgmt } from './UploadMgmt';
import { NotAccess } from '../NotAccess';
export const UploadManagement = () => {
    const [isLogin, setlogin] = useState(0)
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


                    //    setUsers(result)
                    setlogin(1)
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
        <div>
            {isLogin == 1 ? <UploadMgmt /> : <NotAccess />}
        </div>
    )
}
