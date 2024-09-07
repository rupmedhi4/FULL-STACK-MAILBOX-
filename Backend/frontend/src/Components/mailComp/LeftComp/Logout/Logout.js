import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthProvider';

export default function Logout() {

  const navigate = useNavigate()
  const [authUser, setAuthUser] =useAuth()

  const logoutHandler = async () => {
    try {

      const res = await axios.post("/api/user/logout",{}, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })

      if(res.status === 201){
        localStorage.removeItem("user")
        Cookies.remove('jwt')
        alert("logout successfully")
        setAuthUser(null)
        navigate("/login")
      }else{
        alert("something went wrong")

      }

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <button className='  bg-sky-600 rounded-md p-2 pl-6 pr-6 font-bold' onClick={logoutHandler}>Logout</button>
    </div>
  )
}
