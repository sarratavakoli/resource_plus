//Firebase is a cloud computing tool that includes a lot of features like db management, messaging, machine learning, authentication, and file storage.
//steps to configure auth:
//1. Create a firebase app at firebase.google.computing
//2. register the app with firebase
//3. configure/initialize firebase in our react app by creating the base.js and .env files
    //a. npm install firebase
    //b. base.js is at the root of the src folder
    //c. .env file has to be located in the root of the entire project
//4. Configure github auth in firebase and github
    //after working in firebase we need to code:
//5. create the ocntext which will house all use info and login/logout functions
//6. call to login/logout/user functionality in any component we need/want to

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize authentication from firebase - should remind you to connect auth from firebase to an oauth app in github
const auth = getAuth(app)

export {auth};