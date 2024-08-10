
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
export const Logdin = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
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
            const { email, password } = user
            const res = await fetch(`/login`,
                {
                    method: 'Post',
                    headers: {
                        'content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email, password
                    }),

                    credentials: 'include'
                })

            const data = res.json({}).then((result) => {
                console.log(result.messege)

                if (res.status === 200) {
                    window.alert(result.messege)
                    let userInformation = result.data
                    setInfo({ userInformation })
                    navigate(`/Loginsuccess/`)
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
            <div >

                <div className="mt-5 text-center">
                    <form action="login-success.html" role="form" onsubmit="signIn(event);" autocomplete="off">
                        <div className="mb-4">
                            <h2 >Login</h2>
                        </div>
                        <div className="w-100 d-flex justify-content-center mb-4">
                            <div className=""> <b>Email</b></div>
                            <input className="Login-margin-left-more border border-secondary border-2" name="email" type="email" value={user.email} onChange={ok} autoComplete='off' id="floatingInput" placeholder="name@example.com" required={true} />

                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="pwd"> <b>Password</b></div>
                            <input className="Login-margin-left border border-secondary border-2" name="password" type="password" value={user.password} onChange={ok} autoComplete='off' id="floatingPassword" placeholder="Password" />
                        </div>
                        <div className="mt-4">

                            <button className="btn button-cyan border-radius-3 text-dark border border-dark" type="submit" onClick={getuser} type="submit" id="btn"><b>Login</b></button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
