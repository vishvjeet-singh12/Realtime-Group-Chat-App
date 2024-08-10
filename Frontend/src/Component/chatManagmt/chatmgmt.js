import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './chatmgmt.css'
import { Topnav } from '../topNav/Topnav'
export const Chatmgmt = (props) => {
    console.log(props)
    const [login, setlogin] = useState(0)
    const [messege, setmessege] = useState("")
    const [email, setemail] = useState("")
    const sendMessege = async (e) => {
        console.log(messege)
        const date = new Date();
        let date_value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let hour, minutes, second
        let hr = date.getHours()

        if (String(hr).length == 2) {
            hour = date.getHours()
        }
        else {
            hour = "0" + date.getHours()
        }

        String(date.getMinutes()).length == 2 ? minutes = date.getMinutes() : minutes = "0" + date.getMinutes()
        String(date.getSeconds()).length == 2 ? second = date.getSeconds() : second = "0" + date.getSeconds()
        console.log(date.getSeconds().length)
        let time = hour + ':' + minutes + ':' + second;

        let final_date = date_value + " " + time
        try {
            const res = await fetch("/Chat", {
                method: 'post',
                headers: {
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "msg": messege,
                    "time": final_date,
                    "name": email
                }),
                credentials: 'include'
            })

            const data = res.json({}).then((result) => {
                console.log(result)

                if (res.status === 200) {
                    props.fun()

                    // window.alert("registration successfull")
                    // let userInformation = result.data
                    // setInfo({ userInformation })
                    // navigate("/login")
                    //  let use =  userInfo.userInformation.username
                    //   history.push('/DATA/'+ userInformation.username)

                }
                else {
                    console.log(result)
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

    const fillMessege = async (e) => {
        console.log(e.target.value)
        setmessege(e.target.value)


    }
    let list = props.Data.map((res) => {

        return <div>[{res.time}]{res.name + " : " + res.msg}  </div>
    })
    const refr = () => {
        console.log(props.Data)
    }


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
                    setemail(result.name)

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

        <div>
            <Topnav />
            <div class="chat">
                <div class="chat1">
                    <hr />
                    <span className="Chat-header"><b>Friends Group</b></span>
                    <hr />
                </div>
                <br />
                <div class="chat2">
                    {/* [2013-01-27 01:00:16] Text User: Lorem ipsum dolar sit <br/>
                [2013-01-27 01:05:22] Text User: consetetur sadipscing elitr,sed diam nonumy eirmod<br/>
                [2013-01-27 01:11:14] Anne Hunter: tempor invidut ut labore et dolore magna<br/>
                [2013-01-27 02:11:35] Jack Washk: aliquyam erat,sed diam voluptua.At vero eos et */}
                    {list}
                </div>
                <div class="chat3">
                    <hr />
                    <span className="chats">{email}
                        <input type="text" name="messege" placeholder="I am good" value={messege} onChange={fillMessege} className="chatting" />
                        <button className="styling" onClick={sendMessege}>Send</button>
                        <button className="chat-style" onClick={refr}>Refresh</button></span>
                    <hr />
                </div>
            </div>
        </div>
    )
}