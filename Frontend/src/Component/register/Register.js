
import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
// import './Register.css'

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
                                window.alert("registration successfull")
                                let userInformation = result.data
                                setInfo({ userInformation })
                                navigate("/login")
                                //  let use =  userInfo.userInformation.username
                                //   history.push('/DATA/'+ userInformation.username)

                            }
                            else {
                                window.alert(result)
                                console.log(result)
                            }
                        }).catch((error) => {
                            console.log(error)
                            window.alert(error)
                        });
                    }
                    else {
                        window.alert("email is not valid")
                    }

                }
                catch (e) {
                    console.log(e)

                }
            }
            else {
                window.alert("password and cnfpassword should be same")
            }
        }
        else {
            window.alert("fill all fields")
        }
    }
    return (
        <>
            <div className="mt-4">
                <div className="text-center">
                    <h2 className="">Register</h2>
                </div>
                <div>
                    <form >
                        <div className=" d-flex justify-content-center mt-4">
                            <div className="w-10 text-left"><label for=""> <b>Full Name</b></label></div>
                            <div><input type="text" name="name" id="fname" className="fname" value={userData.name} onChange={ok} /></div>
                        </div>
                        <div className=" d-flex justify-content-center mt-4">
                            <div className="w-10 text-left "> <label for="" className="text-left"> <b>Email</b></label></div>
                            <div> <input type="text" name="email" id="email" className="email" value={userData.email} onChange={ok} /></div>
                        </div>
                        <div className=" d-flex justify-content-center mt-4">
                            <div className="w-10"><label className="label"> <b>Password</b></label></div>
                            <div><input type="password" name="password" id="pwd" className="pwd" value={userData.password} onChange={ok} /></div>
                        </div>
                        <div className="text-center d-flex justify-content-center mt-4">
                            <div className="w-10"><label className="label"> <b>Confirm Password</b></label></div>
                            <div><input type="password" name="confirmPassword" id="pwd1" value={userData.confirmPassword} onChange={ok} /></div>
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" id="btn" className="btn button-cyan " onClick={getuser}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
