import React, { useRef, useState } from "react";
import MainChats from "./MainChats";

const Chatbox = ({
  users,
  user,
  selectedUser,
  my,
  you,
  messages,
  sendMessage,
  logout,
  setStatus,
  status
}) => {
  const messRef = useRef(null)
  return (
    <aside class="chatbox">
      {selectedUser?.email ? (
        <>
          {/* Header */}
          <Header status={status} setStatus={setStatus} selectedUser={selectedUser} logout={logout} />
          {/* Messages */}
          <MainChats ref={messRef}
            users={users}
            my={my}
            you={you}
            messages={messages}
            user={user}
            selectedUser={selectedUser}
          />
          {/* Footer */}
          <Footer messRef={messRef}
            sendMessage={sendMessage}
            user={user}
            selectedUser={selectedUser}
          />
        </>
      ) : (
        <div className="no-selected">
          <h2>Please select a user to start conversation</h2>
        </div>
      )}
    </aside>
  );
};
const Header = ({ selectedUser, logout, status, setStatus }) => {
  return (
    <header class="chat-box header">
      <div className="mobile-menu" onClick={() => setStatus(!status)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <img src={selectedUser?.photoURL} alt="person" class="person-logo3" />
      <span class="person-name">{selectedUser?.username}</span>
      <i
        className="fa fa-sign-out logout"
        aria-hidden="true"
        onClick={() => {
          if (window.confirm("are you sure?")) {
            logout();
          }
        }}
      ></i>
    </header>
  );
};

const Footer = ({ sendMessage, user, selectedUser,messRef }) => {
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    if (message.length > 0) {
      sendMessage(user, selectedUser, message);
      setMessage("");
      messRef?.current?.scrollIntoView({ behavior: "smooth" })
    }
  };
  return (
    <footer>
      <input
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage();
          }
        }}
        onChange={(e) => setMessage(e.target.value)}
        class="message-input"
        type="text"
        value={message}
        placeholder="type message"
      />
    </footer>
  );
};

export default Chatbox;
