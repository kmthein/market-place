import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Main from './layouts/Main'
import Index from './pages/profile/Index'
import AdminIndex from './pages/admin/Index'
import AuthProvider from './providers/AuthProvider'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/home/Home'
import ProductDetail from './pages/product/ProductDetail'
import SavedProduct from "./pages/savedProducts/Index";

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
        {
          path: "/products/:id",
          element: <ProductDetail />
        },
        {
          path: "/saved-products",
          element: <SavedProduct />
        }
      ]
    },
    {
      path: "/profile",
      element: <AuthProvider><Index /></AuthProvider>
    },
    {
      path: "/admin",
      element: <AuthProvider><AdminIndex /></AuthProvider>
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App