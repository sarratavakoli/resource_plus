import React from 'react'
import './App.css'
import Bootstrap from './components/Bootstrap/Bootstrap'
import Navigation from './components/Navigation'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Routing from './components/Routing/Routing'
import NotFound from './components/NotFound'
import AuthProvider from './contexts/AuthContext'
import Login from './components/Auth/Login'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Resources from './components/Resources/Resources'
import Categories from './components/Categories/Categories'
import Testing from './testing/Testing'


export default function App() {
  
  return (
    <div className='App'>
      <AuthProvider >

        {/* The following component is calling the BrowserRouter but we aliased this in the import as just Router. 
      We surround the Navigation because it has Link components called from react-router-dom package and rendered
      in that component, per the docs on their site.*/}
        <Router>

          <Navigation />
          {/* We will use react-router-dom package for navigation */}
          <Routes>
            
            {/* This is like a switch that decides what to render to the screen */}
            <Route path="/" element={<ProtectedRoute> <Resources/> </ProtectedRoute>} />
            <Route path="/resources" element={<ProtectedRoute> <Resources/> </ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute> <Categories /> </ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path='/bootstrap' element={<Bootstrap />} />
            <Route path="/routing" element={<Routing />} />
            <Route path="/testing" element={<Testing />} />
            {/* The NotFound component will be an error handler and will not be tied to any other Route than what is detailed above.
          All routes listed above this Route will have very specific paths that are listed for them. This will be a catch all for the rest of what could be in the path. */}
            
            <Route path="*" element={<NotFound />} />

          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}
