import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXWJ7petA064OkXFSexay9IfWwcpAw-Vk",
  authDomain: "dcow-db.firebaseapp.com",
  projectId: "dcow-db",
  storageBucket: "dcow-db.appspot.com",
  messagingSenderId: "387326109632",
  appId: "1:387326109632:web:7e17303a07a92e87118a25"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


export const db = getFirestore();

//function to add collection firebase
export const addCollectionAndDocuments = async (
    collectionKey, 
    objectsToAdd,
    field,
  ) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');

}

//pull the categories from firebase
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);  

  //get snapshot from query
  const querySnapshot = await getDocs(q);

  const categoryMap = querySnapshot.docs.reduce( (acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}


export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
  ) => {
  
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  //if doesnt exist create snapShop in firebase db 
  if(!userSnapshot.exists()){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
          await setDoc(userDocRef, {
              displayName,
              email,
              createdAt,
              ...additionalInformation,
          });
      } catch (error) {
          console.log('error creating the user', error.message);
      }
  }

  return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInWithUserEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}


export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);