
import React, { useContext, useEffect, useState } from 'react';

import { WishlistContext } from '../../Context/WishlistContext';
import { CartContext } from '../../Context/CartContext'; 
import Loader from '../Loader/Loader';
import emptyWishlist from "../../assets/images.jpg";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import "./WishList.module.css"; 
export default function Wishlist() {
  
  let { getWishlist, removeWishlistItem, wishlistItems, setWishlistItems } = useContext(WishlistContext);
  let { addToCart } = useContext(CartContext); 

  const [isLoading, setIsLoading] = useState(true);

  
  async function getUserWishlist() {
    setIsLoading(true);
    
    let response = await getWishlist(); 
    setIsLoading(false);
  }

  
  async function removeProductFromWishlist(productId) {
    setIsLoading(true);
    let success = await removeWishlistItem(productId);
    
    setIsLoading(false);
  }

 
  async function addProductToCartFromWishlist(productId) {
    setIsLoading(true);
    
    let response = await addToCart(productId); 
    
    if (response && response.data?.status === "success") {
     
      await removeWishlistItem(productId); 
      
     
    } else {
        toast.error("Failed to add product to cart."); 
    }
    setIsLoading(false);
  }

  useEffect(() => {

    if (localStorage.getItem("userToken")) {
      getUserWishlist();
    } else {
      setIsLoading(false);
      
    }
  }, []); 

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='container mx-auto py-8'>
      <h2 className='text-green-700 text-3xl my-5 text-center'>My Wish List</h2>

      {wishlistItems.length === 0 ? ( 
        <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)]">
          <img src={emptyWishlist} alt="Your wishlist is empty" className="w-[300px] h-[300px] object-contain" />
          <p className="text-xl text-gray-600 mt-4">Your wishlist is empty. Start adding some products!</p>
          <Link to="/Products" className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
            Browse Products
          </Link>
        </div>
      ) : ( 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className='border p-4 rounded-lg shadow-md flex flex-col'>
              <div className="flex items-center mb-4">
                <div className="w-[100px] h-[100px] mr-4 flex-shrink-0">
                  <img
                    src={item.imageCover}
                    className='w-full h-full object-cover rounded-md'
                    alt={item.title}
                  />
                </div>
                <div className="flex-grow">
                  <h3 className='text-xl font-semibold text-green-700'>{item.title.split(" ").slice(0, 3).join(" ")}</h3>
                  <p className='text-gray-700'>{item.price} EGP</p>
                  <button
                    onClick={() => removeProductFromWishlist(item.id)}
                    className='text-red-700 mt-2 hover:underline flex items-center'
                  >
                    <i className="fa-solid fa-trash mr-2"></i>Remove
                  </button>
                </div>
              </div>
              <button
                onClick={() => addProductToCartFromWishlist(item.id)}
                className='bg-green-600 text-white px-4 py-2 rounded-lg w-full mt-auto hover:bg-green-700 transition duration-300'
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

