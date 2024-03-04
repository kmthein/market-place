import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { endLoading } from '../store/slices/uiSlice'

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(endLoading());
  }, [])

  return (
    <div>
        <Navbar home={true} />
        <Outlet />
    </div>
  )
}

export default Main