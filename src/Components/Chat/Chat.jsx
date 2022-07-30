import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatService from "../../lib/server";
import { onValue, ref, db, sendMessage } from "../../config/firebaseConfig";
import { getSlug } from "../../utlis/lib";
const Chat = () => {
  const { users, user } = ChatService();
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
        const all = []
        for(let key in data){
            all.push(data[key])
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
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 d-sm-none d-md-block">
            <UserLists users={users} messages={messages} User={user} />
          </div>
          <div className="col-lg-8 col-sm-12">
            <ChatBox
              sendMessage={sendMessage}
              user={user}
              you={you}
              my={my}
              toUser={toUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ChatBox = ({ user, toUser, my, you }) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    sendMessage(user, toUser, message);
  };

  return (
    <div
      className="card shadow-md"
      style={{
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <div className="card-header">
        <div className="profile d-flex">
          <div className="left">
            <img src={toUser?.photoURL} alt="userlogo" className="w-25" />
          </div>
          <div className="right">
            <span>{toUser?.username}</span>
            <span>{toUser?.email}</span>
          </div>
        </div>
      </div>
      <div className="card-body">
        {you?.messages?.map((m, index) => (
          <div key={index} className="message-recive box-style">
            <p>{m?.message}</p>
            <span>{m?.sendDate}</span>
          </div>
        ))}
        {my?.messages?.map((m, index) => (
          <div className="message-send box-style" key={index}>
            <p>{m?.message}</p>
            <span>{m?.sendDate}</span>
          </div>
        ))}
      </div>
      <div className="card-footer">
        <input
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          className="form-control w-full"
          type="text"
          placeholder="type message..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </div>
  );
};

const UserLists = ({ users, messages, User }) => {
  return (
    <ol class="list-group list-group-numbered">
      {users?.map((user) => (
        <li
          key={user?.slug}
          class="list-group-item d-flex justify-content-between align-items-start"
        >
          <div class="ms-2 me-auto">
            <div class="fw-bold">
              <Link to={`/${user?.slug}`}>
                {user.email == User.email ? "Me" : user?.username}
              </Link>
            </div>
          </div>
          <span class="badge bg-primary rounded-pill">
            {messages?.find((u) => user?.email == u?.email)?.messages?.length}
          </span>
        </li>
      ))}
    </ol>
  );
};

export default Chat;
