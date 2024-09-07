import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom'

export default function useDelete() {
    const [, , , , receivedMail, setReceivedMail] = useAuth();
    const navigate = useNavigate()

    const token = Cookies.get("jwt");

    const allReceivedMails = async () => {
        try {
            const res = await axios.get(`/api/mail/allReceiveMails`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                withCredentials: true
            });

            if (res.status === 200) {
                setReceivedMail(res.data);
            }

        } catch (error) {
            return error.message
        }
    };

    const mailDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/mail/deleteMail/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                withCredentials: true
            });

            if (res.status === 200) {
                try {
                const mails =    await allReceivedMails();
           

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
