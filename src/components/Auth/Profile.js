import React from 'react'
import {useAuth} from '../../contexts/AuthContext'
import './Auth.css'

export default function Profile() {
    const {currentUser} = useAuth()
  return (
    <span className='profile p-2'>
        {currentUser.email}
        <img src={currentUser.photoURL} alt={currentUser.displayName} />
    </span>
  )
}
