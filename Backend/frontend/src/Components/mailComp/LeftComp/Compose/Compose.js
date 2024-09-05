import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthProvider'


export default function Compose() {
    const navigate = useNavigate()
    const [authUser,setAuthUser,selectedBtn,setSelectedBtn]=useAuth()

    const composeHandler = ()=>{
        setSelectedBtn("compose")
        navigate("/compose/mail")
    }


    return (
        <div className='pt-4'>
            
            <button onClick={composeHandler} className={` text-white pl-4 pr-4 pt-2 pb-2  rounded-md min-w-[7rem] ${selectedBtn === "compose" ?"bg-green-500" :null} hover:bg-green-500`}>Compose</button>

        </div>

    )
}
