import React, { useEffect, useState } from 'react'
import { NotAccess } from '../NotAccess'
import { ManagedocumentData } from './ManagedocumentData'
export const Managedocument = () => {
    const [users, setUsers] = useState([])
    const [islogin, setlogin] = useState(0)
    const fetchDoc = async () => {
        try {
            const res = await fetch(`/userImg`,
                {
                    method: 'get',
                    headers: {
                        'content-Type': 'application/json'
                    },

                    credentials: 'include'
                })

            const data = res.json({}).then((result) => {
                console.log(result)

                if (res.status === 200) {


                    setUsers(result)
                    setlogin(1)
                    //  setInfo({userInformation})
                    //  let use =  userInfo.userInformation.username
                    //   history.push('/DATA/'+ userInformation.username)              
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

    useEffect(() => {
        fetchDoc()

    }, [])



    return (

        <div>
            {islogin == 1 ? <ManagedocumentData data={users} fun={fetchDoc} /> : <NotAccess />}
        </div>
    )
}
