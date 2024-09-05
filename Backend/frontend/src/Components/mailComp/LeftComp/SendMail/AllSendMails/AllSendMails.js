import React, { useEffect } from 'react';
import useSendMail from '../../Inbox/CustomHook/useSendMail';
import { useAuth } from '../../../../../context/AuthProvider';
import AllListSendMail from './AllListSendMail';

export default function AllSendMails() {
  const [, , , , , , sendMail, setSendMail] = useAuth();
  const { allSendMails } = useSendMail()

  useEffect(() => {
    allSendMails();
  }, []);

console.log(sendMail);
  return (
    <div className={`bg-gray-100 p-4 rounded-lg shadow-lg mt-4 max-w-[80%] mx-auto`}>
      <h2 className='text-2xl font-bold mb-4'>Send Mails</h2>
      <div className='space-y-4'>
        {
          sendMail && sendMail.length > 0 ? sendMail.map(mail => (
            <AllListSendMail mail={mail} id={mail._id} key={mail._id} />
          )) : <h2>Send mail not found</h2>
        }
      </div>
    </div>
  );
}
