
import React, { useContext, useEffect } from 'react'
import "./Navbar.module.css"
import logo from "../../assets/freshcart-logo.svg"
import { NavLink, useNavigate,} from 'react-router-dom'
import {TokenContext} from "../../Context/TokenContext"
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext' 

export default function Navbar() {

  let {Token ,setToken }= useContext(TokenContext);
  let{numOfItems ,getCart}=useContext(CartContext);

  let { numOfWishlistItems, getWishlist } = useContext(WishlistContext); 

 
  async function getAllCartAndWishlistData() {
    if (localStorage.getItem("userToken")) { 
      await getCart();
      await getWishlist(); 
    }
  }

  useEffect(()=>{
    
    getAllCartAndWishlistData(); 
  },[Token]) 

  let navigate = useNavigate()
  function logOut(){
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/Login")
  }

  return (
    


    <div className='bg-slate-200'>
      <div className="navbar w-[90%] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={-1} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            {Token ? (
              <ul
               
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><NavLink to="/" className='text-lg'>Home</NavLink></li>
                <li>
                  <NavLink to="Cart" className='text-lg relative'>
                    <i className="fa-solid fa-cart-shopping text-green-600 text-2xl"></i>
                    <div className="badge badge-soft badge-success absolute top-[-3px] right-[-5px]">{numOfItems}</div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="Wishlist" className='text-lg relative'>
                    <i className="fa-solid fa-heart text-red-600 text-2xl mr-1"></i> 
                    Wish List 
                    {numOfWishlistItems > 0 && <div className="badge badge-soft badge-danger absolute top-[-3px] right-[-5px]">{numOfWishlistItems}</div>}
                  </NavLink>
                </li>
                <li><NavLink to="Products" className='text-lg'>Products</NavLink></li>
                <li><NavLink to="Categories" className='text-lg'>Category</NavLink></li>
                <li><NavLink to="Brands" className='text-lg'>Brands</NavLink></li>
              </ul>
            ) : null}
          </div>
          <img src={logo} alt="logo-img" />
        </div>
        <div className="navbar-center hidden lg:flex">
          {Token ? (
            <ul className="menu menu-horizontal px-1">
              <li><NavLink to="" className='text-lg'>Home</NavLink></li>
              <li>
                <NavLink to="Cart" className='text-lg relative'>
                  <i className="fa-solid fa-cart-shopping text-green-600 text-2xl"></i>
                  <div className="badge badge-soft badge-success absolute top-[-5px] right-[-20px]">{numOfItems}</div>
                </NavLink>
              </li>
              <li>
                <NavLink to="Wishlist" className='text-lg relative'>
                  <i className="fa-solid fa-heart text-red-600 text-2xl mr-1"></i>
                  Wish List 
                  {numOfWishlistItems > 0 && <div className="badge badge-soft badge-danger absolute top-[-5px] right-[-20px]">{numOfWishlistItems}</div>}
                </NavLink>
              </li>
              <li><NavLink to="Products" className='text-lg'>Products</NavLink></li>
              <li><NavLink to="Categories" className='text-lg'>Category</NavLink></li>
              <li><NavLink to="Brands" className='text-lg'>Brands</NavLink></li>
            </ul>
          ) : null}
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            {Token ? (<li><a onClick={() => logOut()} className='text-lg cursor-pointer'>Signout</a></li>) : (
              <>
                <li><NavLink to="Login" className='text-lg'>Login</NavLink></li>
                <li><NavLink to="Register" className='text-lg'>Register</NavLink></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
  
}
