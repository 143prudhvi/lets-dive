import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
    apiKey: "AIzaSyAJ1jt8PR43_Gpd-wkrdC0ST3AFRDUx-D4",
    authDomain: "myapp-d5c8a.firebaseapp.com",
    projectId: "myapp-d5c8a",
    storageBucket: "myapp-d5c8a.appspot.com",
    messagingSenderId: "541716315",
    appId: "1:541716315:web:48ba3356491f418647f47e",
    measurementId: "G-CD0LP5SZX6"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth , additionalData) =>{
    if(!userAuth) return;
    console.log(userAuth);
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName , email , uid ,photoURL} = userAuth;
        const status = 'online';
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                uid,
                status,
                photoURL,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user' , error.message);
        }
    }

    return userRef;
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({prompt : 'select_account'})

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const userCollectionRef = () => {
    const userCollectionRef = firestore.collection('users');
    return userCollectionRef;
};
export default firebase;
