import React from 'react';
import { useAuth } from '../../context/AuthProvider';
import Left from './LeftComp/Left';

export default function Home() {

  return (
    <div>
     
      <div className='flex min-h-screen bg-[#cd66e6] items-center justify-center'>
        
       <h1 className='font-bold text-white text-3xl'>Welcome to my mail box client</h1>

      </div>
    </div>
  );
}
