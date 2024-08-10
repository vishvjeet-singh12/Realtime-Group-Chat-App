
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from "./Component/login/Login"
import { Register } from "./Component/register/Register"
import { Logdin } from "./Component/login/Logdin"
import { Usermangement } from "./Component/usermanagement/usermangement"
import { RegisterSuccess } from "./Component/registerSuccess/registerSucess"
import { Welcome } from "./Component/welcome/welcom"
import { UploadManagement } from "./Component/uploadManagement/uploadManagement"
import { Loggedin } from './Component/chatManagmt/Loggedin';
import { Chatmgmt } from './Component/chatManagmt/chatmgmt';
import { Managedocument } from './Component/manageDocument/Managedocument';
import { Loginsuccess } from './Component/loginSuccess/loginsuccess';
import { EditUser } from './Component/editUser/EditUser';

// import Welcome from './Component/register/welcome/Welcome';
// import Register from './Component/register/Register';


const App = (props) => {
  return (
    <Router>

      <div className="App">

        {/* <Welcome/>
      <Register/> */}
        <Routes>

          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Logged" element={<Logdin />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/usermangement" element={<Usermangement />} />
          <Route exact path="/registersuccess" element={<RegisterSuccess />} />
          <Route exact path="/uploadManagement" element={<UploadManagement />} />
          <Route exact path="/" element={<Welcome />} />
          {/* <Route exact path="/Sharecompoment/:email" element={<ShareComponent/>} /> */}
          <Route exact path="/Chatmgmt" element={<Loggedin />} />
          <Route exact path="/manageDocument" element={<Managedocument />} />
          <Route exact path="/Loginsuccess" element={<Loginsuccess />} />
          <Route exact path="/Edit/:Editemail/:name/:email" element={<EditUser />} />
          {/* <Route exact path="/GroupChat/:email" element={<Loginsuccess/>} /> */}
          <Route exact path="/:id" element={<Welcome />} />


          {/* <Route exact path='/' element={<Welcome/>} /> */}

        </Routes>
      </div>

    </Router>




  );
}

export default App;
