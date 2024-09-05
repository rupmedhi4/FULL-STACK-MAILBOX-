import React, { useState } from 'react'
import useDelete from '../CustomHook/useDelete'
import { useNavigate } from 'react-router-dom'

export default function ShowSingleMail({ mail, id }) {

    const [starClick, setStarClick] = useState(false)
    const {mailDelete} = useDelete()
    const navigate = useNavigate()

    const msg = mail.message.length > 10 ? mail.message.substring(0, 30) : null


    const starHandler = () => {
        setStarClick(!starClick)
    }

    const showMailHandler =(id)=>{
        navigate(`/mails/mail/${id}`)
    }

    return (
        <>
            <div key={id} className={`${ mail.isRead ? null: "font-bold" } flex cursor-pointer border-b border-gray-300 py-2` }onClick={()=>showMailHandler(id)}>

                <img src={starClick === true ? "/color-star.png" : "/star.png"} alt="star icon" width="30" height="30" onClick={starHandler} />

                <h2 className='ml-2 flex-grow pt-1'>{mail.subject}</h2>
                <h2 className='ml-2 flex-grow pt-1 max-w-[22rem] mr-[8rem] '>{msg ? msg : mail.message} Read more...</h2>

                <img src="/delete.png" alt="delete icon" onClick={()=>mailDelete(id)}/>

            </div>
            
        </>
    )
}