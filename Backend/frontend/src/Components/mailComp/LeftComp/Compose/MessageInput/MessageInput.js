import axios from 'axios'
import React, { useState } from 'react'

export default function MessageInput() {
    const [to, setTo] = useState(null)
    const [subject, setSubject] = useState(null)
    const [message, setMessage] = useState(null)

    const mailHandler = (e) => {
        e.preventDefault()
        const val = e.target.value
        const id = e.target.id
        if (id === 'to') {
            setTo(val)
        } else if (id === "subject") {
            setSubject(val)
        } else {
            setMessage(val)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const data = {
            receiverMail: to,
            subject,
            message
        }
        try {
            const res = await axios.post("http://localhost:4000/mail/send", data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })

            if (res.status === 201) {
                alert("Receiver mail does not exist")
            } else {
                alert("Mail sent successfully")
                console.log(res);
            }
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">

            <h1 className='text-2xl font-bold text-center bg-[#1880b5] text-white p-4 rounded-t-lg'>New Message</h1>

            <form onSubmit={submitHandler} className="space-y-4">

                <div className='flex items-center border-dotted border-2 border-yellow-400 p-4 rounded'>
                    <span className='text-lg font-medium'>To</span>
                    <input onChange={mailHandler} id='to' type="text" placeholder='Example@gmail.com' className='w-full ml-2 p-2 border-none outline-none focus:ring-2 focus:ring-yellow-400 rounded' />
                </div>

                <input onChange={mailHandler} id='subject' type="text" placeholder='Subject' className='w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded' />

                <textarea onChange={mailHandler} id='message' className='w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none rounded' rows='9' placeholder='Message'></textarea>

                <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300'>Submit</button>
                
            </form>
        </div>
    )
}
