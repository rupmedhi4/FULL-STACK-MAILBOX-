import React, { useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../../../../../socket';

export default function MessageInput() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const mailHandler = (e) => {
    const { id, value } = e.target;
    if (id === 'to') {
      setTo(value);
    } else if (id === 'subject') {
      setSubject(value)
    } else {
      setMessage(value)
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = { receiverMail: to, subject, message };

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/mail/send`, data, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      if (res.status === 201) {
        alert("Receiver mail does not exist");
      } else {
        alert("Mail sent successfully");
        const emitData = res.data.user;
        socket.emit("mailSent", { emitData });
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong: " + error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className='text-2xl font-bold text-center bg-[#1880b5] text-white p-4 rounded-t-lg'>New Message</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <div className='flex items-center border-dotted border-2 border-yellow-400 p-4 rounded'>
          <span className='text-lg font-medium'>To</span>
          <input
            id='to'
            type="email"
            placeholder='example@gmail.com'
            value={to}
            onChange={mailHandler}
            className='w-full ml-2 p-2 border-none outline-none focus:ring-2 focus:ring-yellow-400 rounded'
            required
          />
        </div>
        <input
          id='subject'
          type="text"
          placeholder='Subject'
          value={subject}
          onChange={mailHandler}
          className='w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded'
          required
        />
        <textarea
          id='message'
          rows='9'
          placeholder='Message'
          value={message}
          onChange={mailHandler}
          className='w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded'
          required
        ></textarea>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
