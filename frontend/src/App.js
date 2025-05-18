import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from './Components/authComp/Login';
import SignUp from "./Components/authComp/SignUp";
import Home from "./Components/mailComp/Home";
import { useAuth } from "./context/AuthProvider";
import ComposeMail from "./Components/mailComp/LeftComp/Compose/MessageInput/ComposeMail";
import Left from "./Components/mailComp/LeftComp/Left";
import ReceivedMail from "./Components/mailComp/LeftComp/Inbox/ReceivedMail/ReceivedMail";
import AllSendMails from "./Components/mailComp/LeftComp/SendMail/AllSendMails/AllSendMails";
import SingleMail from "./Components/showSingleMail/SingleMail";
import PrivateCmp from "./Components/PrivateCmp";
import { useEffect } from "react";
import socket from "./socket";

function App() {
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser?._id) {
      socket.emit("register", authUser._id);
    }
  }, [authUser]);


  return (
    <div className="flex">
      <BrowserRouter>
        {
          authUser ?
            <div className="min-w-[20%]">
              <Left />
            </div> : null
        }

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<PrivateCmp component={<Home />} />} />
            <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/compose/mail" element={<PrivateCmp component={<ComposeMail />} />} />
            <Route path="/inbox/received/mail" element={<PrivateCmp component={<ReceivedMail />} />} />
            <Route path="/inbox/send/mail" element={<PrivateCmp component={<AllSendMails />} />} />
            <Route path="/mails/mail/:id" element={<PrivateCmp component={<SingleMail />} />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
