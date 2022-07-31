import React from "react";
import { urlify } from "../../utlis/lib";

const MainChats = ({ my, you, user, selectedUser,ref }) => {
  return (
    <>
      {/* Main All Chats */}
      <main className="main" ref={ref}>
        {selectedUser?.email ? (
          <div className="message-wrapper">
            {you?.messages?.map((message, index) => (
              <Sender
                message={message}
                key={index}
                selectedUser={selectedUser}
              />
            ))}
            {my?.messages?.map((message, index) => (
              <Reciver message={message} key={index} user={user} />
            ))}
          </div>
        ) : (
          <div className="no-selected">
            <p>Please select a user start convercation</p>
          </div>
        )}
      </main>
    </>
  );
};

const Sender = ({ message, selectedUser }) => {
  return (
    <>
      <div className="sender">
        <span>{message?.sendDate}</span>
        <div className="sender-info">
          <div className="sender-avatar">
            <img className="person-logo2" src={selectedUser?.photoURL} alt="user" />
          </div>
          <div className="sender-message">
            <p dangerouslySetInnerHTML={{__html:urlify(message?.message)}}></p>
          </div>
        </div>
      </div>
    </>
  );
};

const Reciver = ({ message, user }) => {
  return (
    <div className="reciver">
      <span>{message?.sendDate}</span>
      <div className="reciver-info">
        <div className="reciver-avatar">
          <img className="person-logo2" src={user?.photoURL} alt="user" />
        </div>
        <div className="reciver-message">
        <p dangerouslySetInnerHTML={{__html:urlify(message?.message)}}></p>
        </div>
      </div>
    </div>
  );
};

export default MainChats;
