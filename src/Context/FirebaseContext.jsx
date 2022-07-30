import React, { createContext } from "react";
import useAuth from "../Hooks/useAuth";
import useFirebase from "../Hooks/useFirebase";
export const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const allContext = useFirebase();
  return (
    <FirebaseContext.Provider value={allContext}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
