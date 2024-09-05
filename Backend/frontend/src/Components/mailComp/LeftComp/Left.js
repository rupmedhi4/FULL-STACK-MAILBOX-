import React, { useState } from 'react';
import Compose from './Compose/Compose';
import Inbox from './Inbox/Inbox';
import SendMail from './SendMail/SendMail';
import Logout from './Logout/Logout';
import Avatar from './Avatar/Avatar';

export default function Left() {
  return (
    <div className='bg-purple-950 min-w-[20%] min-h-screen flex flex-col items-center fixed'>
      <div className='flex flex-col items-center pt-[2rem]'>
        <img src="/gmail-icon.png" alt="gmail icon" width="100" height="100" />
        <h1 className='text-[#22D3EE] text-2xl font-bold pt-4'>Mail Box Client</h1>
      </div>

      <div className='flex-grow'>
        <Compose />
        <Inbox />
        <SendMail />
      </div>

      <div className='flex justify-between  w-full  pl-2 pr-2 items-center'>
        <Avatar /> 
        <Logout />
      </div>
    </div>
  );
}
