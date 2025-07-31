import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import './App.css'
import Layout from './components/Layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./components/Home/Home"
import Cart from "./components/Cart/Cart"
import Products from "./components/Products/Products"
import Categories from "./components/Categories/Categories"
import Brands from "./components/Brands/Brands"
import Register from "./components/Register/Register"
import Login from "./components/Login/Login"
import NotFound from "./components/NotFound/NotFound"
import Signout from "./components/Signout/Signout"
import ProtectedRoutes from './components/protectedRoutes/protectedRoutes'
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { Toaster } from 'react-hot-toast'
import AllOrders from './components/AllOrders/AllOrders'
import CheckOut from './components/CheckOut/CheckOut'
import WishList from './components/WishList/WishList'
function App() {
  const queryClient = new QueryClient()
  const routes=createBrowserRouter([{
    path:"" ,element:<Layout/>,
    children:[{
      index:true,element:<Home/>
    },
  {
    path:"Cart",element:< ProtectedRoutes><Cart/></ProtectedRoutes>
  },
  {
    path:"Products",element:<ProtectedRoutes><Products/></ProtectedRoutes>
  },
  {
    path:"Categories",element:<ProtectedRoutes><Categories/></ProtectedRoutes>
  },
   {
    path:"allOrders",element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>
  },
   {
    path:"WishList",element:<ProtectedRoutes><WishList/></ProtectedRoutes>
  },
   {
    path:"CheckOut",element:<ProtectedRoutes><CheckOut/></ProtectedRoutes>
  },
{
    path:"ProductDetails/:id/:category",element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>
  },


  {
    path:"Brands",element:<Brands/>
  },
  {
    path:"Login",element: <ProtectedAuth><Login/></ProtectedAuth>
  },
  {
    path:"Register",element:<ProtectedAuth><Register/></ProtectedAuth>
  },
  {
    path:"Signout",element:<Signout/>
  },
  {
    path:"*",element:<NotFound/>
  }
  ]
  }])
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}/>
       <ReactQueryDevtools initialIsOpen={false} />
       <Toaster/>
    </QueryClientProvider>
  
    </>
  )
}

export default App

