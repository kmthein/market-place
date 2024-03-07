import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './layouts/Main'
import Index from './pages/profile/Index'
import AdminIndex from './pages/admin/Index'
import AuthProvider from './providers/AuthProvider'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/Home'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
      ]
    },
    {
      path: "/profile",
      element: <AuthProvider><Index /></AuthProvider>
    },
    {
      path: "/admin",
      element: <AuthProvider><AdminIndex /></AuthProvider>
    }
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App