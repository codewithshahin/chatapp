import React from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import Chat from "./Components/Chat/Chat";
import Login from "./Components/Login/Login";
import ResetPassword from "./Components/Login/ResetPassword";
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
      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  );
};

export default App;
