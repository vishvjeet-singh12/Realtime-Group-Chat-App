
import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
 import './Register.css'
import { toast } from 'sonner';
export const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''

    });


    var [userInfo, setInfo] = useState({})
    const navigate = useNavigate()
    const ok = (e) => {
        let name = e.target.name
        let value = e.target.value
        console.log(name);
        setUserData({ ...userData, [name]: value })
        console.log(value);



    }
    
    const getuser = async (e) => {
        e.preventDefault();
        if (userData.name !== "" && userData.email !== "" && userData.password !== "" && userData.confirmPassword !== "") {
            if (userData.password === userData.confirmPassword) {
                try {
                    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

                    let ismail = pattern.test(userData.email)
                    console.log(ismail)
                    if (ismail) {
                        const { name, email, password, confirmPassword } = userData
                        const res = await fetch("/register", {
                            method: 'post',
                            headers: {
                                'content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name, email, password, confirmPassword
                            }),
                            credentials: 'include'
                        })

                        const data = res.json({}).then((result) => {
                            console.log(res)

                            if (res.status === 200) {
                                let userInformation = result.data
                                setInfo({ userInformation })
                                toast.success("Successfully Registered")
                                navigate("/login")
                                //  let use =  userInfo.userInformation.username
                                //   history.push('/DATA/'+ userInformation.username)

                            }
                            else {
                                toast.error(result)
                                console.log(result)
                            }
                        }).catch((error) => {
                            console.log(error)
                            toast.error(error)
                        });
                    }
                    else {
                        toast.error("email is not valid")
                    }

                }
                catch (e) {
                    console.log(e)

                }
            }
            else {
                toast.erro("password and cnfpassword should be same")
            }
        }
        else {
            toast.error("fill all fields")
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
                    <form style={{width:'40%'}}>
                    <div className='content'>
                    <h1 className="text-center" style={{fontSize:'23px'}}>Sign Up</h1>
                    <h4 className="text-center mb-5" style={{fontSize:'18px'}}>
                      Please fill this form to create an account.
                      <hr/>
                    </h4>
                            <label for=""> <b>Full Name</b></label><br/> 
                            <input type="text" name="name" id="fname" className="fname" value={userData.name} onChange={ok} /><br/>
                        
                            <label for="" className="text-left"> <b>Email</b></label><br/>
                            <input type="text" name="email" id="email" className="email" value={userData.email} onChange={ok} /><br/>
                         
                        <label className="label"> <b>Password</b></label><br/>
                        <input type="password" name="password" id="pwd" className="pwd" value={userData.password} onChange={ok} /><br/>
                        
                        
                            <label className="label"> <b>Confirm Password</b></label><br/>
                            <input type="password" name="confirmPassword" id="pwd1" value={userData.confirmPassword} onChange={ok} /><br/>
                    
                        <div className="text-center mt-4">
                            <button type="submit" id="btn" className="btn btn-primary border-radius-3 border border-dark" style={{width:'30%'}} onClick={getuser}>Register</button>
                        </div>
                        </div>
                    </form>
                </div>
    )
}
