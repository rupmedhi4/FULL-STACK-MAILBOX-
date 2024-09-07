import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create Auth Context
const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(undefined); // Initial state undefined
  const [selectedBtn, setSelectedBtn] = useState(null);
  const [receivedMail, setReceivedMail] = useState(null);
  const [sendMail, setSendMail] = useState(null);
  const [unreadMail, setUnreadMail] = useState(0);

  // useEffect to initialize the authUser on component mount
  useEffect(() => {
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("user");

    if (initialUserState) {
      setAuthUser(JSON.parse(initialUserState));
    }
    console.log(initialUserState);
  }, []); // Empty dependency array ensures this effect runs only once after the first render

 

  // Context value
  const contextValue = 
    [
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
    ]
  

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
