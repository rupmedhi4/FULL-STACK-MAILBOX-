import React, { useEffect } from 'react';
import { useAuth } from '../../../../../context/AuthProvider';
import ShowSingleMail from './ShowSingleMail';
import axios from 'axios';
import useSendMail from '../CustomHook/useSendMail';

export default function ReceivedMail() {

    const { AllMail } = useSendMail()
    const [, , , , receivedMail] = useAuth();

    useEffect(() => {
        const fetchMail = async () => {
            try {
                await AllMail();
            } catch (error) {
                alert("something went wrong");
                console.error('Failed to fetch mail:', error);
            }
        };

        fetchMail();
    }, []);

    return (
        <div className='bg-gray-100 p-4 rounded-lg shadow-lg mt-4 max-w-[80%] mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Received Mails</h2>
            <div className='space-y-4'>
                {
                    receivedMail && receivedMail.length > 0 ? receivedMail.map((mail) => (
                        <ShowSingleMail mail={mail} id={mail._id} key={mail._id} />
                    )) : <h2>No mail Found</h2>
                }
            </div>
        </div>
    );
}
