
import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Topnav } from '../topNav/Topnav';

export const EditUser = () => {
    const navigate = useNavigate();
    const { Editemail, name, email } = useParams()
    const [user, setUser] = useState({
        emailData: Editemail,
        name: name,
    });
    //-------------------------------------------------------------
    var [userInfo, setInfo] = useState({})
    const ok = (e) => {
        let name = e.target.name     // name = email   // name = password
        let value = e.target.value   // value = 12345  // values = hjhshdk
        setUser({ ...user, [name]: value })
        console.log(user.email);
    }
    const getuser = async (e) => {
        try {
            e.preventDefault();
            const { emailData, name } = user
            console.log(emailData)
            const res = await fetch(`/edit`,
                {
                    method: 'Put',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        emailData, name, Editemail
                    }),

                    credentials: 'include'
                })

            const data = res.json({}).then((result) => {
                console.log(result)

                if (res.status === 200) {
                    window.alert("userEdit")
                    let userInformation = result.data
                    setInfo({ userInformation })
                    navigate(`/usermangement`)
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
    return (
        <div>
            <Topnav />
            <div>
                <form action="login-success.html" role="form" onsubmit="signIn(event);" autocomplete="off">
                    <div className="text-center mb-4">
                        <h2>Edit User Information </h2>
                    </div>

                    <div className="text-center mb-4">
                        <label > <b>name </b></label>
                        <input name="name" type="text" className="Login-margin-left border border-dark border-2" value={user.name} onChange={ok} autoComplete='off' id="floatingInput" />
                    </div>
                    <div className="text-center mb-4">
                        <label > <b>Email</b></label>
                        <input name="emailData" type="email" className="Login-margin-left border border-dark border-2" value={user.emailData} onChange={ok} autoComplete='off' id="floatingInput" placeholder="name@example.com" />
                    </div>
                    <div className=" text-center">
                        <button className="btn button-cyan border border-dark border-radius-3" type="submit" onClick={getuser} type="submit" id="btn"><b>Submit</b></button>
                    </div>
                </form>
            </div>
        </div>


    )
}