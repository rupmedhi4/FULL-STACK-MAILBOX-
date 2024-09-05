import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuth } from '../../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function SendMail() {

    const [authUser, setAuthUser, selectedBtn, setSelectedBtn] = useAuth()

    const navigate = useNavigate()

    const sendMailToggleHandler = () => {
        setSelectedBtn("sendmail")
        navigate("/inbox/send/mail")
    }

    
    return (
        <div className={`flex text-white pl-4 pr-4 pt-2 pb-2  rounded-md min-w-[7rem] ${selectedBtn === "sendmail" ? "bg-green-500" : null} hover:bg-green-500`}>

            <img src="/send.png" alt="inbox icon" width="30" height="20" className='text-yellow-300' />
            
            <button onClick={sendMailToggleHandler} >Send</button>

        </div>
    )
}