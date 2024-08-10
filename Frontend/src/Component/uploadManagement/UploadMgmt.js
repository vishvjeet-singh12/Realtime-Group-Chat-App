import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import { NotAccess } from '../NotAccess';
import { Topnav } from '../topNav/Topnav';

export const UploadMgmt = () => {
    const { email } = useParams();
    const [file, setfile] = useState({})

    const [description, setDes] = useState({
        des: ""
    })
    const navigate = useNavigate()
    const datavalue = (e) => {
        console.log(email)
        let imgfile = e.target.files[0]
        let form = new FormData()
        form.append("file", imgfile)
        form.append("des", description.des)
        form.append("share_by", email)
        console.log(imgfile)
        setfile(form)
    }
    const insertdes = (e) => {
        let descript = e.target.value
        console.log(descript)
        setDes({ ...description, ["des"]: descript })
    }
    const uploadDoc = async (e) => {

        try {
            e.preventDefault();
            console.log(file.get("file"))
            console.log(file.get("des"))
            await axios.post("http://localhost:7000/upload", file).then((res) => {
                window.alert("File Uplode successfull")
                navigate(`/manageDocument/`)
            }).catch((err) => {
                window.alert(err)
            });


            // let doc = form.get("doc")
            // setfile(doc)


        }
        catch (e) {
            console.log(e)

        }

    }
    return (
        <div>
            <Topnav />
            <div>
                <form encType="multipart/form-data">
                    <div className="text-center mt-4">
                        <h2 className="head">Upload</h2>
                    </div>
                    <div className="text-center mt-4">
                        <span> <b>File Description</b></span>
                        <input type="text" name="description" value={description.des} onChange={insertdes} className="Login-margin-left  border border-secondary border-2" />
                    </div>
                    <div className="text-center Login-margin-left-more mt-4">
                        <label className="fileupload "> <b>File Upload</b></label>
                        <input type="file" name="doc" class="up" onChange={datavalue} className="Login-margin-left" />
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary " type="submit" onClick={uploadDoc} ><b >Upload Now</b></button>
                        <button className="btn btn-secondary " ><b className="ml-3">Cancel</b></button>
                    </div>
                </form>
            </div>
        </div>
    )
}
