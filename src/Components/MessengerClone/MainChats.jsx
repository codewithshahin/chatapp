import React from "react";
import { urlify } from "../../utlis/lib";

const MainChats = ({ my, you, user, selectedUser,ref }) => {
  return (
    <>
      {/* Main All Chats */}
      <main class="main" ref={ref}>
        {selectedUser?.email ? (
          <div class="message-wrapper">
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
      <div class="sender">
        <span>{message?.sendDate}</span>
        <div class="sender-info">
          <div class="sender-avatar">
            <img class="person-logo2" src={selectedUser?.photoURL} alt="user" />
          </div>
          <div class="sender-message">
            <p dangerouslySetInnerHTML={{__html:urlify(message?.message)}}></p>
          </div>
        </div>
      </div>
    </>
  );
};

const Reciver = ({ message, user }) => {
  return (
    <div class="reciver">
      <span>{message?.sendDate}</span>
      <div class="reciver-info">
        <div class="reciver-avatar">
          <img class="person-logo2" src={user?.photoURL} alt="user" />
        </div>
        <div class="reciver-message">
        <p dangerouslySetInnerHTML={{__html:urlify(message?.message)}}></p>
        </div>
      </div>
    </div>
  );
};

export default MainChats;
