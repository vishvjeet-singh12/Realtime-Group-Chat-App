import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './welcome.css'

export const Welcome = () => {
    const { id } = useParams()
    console.log(id)
    return (
        <div className="mt-5 p-5 w-50 text-center border-radius-3 text-dark border border-dark">
            <div >
                <h2 className="text-dark mb-5"> Welcome to Group Chat</h2>
            </div>
            <div className="mt-5 mb-2 w-100 d-flex justify-content-center">
                <h4>Existing User</h4>
            </div>
            <div>

                <Link to="/login"><div className="btn button-cyan border-radius-3 text-dark border border-dark">Login</div></Link>

            </div>
            <div className="mt-5 mb-2 w-100 d-flex justify-content-center">
                <h4>New User</h4>
            </div>
            <div>
                <Link to="/register"><div className="btn button-cyan border-radius-3 text-dark border border-dark">Register</div></Link>
            </div>
            {

                id == 1 ? <div><h5> You have been logged out!</h5> </div> : ""}
        </div>

    )
}