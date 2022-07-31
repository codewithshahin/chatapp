import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  sendEmailVerification,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
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

  const createAccountWithEmailPassword = (email, username, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(auth.currentUser, {
          displayName: username,
          photoURL:
            "https://s3.amazonaws.com/babelcube/users/61f7c584d9efd_fault-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
        }).then((res) => {});
        window.location.replace("/");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetPassword = (email) => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        alert("password reset link send to your email successfully..");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const loginWithEmailPassword = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        window.location.replace("/");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
    createAccountWithEmailPassword,
    loginWithEmailPassword,
    resetPassword
  };
};

export default useFirebase;
