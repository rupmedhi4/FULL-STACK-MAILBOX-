import React, { useEffect } from 'react';
import { useAuth } from '../../../../../context/AuthProvider';
import ShowSingleMail from './ShowSingleMail';
import useSendMail from '../CustomHook/useSendMail';
import socket from '../../../../../socket';

export default function ReceivedMail() {
  const { AllMail } = useSendMail();
  const { receivedMail, setReceivedMail } = useAuth();

  useEffect(() => {
    const fetchMail = async () => {
      try {
        await AllMail();
      } catch (error) {
        alert('Something went wrong');
        console.error('Failed to fetch mail:', error);
      }
    };

    fetchMail();

    const handleNewMail = (data) => {
      const newMail = {
        ...data.emitData,
        _id: data.emitData._id,
      };


      if (receivedMail) {
        setReceivedMail((prevMails) => [newMail, ...prevMails]);
      } else {
        setReceivedMail([newMail]);
      }
    };

    socket.on('newMail', handleNewMail);

    return () => {
      socket.off('newMail', handleNewMail);
    };
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg mt-4 max-w-[80%] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Received Mails</h2>
      <div className="space-y-4">
        {receivedMail && receivedMail.length > 0 ? (
          receivedMail.map((mail) => (
            <ShowSingleMail key={mail._id || mail.id} mail={mail} />
          ))
        ) : (
          <h2>No mail found</h2>
        )}
      </div>
    </div>
  );
}
