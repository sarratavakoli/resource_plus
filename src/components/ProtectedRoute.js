import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

//Below we are making a component that redirects the unauthenticated user to the login screen.
//We pass in children in the params as a prop which refers to any component that is nested inside of ProtectedRoute tags.
export default function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/login" />
}
