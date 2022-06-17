import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const { currentUser } = useAuth()
  return (
    <Navbar expand="md" bg="dark" variant="dark" className="p-3">
      <Navbar.Brand href="/">
        {/* Hamburger Button Below */}
        ResourcePlus
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {/* links using react-router-dom
        react-router-dom carries a Link component that will render the anchor tag associated with the router we will create in App.js. 
        First we must install react-router-dom, then import link to it */}
        <Nav>
          {currentUser &&
            <>
              <Link to="/resources" className="nav-link">Resources</Link>
              <Link to="/categories" className="nav-link">Categories</Link>
            </>
          }
          <Link to="/bootstrap" className="nav-link">Bootstrap</Link>
          <Link to="/routing" className="nav-link">Routing</Link>
          <Link to="/testing" className="nav-link">Testing</Link>
          {!currentUser && 
            <Link to="/login" className="nav-link">Login</Link>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
