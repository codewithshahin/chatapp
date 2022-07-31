import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Firebaseapp from "../config/firebaseConfig";
Firebaseapp();

import { db, ref, set } from "../config/firebaseConfig";
import { getSlug } from "../utlis/lib";

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [myMessage, setMyMessage] = useState({});

  //login user with google
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    signOut(auth).then((res) => {});
  };

  const saveUser = ({ email, displayName, photoURL }) => {
    const user = {
      email,
      username: displayName,
      photoURL,
      slug: getSlug(email),
      join_date: new Date(),
    };
    set(ref(db, "users/" + user.slug), user);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        saveUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, []);

  return {
    googleLogin,
    setLoading,
    loading,
    setError,
    error,
    user,
    sendEmailVerification,
    myMessage,
    logout,
  };
};

export default useFirebase;
