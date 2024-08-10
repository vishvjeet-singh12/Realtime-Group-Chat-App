
import React, { useState, useEffect } from 'react'
import { Chatmgmt } from './chatmgmt'
import { NotAccess } from '../NotAccess'
import { Link, useParams } from 'react-router-dom'
export const Loggedin = () => {
    const [Data, setData] = useState([])
    const [login, setlogin] = useState(0)
    const fetchData = async () => {
        try {
            const res = await fetch(`/ChatList`,
                {
                    method: 'get',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    credentials: 'include'
                })
            const data = res.json({}).then((result) => {
                console.log(result)
                if (res.status === 200) {
                    console.log(result)
                    setData(result)
                    setlogin(1)
                    //    fetchData()
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
        fetchData()

    }, [])
    return (
        <div>
            {login == 1 ? <Chatmgmt Data={Data} fun={fetchData} /> : <NotAccess />}
        </div>
    )
}
