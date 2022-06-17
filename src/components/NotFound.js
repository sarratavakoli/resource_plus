import React from 'react'
import image from '../images/404.jpg'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notFound">
        <img src={image} alt="Resource Not Found"/>
        <h1>Not Found</h1>
    </div>
  )
}
