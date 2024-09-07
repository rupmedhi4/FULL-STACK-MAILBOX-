import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth } from '../../../../../context/AuthProvider';

export default function useSendMail() {

  const [, , , , receivedMail, setReceivedMail,sendMail,setSendMail] = useAuth();

  const token = Cookies.get("jwt");

  const AllMail = async () => {
    try {
        const res = await axios.get("/api/mail/allReceiveMails", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });

        if(res.status === 200){
            setReceivedMail(res.data);
            // console.log(res.data);
        }
    } catch (error) {
        alert("something went wrong");
        // console.log(`Error in AllMail: ${error}`);
    }
};




  const allSendMails = async () => {
    try {
      const res = await axios.get('/api/mail/allSendMails', {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      });

      if (res.status === 200) {
        setSendMail(res.data);
      }
    } catch (error) {
      alert("something went wrong")
      console.error(error.message);
    }
  };

  const sendMailDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/mail/deleteMail/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      });

      if (res.status === 200) {
        setSendMail(prevMails => prevMails.filter(mail => mail._id !== id));
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };



  return { sendMail, setSendMail, sendMailDelete, allSendMails,AllMail };
}
