import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ users, User, status, setStatus }) => {
  return (
    <>
      {/* Sidebar */}
      <aside className={`sidebar ${status ? "show" : null}`}>
        <header className="people-header">
          <h2 className="chat-heading">Chats</h2>
          <div className="search-wrapper">
            <input
              type="search"
              className="search-input"
              placeholder="Search Messenger"
            />
          </div>
        </header>
        {/* <!-- Peoples --> */}
        <div className="peoples-wrapper">
          <ul className="peoples">
            {users?.map((user, index) => (
              <Item
                user={user}
                key={index}
                User={User}
                setStatus={setStatus}
                status={status}
              />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

const Item = ({ user, User, status, setStatus }) => {
  const navigate = useNavigate();
  return (
    <li
      className="people-item"
      onClick={() => {
        navigate(`/${user?.slug}`);
        setStatus(!status);
      }}
    >
      <img src={user?.photoURL} alt="person" className="person-logo" />
      <div>
        <span className="people-name">
          {user?.email === "dev.shahin2@gmail.com"
            ? "Boss ✅"
            : user?.email === User?.email
            ? "Me"
            : user?.username}
        </span>
        <p className="sort-message">message sort</p>
      </div>
    </li>
  );
};

export default Sidebar;
