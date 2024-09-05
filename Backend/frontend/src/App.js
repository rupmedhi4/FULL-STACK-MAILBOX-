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

function App() {
  const [authUser] = useAuth();
  console.log(authUser);

  return (
    <div className="flex">
      <BrowserRouter>
        {/* Left side component */}
        {
          authUser ?
            <div className="min-w-[20%]">
              {authUser && <Left />}
            </div> : null
        }


        {/* Main content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
            <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
            <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="/compose/mail" element={authUser ? <ComposeMail /> : <Navigate to="/login" />} />
            <Route path="/inbox/received/mail" element={authUser ? <ReceivedMail /> : <Navigate to="/login" />} />
            <Route path="/inbox/send/mail" element={authUser ? <AllSendMails /> : <Navigate to="/login" />} />
            <Route path="/mails/mail/:id" element={authUser ? <SingleMail /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
