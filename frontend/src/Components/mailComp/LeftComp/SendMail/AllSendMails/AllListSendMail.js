import React, { useState } from 'react';
import useSendMail from '../../Inbox/CustomHook/useSendMail';
import { useNavigate } from 'react-router-dom';

export default function AllListSendMail({ mail }) {
    const [starClick, setStarClick] = useState(false);
    const { sendMailDelete } = useSendMail();
    const navigate = useNavigate()

    const msg = mail.message.length > 30 ? `${mail.message.substring(0, 30)}...` : mail.message;

    const starHandler = () => {
        setStarClick(!starClick);
    };

    const showSingleMailHandler = (id) => {
        navigate(`/mails/mail/${id}`)

    }

    return (
        <div className='flex justify-between'>

            <img
                className="cursor-pointer"
                src={starClick ? "/color-star.png" : "/star.png"}
                alt="star icon"
                width="30"
                height="30"
                onClick={starHandler}
            />

            <div key={mail._id} className={`${mail.isRead ? null : "font-bold"} flex-grow flex  cursor-pointer border-b border-gray-300 py-2`} onClick={() => showSingleMailHandler(mail._id)}>

                <h2 className='ml-2 flex-grow pt-1'>{mail.subject}</h2>
                <h2 className='ml-2 flex-grow pt-1 max-w-[22rem] mr-[8rem] '>
                    {msg} Read more...
                </h2>

            </div>


            <img
                className="cursor-pointer"
                src="/delete.png"
                alt="delete icon"
                onClick={() => sendMailDelete(mail._id)}
            />


        </div>

    );
}
