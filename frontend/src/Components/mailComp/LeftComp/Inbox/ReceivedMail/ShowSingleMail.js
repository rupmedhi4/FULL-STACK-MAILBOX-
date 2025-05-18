import React, { useState, useEffect } from 'react';
import useDelete from '../CustomHook/useDelete';
import { useNavigate } from 'react-router-dom';
import socket from '../../../../../socket';

export default function ShowSingleMail({ mail }) {
  const [starClick, setStarClick] = useState(false);
  const { mailDelete } = useDelete();
  const navigate = useNavigate();

  const msg = mail.message.length > 30 ? mail.message.substring(0, 30) + '...' : mail.message;

 

  const starHandler = () => {
    setStarClick((prev) => !prev);
  };

  const showMailHandler = () => {
    navigate(`/mails/mail/${mail._id}`);
  };

  return (
    <div className='flex justify-between items-center border-b border-gray-300 py-2 px-4'>
      {/* Star Button */}
      <button onClick={starHandler} className='mr-2'>
        <img
          src={starClick ? '/color-star.png' : '/star.png'}
          alt='star icon'
          width='30'
          height='30'
        />
      </button>

      {/* Mail Preview */}
      <div
        onClick={showMailHandler}
        className={`flex-grow flex flex-col cursor-pointer ${mail.isRead ? '' : 'font-bold'}`}
      >
        <span>{mail.subject}</span>
        <span className='truncate text-gray-600 max-w-[28rem]'>{msg}</span>
      </div>

      {/* Delete Button */}
      <button onClick={() => mailDelete(mail._id)} className='ml-2'>
        <img src='/delete.png' alt='delete icon' width='20' height='20' />
      </button>
    </div>
  );
}
