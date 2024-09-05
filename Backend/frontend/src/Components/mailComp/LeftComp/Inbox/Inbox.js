import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom'
import useSendMail from './CustomHook/useSendMail';

export default function Inbox() {

    const [authUser, setAuthUser, selectedBtn, setSelectedBtn, receivedMail, setReceivedMail, , , unreadMail,setUnreadMail] = useAuth()

    const { AllMail } = useSendMail()


    const navigate = useNavigate()

    const InboxToggleHandler = () => {
        setSelectedBtn("inbox")
        navigate("/inbox/received/mail")
    }

    useEffect(() => {
        const unReadMails = async () => {
            await AllMail()
        }
        unReadMails()
    }, [useAuth])

   
    useEffect(()=>{
        if (receivedMail) {
            const unreadCount = receivedMail.filter((mail) => !mail.isRead).length;
            setUnreadMail(unreadCount);
        }
    },[receivedMail])



    return (
        <div className={`flex text-white pl-4 pr-4 pt-2 pb-2  rounded-md min-w-[7rem] mt-2 mb-2 ${selectedBtn === "inbox" ? "bg-green-500" : null} hover:bg-green-500`}>
            <img src="/inbox.png" alt="inbox icon" width="30" height="20" className='max-h-[1.9rem]' />
            <div className='flex flex-col'>
                <button onClick={InboxToggleHandler} >{`Inbox `}</button> 
                <span>{`unread ${unreadMail ? unreadMail : 0}`}</span>
            </div>

        </div>
    )
}
