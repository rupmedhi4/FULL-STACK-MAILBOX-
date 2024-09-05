import React, { createContext, useContext, useState } from 'react'
import Cookies from 'js-cookie'


const AuthContext = createContext()

export default function AuthProvider({ children }) {

  const initialUserState = (Cookies.get("jwt") && localStorage.getItem("user")) ? Cookies.get("jwt") || localStorage.getItem("user")
: null


  const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined)
  const [selectedBtn, setSelectedBtn] = useState(null)
  const [receivedMail, setReceivedMail] = useState(null)
  const [sendMail, setSendMail] = useState(null);
  const [unreadMail, setUnreadMail] = useState(0);


  return (
    <AuthContext.Provider value={[authUser, setAuthUser, selectedBtn, setSelectedBtn, receivedMail, setReceivedMail, sendMail, setSendMail,unreadMail,setUnreadMail]}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => {
  return useContext(AuthContext)
}
