import React from 'react'
import { useAuth } from '../../../../context/AuthProvider'

export default function Avatar() {
    const [authUser, setAuthUser] = useAuth()
    
    let avatarName = ""

    if (authUser && authUser.fullname) {
        const name = authUser.fullname.split(" ")
        const firstName = name[0] ? name[0][0] : ""
        const lastName = name[1] ? name[1][0] : ""
        avatarName = firstName + lastName

    }
    console.log(avatarName);
    console.log(authUser);
    return (
        <div>
            <div className='font-bold bg-blue-500 rounded-full w-[3.5rem] h-[3.5rem] flex items-center justify-center'>
                <span className='text-center'>{avatarName.toUpperCase()}</span>
            </div>
        </div>
    )
}
