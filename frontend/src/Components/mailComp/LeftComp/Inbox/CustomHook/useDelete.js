import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom'
import useSendMail from './useSendMail';

export default function useDelete() {
    const { receivedMail, setReceivedMail} = useAuth();
    const {AllMail} = useSendMail();
    const navigate = useNavigate()

    const token = Cookies.get("jwt");

    // const allReceivedMails = async () => {
    //     try {
    //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/mail/allReceiveMails`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             withCredentials: true
    //         });

    //         if (res.status === 200) {
    //             setReceivedMail(res.data);
    //         }

    //     } catch (error) {
    //         return error.message
    //     }
    // };

    const mailDelete = async (id) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/mail/deleteMail/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                withCredentials: true
            });

            if (res.status === 200) {
                try {
                    const mails =    await AllMail();
                    alert(res.data.message);
                } catch (error) {
                    alert(error.message);
                }
                
            }

        } catch (error) {
            alert(error.message);
        }
    };

    return { mailDelete }; 
}
