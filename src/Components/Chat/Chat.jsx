import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatService from "../../lib/server";
import { onValue, ref, db, sendMessage } from "../../config/firebaseConfig";
import { getSlug } from "../../utlis/lib";
import Messenger from "../MessengerClone/Messenger";
const Chat = () => {
  const { users, user, logout, setStatus, status } = ChatService();
  const navigate = useNavigate();
  const [toUser, setToUser] = useState({});
  const { email } = useParams();
  const [my, setMy] = useState({});
  const [you, setYou] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onValue(ref(db, `messages/${getSlug(user.email)}`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMy(data?.receivers?.find((user) => user?.email == toUser.email));
      }
    });
    onValue(ref(db, `messages/${toUser.slug}`), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setYou(data?.receivers?.find((u) => u?.email == user.email));
      }
    });
  }, [user, toUser]);

  useEffect(() => {
    onValue(ref(db, `messages`), (snapshot) => {
      const data = snapshot.val();
      const all = [];
      for (let key in data) {
        all.push(data[key]);
      }
      setMessages(all);
    });
  }, []);

  useEffect(() => {
    if (email) {
      onValue(ref(db, `users/${email}`), (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setToUser(data);
        }
      });
    }
  }, [email]);
  
  return (
    <>
      <Messenger
        setStatus={setStatus}
        status={status}
        users={users}
        selectedUser={toUser}
        myMessages={my}
        yourMessages={you}
        messages={messages}
        sendMessage={sendMessage}
        user={user}
        logout={logout}
      />
    </>
  );
};

export default Chat;
