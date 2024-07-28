import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import PreLoader from "../components/PreLoader";

const firebaseConfig = {
  apiKey: "AIzaSyDXt-8iptTGqCE7QvCVjt2VRdGakI_zNlk",
  authDomain: "codein-c115b.firebaseapp.com",
  databaseURL: "https://codein-c115b-default-rtdb.firebaseio.com",
  projectId: "codein-c115b",
  storageBucket: "codein-c115b.appspot.com",
  messagingSenderId: "326678778546",
  appId: "1:326678778546:web:850375f946805ae542efab",
  measurementId: "G-EC7GKF0SP9",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(true);
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      setLoading(true);
      const currentUser = firebaseAuth.currentUser;
      // console.log("current user ", currentUser);

      if (!currentUser || !currentUser.uid) {
        throw new Error("User is not authenticated or has no UID");
      }

      if (!currentUser.emailVerified) {
        setUser(null);
        setError("Email not verified. Please check your email.");
        return null;
      }

      const userReferenceCollection = collection(firestore, "users");
      const userDocumentReference = doc(
        userReferenceCollection,
        currentUser.uid
      );
      const userSnapshot = await getDoc(userDocumentReference);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        // console.log("updated user ", userData);
        setUser(userData);
        setError(null);
        return userData;
      } else {
        throw new Error("User document does not exist");
      }
    } catch (error) {
      console.error("Firebase Error :: getUser", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (authUser) => {
      if (authUser) {
        getUser();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const createUserWithEmail = async (
    email,
    password,
    position,
    priority,
    name,
    photo
  ) => {
    try {
      setLoading(true);
      const newUser = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      await sendEmailVerification(newUser.user);

      const storageRef = ref(
        storage,
        `profilePhotos/${newUser.user.uid}-${photo.name}`
      );
      await uploadBytes(storageRef, photo);
      const photoURL = await getDownloadURL(storageRef);

      const rollNumberCollectionRef = collection(firestore, "users");
      const rollNumberDocRef = doc(rollNumberCollectionRef, newUser.user.uid);

      await setDoc(rollNumberDocRef, {
        email,
        position,
        priority,
        name,
        uid: newUser.user.uid,
        active: false,
        admin: false,
        photoURL,
      });

      setUser(newUser.user);
      return newUser.user;
    } catch (error) {
      console.error("Firebase Error :: createUserWithEmail", error.message);
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (title, description, link, photo, duration) => {
    try {
      setLoading(true);

      const storageRef = ref(storage, `events/${Date.now()}-${photo.name}`);
      await uploadBytes(storageRef, photo);
      const photoURL = await getDownloadURL(storageRef);

      const eventsCollection = collection(firestore, "events");

      const newEvent = {
        title,
        description,
        link,
        photoURL,
        day: duration,
        userId: user.uid,
        active: true,
        eventId: new Date().getTime(),
      };

      const newEventRef = await addDoc(eventsCollection, newEvent);

      return newEventRef;
    } catch (error) {
      console.error("Firebase Error :: createEvent", error.message);
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = user ? true : false;

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(firebaseAuth);
      setUser(null);
    } catch (error) {
      console.error("Firebase Error :: logout", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const loggedInUser = userCredential.user;

      if (loggedInUser) {
        setUser(loggedInUser);
        setError(null);
        return getUser();
      }

      return null;
    } catch (error) {
      console.error("Firebase Error :: login", error.message);
      setError("Invalid email or password. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);

      const usersCollection = collection(firestore, "users");
      const usersQuery = query(
        usersCollection,
        orderBy("priority"),
        where("admin", "==", true)
      );

      const usersSnapshot = await getDocs(usersQuery);

      const usersData = [];
      usersSnapshot.forEach((userDoc) => {
        const userData = userDoc.data();
        usersData.push(userData);
      });
      setUsers(usersData);
      return usersData;
    } catch (error) {
      console.error("Firebase Error :: getUsersByPriority", error.message);
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getEvents = async () => {
    try {
      setLoading(true);

      const eventsCollection = collection(firestore, "events");
      const eventsSnapshot = await getDocs(eventsCollection);

      const eventsData = [];
      eventsSnapshot.forEach((eventDoc) => {
        const eventData = eventDoc.data();
        eventsData.push(eventData);
      });

      return eventsData;
    } catch (error) {
      console.error("Firebase Error :: getEvents", error.message);
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        getEvents,
        user,
        error,
        loading,
        createUserWithEmail,
        login,
        logout,
        getUser,
        isLoggedIn,
        createEvent,
        getUsers,
        users,
      }}
    >
      {loading && <PreLoader />}
      {props.children}
    </FirebaseContext.Provider>
  );
};
