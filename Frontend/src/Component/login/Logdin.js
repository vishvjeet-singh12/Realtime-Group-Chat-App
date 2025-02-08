
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import "./Login.css"
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
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email, password
                    }),

                    credentials: 'include'
                })

            const data = res.json({}).then((result) => {
                console.log(result.messege)

                if (res.status === 200) {
                    let userInformation = result.data
                    setInfo({ userInformation })
                    toast.success("Successfully Loggedin")
                    navigate(`/Loginsuccess/`)
                    //  let use =  userInfo.userInformation.username
                    //   history.push('/DATA/'+ userInformation.username)              
                }
                else {
                    toast.error(result.messege)
                }
            }).catch((error) => { 
                console.log(error)
              toast.error(error)
            });
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
                  <div style={{
                    backgroundImage:
                      "url(https://plus.unsplash.com/premium_photo-1720032304972-1f1142e73253?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhdCUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <form action="login-success.html" role="form" onsubmit="signIn(event);" autocomplete="off" className="w-50 mx-auto rounded-md p-4 my-10 ">
                    <div className="content" >  
                      <h4 className="text-center mb-3" style={{fontSize:'23px',color:'red'}}>
                        LOGIN INTO GROUP CHAT
                      </h4>
                      <hr className="mb-4"></hr>
                      <div style={{padding:'10px',width:'60%',margin:'auto'}}>
                      <label style={{marginBottom:'8px'}}>
                        <b>Email</b>
                      </label><br/>
                      <input className="Login-margin-left-more border border-secondary border-2" name="email" type="email" value={user.email} onChange={ok} autoComplete='off' id="floatingInput" placeholder="name@example.com" required={true} /><br/>
                      <label>
                        <b>Password</b>
                      </label><br/>
                     <input className="Login-margin-left border border-secondary border-2" name="password" type="password" value={user.password} onChange={ok} autoComplete='off' id="floatingPassword" placeholder="Password"/>
                     <br/>
                      <div className="clearfix">
                      <button style={{width:"30%"}} className="btn btn-primary border-radius-3 border border-dark" type="submit" onClick={getuser} id="btn"><b>Login</b></button>
                      </div>
                      </div>
                    </div>
                  </form>
                </div>
    )
}
