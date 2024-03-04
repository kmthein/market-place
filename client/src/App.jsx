import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './layouts/Main'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Index from './pages/profile/Index'
import AdminIndex from './pages/admin/Index'
import AuthProvider from './providers/AuthProvider'

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