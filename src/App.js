import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import Chat from "./Components/Chat/Chat";
import Login from "./Components/Login/Login";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route
        path="/:email"
        element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>
        }
      />
      <Route path="/chat-admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
