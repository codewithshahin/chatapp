import React, { useEffect, useState } from "react";
import { db, ref, onValue } from "../config/firebaseConfig";
import useAuth from "../Hooks/useAuth";
import { getSlug } from "../utlis/lib";
const ChatService = () => {
  const { user: User,logout } = useAuth();
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [status,setStatus] = useState(false);

  //send message
  const sendMessage2 = (sendTo, message) => {
    onValue(ref(db, `messages/${getSlug(User.email)}`), (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        const me = [];
        const you = [];
        for (let key in data) {
          if (data[key] == getSlug(sendTo.email)) {
            you.push(data[key]);
          } else {
            me.push(data[key]);
          }
        }
        setMessages({
          me,
          you,
        });
      } else {
        alert("no user found");
      }
    });
  };

  const sendMessage = (sendTo, message) => {
    onValue(ref(db, `messages/${getSlug(User.email)}`), (snapshot) => {
      if (snapshot.val()) {
        const oldMessage = snapshot.val();

      } else {
      }
    });
  };

  useEffect(() => {
    try {
      onValue(ref(db, `users`), (snapshot) => {
        const data = snapshot.val();
        let allusers = [];
        for (let key in data) {
          allusers.push(data[key]);
        }
        setUser(allusers);
      });
    } catch (error) {}
  }, []);

  return {
    users,
    sendMessage,
    onValue,
    user: User,
    logout,
    status,
    setStatus
  };
};

export default ChatService;
