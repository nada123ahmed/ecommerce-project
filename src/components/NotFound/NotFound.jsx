import React from 'react'
import "./NotFound.module.css"
import error from "../../assets/404.jpg"
export default function NotFound() {
  return (
    <div className='container mx-auto text-center'>
      <img className='w-full' src={error} alt="error-img" />
    </div>
  )
}
