import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Main = () => {
  return (
    <div>
        <Navbar home={true} />
        <Outlet />
    </div>
  )
}

export default Main