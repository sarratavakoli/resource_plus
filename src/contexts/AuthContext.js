//we will create a react context in this file that will house all authentication info (currentUser, login, logout). 
//React contexts allow us to store information and transport that info to the components that use it. 
//We could store this info in the app component and just pass props to send the user information to other components
//but this is not ideal for larger apps. Instead, we create the context and a component that will communicate this context
//to its children. Think of this much like Session storage in a .NET application.
import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../base'//gives us access tot he auth object, which initializes authentication
import { GithubAuthProvider, signInWithPopup, signOut } from 'firebase/auth'  
//these are firebase functions we need to use in our logic below (in the component portion of the code)

//below we create a context (storage object) for all of our auth info
const AuthContext = React.createContext();

//below we create a function that will allow us to use the context in components.
//we will import this function anytime we want the currentUser, login, or logout functionality
export function useAuth(){
    return useContext(AuthContext);
}

//This component will provide the  AuthContext info to the children components nested inside of it. 
//See app.js where we call to an instance of this component and nest all others inside it.
export default function AuthProvider({children}) {
    //create hook for currentUser and another custom hook to determine if the context has info to 
    //share with child components before rendering the child components to the screen.
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    //login functionality
    //instantiate a githubauthprovider object
    const githubAuthProvider = new GithubAuthProvider();

    async function login(){

        return (signInWithPopup(auth, githubAuthProvider).then(authData => {
            console.log(authData)
            setCurrentUser(authData.user);
            //this is where I might add some functionality to save the user to a db. also maybe decide roles.
        }))
    }

    //logout functionality
    async function logout(){
        signOut(auth).then(setCurrentUser(null));
    }
  
    //the object below will hold currentUser info and login/logout functions, so we can use them in the child
    //components. We will pass this as a prop in the return below.
    const value = {currentUser, login, logout};
  
    useEffect(() => {
        //authChange will use Firebase functionality to get user info, set the currentUser hook to the retrieved value,
        //and allow components to load in using the custom hook (loading).
        const authChange = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return authChange;

    }, []);

    return (
    <AuthContext.Provider value={value}>
        {/* Below we are waiting for the AuthContext info to populate before loading the child components in the UI. */}
        {!loading && children}
    </AuthContext.Provider>
  )
}
