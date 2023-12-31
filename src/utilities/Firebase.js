import { useState, useEffect, useCallback } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  onValue,
  ref,
  update,
  connectDatabaseEmulator,
} from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  connectAuthEmulator,
  signInWithCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDB0TOwQ2hHlR9hG9b3W0Nnqa2lWdZR7ck",
  authDomain: "quick-react-2e639.firebaseapp.com",
  databaseURL: "https://quick-react-2e639-default-rtdb.firebaseio.com",
  projectId: "quick-react-2e639",
  storageBucket: "quick-react-2e639.appspot.com",
  messagingSenderId: "58712857760",
  appId: "1:58712857760:web:9f9882df2153dee267bdc5",
  measurementId: "G-VT9ZD8MDCD",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

if (!globalThis.EMULATION && import.meta.env.MODE === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectDatabaseEmulator(database, "127.0.0.1", 9000);

  signInWithCredential(
    auth,
    GoogleAuthProvider.credential(
      '{"sub": "CfM0smWvUHmN2rnPVmCgs4KJ9tEU", "email": "test@gmail.com", "displayName": "Test User", "email_verified": true}'
    )
  );

  globalThis.EMULATION = true;
}

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const initialize = () => {
      const dbReference = ref(database, path);

      onValue(
        dbReference,
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      );
    };

    initialize();
  }, [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timeStamp = Date.now();
  const updatedMessage = `Updated At: ${new Date(
    timeStamp
  ).toLocaleDateString()}`;

  const message = error?.message || updatedMessage;

  return { timeStamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const dbReference = ref(database, path);

  const updateData = useCallback(
    (value) => {
      update(dbReference, value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, setUser);
  }, []);

  return user;
};

export const signInWithGoogle = () => {
  const auth = getAuth(firebase);
  signInWithPopup(auth, new GoogleAuthProvider());
};

export const googleSignOut = () => {
  const auth = getAuth(firebase);
  signOut(auth);
};
