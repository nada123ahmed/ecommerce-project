import React, { useContext, useEffect, useState } from 'react'
import "./FeatureProducts.module.css"
import axios, { Axios } from 'axios'
import Loader from '../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext';
export default function FeatureProducts() {
   let { addToWishlist, removeWishlistItem, wishlistProductIds } = useContext(WishlistContext)
  let{addToCart}=useContext(CartContext
  )
   async function addProductToCart(productId){
   let response=  await addToCart(productId)
    console.log(response);
    
  }










function getProducts() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/products");
}

 let {data, isLoading , isError , isFetching , error} = useQuery({
  queryKey:["FeatureProductsData"],
  queryFn:getProducts,
  staleTime:5000,
  retry:1,
  retryDelay:2000,
  refetchInterval:3000,
 
 })

console.log(data?.data?.data);



 const isInWishlist = (productId) => {
    return wishlistProductIds.includes(productId);
  };

 
  async function handleWishlistToggle(productId) {
    if (!localStorage.getItem("userToken")) { 
      toast.error("Please log in to add to wishlist.");
      return; 
    }
    if (isInWishlist(productId)) { 
      await removeWishlistItem(productId); 
    } else { 
      await addToWishlist(productId); 
    }
  }




  return (
   <>
  
      
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'> 
      {isLoading ? <Loader /> : null}
      {error ? <p className='text-center text-green-600 font-extrabold text-3xl '>{error.message}</p> : null}
      
   
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 py-4"> 
        {data?.data?.data.map((product) =>
          <div 
            key={product.id} 
            className='bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 p-3 flex flex-col'
          >
            <Link to={`/ProductDetails/${product.id}/${product.category.name}`} className="flex-grow"> 
              <img src={product.imageCover} className='w-full h-48 object-cover rounded-md mb-3' alt={product.title} /> 
              <h3 className='text-green-600 text-sm font-semibold'>{product.category.name}</h3> 
              <p className='text-gray-800 font-medium leading-tight mb-2'>{product.title.split(" ").slice(0, 2).join(" ")}</p>
              <div className='flex justify-between items-center text-sm'> 
                <p className='font-bold'>{product.price} EGP</p>
                <p className='flex items-center'> 
                  <i className=' text-yellow-300 fa fa-star mr-1'></i>{product.ratingsAverage}
                </p>
              </div>
            </Link>

            
            <div className="flex items-center gap-2 mt-4"> 
              <button
                onClick={() => addProductToCart(product._id)}
                className='bg-green-600 text-white px-3 py-2 text-sm rounded-lg w-full cursor-pointer flex-grow hover:bg-green-700 transition duration-300' 
              >
                Add To cart
              </button>
            
              {localStorage.getItem("userToken") && ( 
                <button
                  onClick={() => handleWishlistToggle(product._id)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 text-base" 
                >
                  <i
                    className={`fa-heart ${
                      isInWishlist(product._id) ? 'fa-solid text-red-600' : 'fa-regular text-gray-500'
                    }`}
                  ></i>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
      </>
  )
}

