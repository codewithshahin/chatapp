import React from "react";
import Chatbox from "./Chatbox";
import "./Messenger.css";
import Sidebar from "./Sidebar";
const Messenger = ({ users,user, selectedUser, myMessages, yourMessages , messages, sendMessage , logout}) => {
  return (
    <div className="wrapper">
      {/* Sidebar users all */}
      <Sidebar users={users} User={user} />
      {/* Main content */}
      <Chatbox sendMessage={sendMessage} users={users} selectedUser={selectedUser} my={myMessages} you={yourMessages} messages={messages} user={user} logout={logout} />
    </div>
  );
};

export default Messenger;
