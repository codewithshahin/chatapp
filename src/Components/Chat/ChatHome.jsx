import React, { useState, useEffect } from "react";
import useAuth from "../../Hooks/useAuth";
import Loading from "../common/Loading";
import { sendMessage, db, ref, onValue } from "../../config/firebaseConfig";
import "./ChatHome.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSlug } from "../../utlis/lib";
const ChatHome = () => {
  const { user, loading } = useAuth();
  const [message, setMessage] = useState("");
  const { email } = useParams();
  const [messageSends, setSendMessage] = useState({});
  const [users, setUsers] = useState([]);
  const [toUser, setToUser] = useState({});
  const navigate = useNavigate();
  const [myMessages,setMyMessages] = useState({})

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendMessage(user, toUser, message);
    }
  };

  useEffect(() => {
    onValue(ref(db, "users"), (shanshot) => {
      const data = shanshot.val();
      const all = [];
      for (let key in data) {
        all.push(data[key]);
      }
      setUsers(all);
    });

    onValue(ref(db, 'messages/'+getSlug(user.email)), (snapshot)=>{
      const data = snapshot.val();
      setMyMessages(data)
    })
    
    navigate(`/${getSlug(user.email)}`);
  }, []);

  useEffect(() => {
    if (email) {
      onValue(ref(db, "messages/" + email), (snapshot) => {
        const data = snapshot.val();
        setSendMessage(data);
      });
      onValue(ref(db, `users/${email}`), (snapshot) => {
        const data = snapshot.val();
        setToUser(data);
      });
    }
  }, [email]);

  if (loading) return <Loading />;

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <ol className="list-group list-group-numbered">
            {users.map((user) => (
              <li
                key={user.slug}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    <Link to={`/${user?.slug}`}>{user?.username}</Link>
                  </div>
                </div>
                <span className="badge bg-primary rounded-pill">
                  {/* {msg?.messages?.length} */}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="col-lg-8">
          <div className="card shadow-md">
            <div className="card-header">
              <div className="profile d-flex">
                <div className="left">
                  <img src={toUser?.photoURL} alt="userlogo" className="w-25" />
                </div>
                <div className="right">
                  <span>{toUser?.username}</span>
                  <span>({toUser?.email})</span>
                </div>
              </div>
            </div>
            <div className="card-body">
              {messageSends?.recivers
                ? messageSends?.messages?.map((message, index) => (
                    <div key={index} className="message-recive box-style">
                      <p>{message}</p>
                    </div>
                  ))
                : null}
              {myMessages?.messages
                ? myMessages?.messages?.map((message, index) => (
                    <div key={index} className="message-send box-style">
                      <p>me: {message}</p>
                    </div>
                  ))
                : null}
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
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
