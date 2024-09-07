import React from 'react'
import { useAuth } from '../context/AuthProvider';
import Login from './authComp/Login';

export default function PrivateCmp({component}) {
    const [authUser] = useAuth();
  return (
    <>
      {
        authUser? component : <Login/>

      }
    </>
  )
}
