import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ users, User }) => {
  return (
    <>
      {/* Sidebar */}
      <aside class="sidebar">
        <header class="people-header">
          <h2 class="chat-heading">Chats</h2>
          <div class="search-wrapper">
            <input
              type="search"
              class="search-input"
              placeholder="Search Messenger"
            />
          </div>
        </header>
        {/* <!-- Peoples --> */}
        <div class="peoples-wrapper">
          <ul class="peoples">
            {users?.map((user, index) => (
              <Item user={user} key={index} User={User} />
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

const Item = ({ user, User }) => {
  const navigate = useNavigate();
  return (
    <li class="people-item" onClick={() => navigate(`/${user?.slug}`)}>
      <img src={user?.photoURL} alt="person" class="person-logo" />
      <div>
        <span class="people-name">{user?.email ===  User?.email ? "Me" : user?.username}</span>
        <p class="sort-message">message sort</p>
      </div>
    </li>
  );
};

export default Sidebar;
