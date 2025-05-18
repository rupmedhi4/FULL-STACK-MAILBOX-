import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(undefined);
  const [selectedBtn, setSelectedBtn] = useState(null);
  const [receivedMail, setReceivedMail] = useState(null);
  const [sendMail, setSendMail] = useState(null);
  const [unreadMail, setUnreadMail] = useState(0);

  useEffect(() => {
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("user");
    
    if (initialUserState) {
      setAuthUser(JSON.parse(initialUserState));
    }
  }, []);



  const contextValue = {
    authUser,
    setAuthUser,
    selectedBtn,
    setSelectedBtn,
    receivedMail,
    setReceivedMail,
    sendMail,
    setSendMail,
    unreadMail,
    setUnreadMail,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
