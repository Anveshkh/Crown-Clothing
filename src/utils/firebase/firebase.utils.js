import { initializeApp } from 'firebase/app'
// This initialize app function creates an app instance for you based off of some type of config
// This config is a object that allows us to attach this firebase app instance to that instance that we setup in firebase

import { signInWithEmailAndPassword, getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signOut,onAuthStateChanged  } from 'firebase/auth'


import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,// collection method gives us the collection reference
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBsrkIK5mCpv2rcrbzbFSGODUzw4N2K_Yc",
    authDomain: "crwn-clothing-815ba.firebaseapp.com",
    projectId: "crwn-clothing-815ba",
    storageBucket: "crwn-clothing-815ba.appspot.com",
    messagingSenderId: "660344339764",
    appId: "1:660344339764:web:febe0e39996db74fecf961"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
//GoogleAuthProvider is generally a class that we get from firebase authentication
//We can generate multiple providers like provider for facebook, github, linked and so on 


provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth(); 
//Authentication is single . The rules for authentication are same for every provider


export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    // This collectionRef points to the reference of collectionKey collection inside database db
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
    console.log("done");
}

export const getCategoriesAndDocuments = async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q); // we are getting all the docs from collection

    // querysnapshot.docs returns us the array of documents
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
}

export const createUserDocumentFromAuth = async(userAuth, additionalInformation) => {
    
    // checks if there is a users collection with certain user in db database if not it will create one
    const userDocRef = doc(db, 'users', userAuth.uid);
    
    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // gives the data at the userdocref
    

    if (!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date()

        try{
            setDoc(userDocRef, {
                displayName, 
                email,
                createdAt,
                ...additionalInformation,
            });
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);