// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  runTransaction,
  set,
  onValue,
} from "firebase/database";
import slugify from "slugify";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
  databaseURL:
    "databaseURL",
};

// Initialize Firebase
const Firebaseapp = () => initializeApp(firebaseConfig);

const db = getDatabase(Firebaseapp());

//databse storeing
function sendMessage(user, touser, message) {
  const id = user.email.split(".").toString().replace(/,/gi, "_");

  //recivesr
  const sendto = {
    slug: touser.slug,
    messages: [{message:message, sendDate: new Date().toLocaleString()}],
    isRead: false,
    sendDate: new Date().toLocaleString(),
    email: touser?.email,
  };

  const mesg = {
    user: {
      username: user?.displayName,
      email: user?.email,
      photoUrl: user?.photoURL,
      slug: id,
    },
    receivers: [sendto],
  };

  const messageCountRef = ref(db, "messages/" + id);

  let existMsg = {};
  onValue(messageCountRef, (snapshot) => {
    existMsg = snapshot.val();
  });

  if (existMsg?.user) {
    updateMessageAndSave(id, touser, message);
  } else {
    set(ref(db, "messages/" + id), mesg);
  }
}

function updateMessageAndSave(slug, to, message2) {
  const messageRef = ref(db, `/messages/${slug}`);
  const msg = {
    slug: to?.slug,
    email: to?.email,
    messages: [{ message: message2, sendDate: new Date().toLocaleString() }],
    isRead: false,
    sendDate: new Date().toLocaleString(),
  };
  runTransaction(messageRef, (message) => {
    if (message) {
      if (message.receivers.length > 0) {
        const { receivers } = message;
        const exist = receivers.find((u) => u.email == to.email);
        if (exist?.email) {
          message["receivers"] = receivers.map((i) => {
            if (i.email == exist.email) {
              return {
                ...i,
                messages: [
                  ...exist.messages,
                  { message: message2, sendDate: new Date().toLocaleString() },
                ],
                sendDate: new Date().toLocaleString(),
                isRead: false,
              };
            } else {
              return i;
            }
          });
        } else {
          message["receivers"] = [...message["receivers"], msg];
        }
      }
    }
    return { ...message };
  });
}

export { db, ref, onValue, sendMessage, set };

export default Firebaseapp;

