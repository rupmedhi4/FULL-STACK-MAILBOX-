import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthProvider';

export default function SingleMail() {
    const { id } = useParams();
    const [mail, setMail] = useState(null);
    const [, , selectedBtn, , , , , , unreadMail, setUnreadMail] = useAuth();

    useEffect(() => {
        const fetchMail = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/mail/showMail/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                });
                if (res.status === 201) {
                    setMail(res.data);
                }
            } catch (error) {
                alert("Something went wrong");
            }
        };
        fetchMail();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                {mail ? (
                    <>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Receiver:</h2>
                            <p className="text-gray-700">{mail.receiverMail.email}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Sender:</h2>
                            <p className="text-gray-700">{mail.senderMail.email}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Subject:</h2>
                            <p className="text-gray-700">{mail.data.subject}</p>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-gray-900">Message:</h2>
                            <p className="text-gray-700">{mail.data.message}</p>
                        </div>
                    </>
                ) : (
                    <h1 className="text-xl font-bold text-gray-900">Mail not found</h1>
                )}
            </div>
        </div>
    );
}
