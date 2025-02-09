import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './welcome.css'

export const Welcome = () => {
    const { id } = useParams()

    return (
        <div
        style={{
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
        }}
      >
        <div className="content p-5 text-center border-radius-3 text-dark border border-dark bg-white shadow-lg" style={{ maxWidth: "600px", width: "90%" }}>
          <h2 style={{color:'red'}} className="mb-4">Welcome to Group Chat<hr style={{color:'red'}}/></h2>
  
          <div className="mt-4">
            <h4>Existing User</h4>
            <Link to="/login">
              <div className="btn btn-primary mt-2">Login</div>
            </Link>
          </div>
  
          <div className="mt-4">
            <h4>New User</h4>
            <Link to="/register">
              <div className="btn btn-success mt-2">Register</div>
            </Link>
          </div>
  
          {id === 1 && <div className="mt-4"><h5>You have been logged out!</h5></div>}
        </div>
      </div>

    )
}