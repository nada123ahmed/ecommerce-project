
import React, { useContext, useEffect } from 'react'
import "./ProductDetails.module.css"
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { WishlistContext } from '../../Context/WishlistContext'; 
import toast from 'react-hot-toast'; 

export default function ProductDetails() {
  let { addToCart } = useContext(CartContext);
  let { addToWishlist, removeWishlistItem, wishlistProductIds } = useContext(WishlistContext);

  async function addProductToCart(productId) {
    let response = await addToCart(productId)
    console.log(response);
  }

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

  let { id, category } = useParams();
  console.log(id, category);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((data) => {
        
        return data?.data?.data.filter((product) => product.category.name === category)
      })
  }

  let { data: ralatedProducts, isLoading } = useQuery({
    queryKey: ["relatedProducts"],
    queryFn: getProductDetails
  })

  function getDetails() {
   
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  let { data: productData, isLoading: isLoadingDetails, error ,isFetching , isError}=useQuery({
    queryKey:["ProductDetails", id],
    queryFn:getDetails,
    gcTime:0
  })

  let ProductDetails = productData?.data?.data;
  console.log(ProductDetails, "details");

  return (
    <>
     
      <div className='container mx-auto my-8 px-4 sm:px-6 lg:px-8'>
        {isLoadingDetails ? <Loader/> : null}
      
        {error && !isLoadingDetails ? <p className='text-center text-red-600 font-extrabold text-3xl '>Error: {error.message}</p> : null}

       
        {ProductDetails ? (
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className='w-full md:w-1/4'>
              <Slider {...settings}>
                {ProductDetails?.images.map((src, index) => <img key={index} className='w-full rounded-lg object-cover' src={src} alt={`Product image ${index}`} loading="lazy" /> )}
              </Slider>
            </div>
            <div className='w-full md:w-3/4'>
              <h2 className='text-black text-2xl font-bold mb-2'>{ProductDetails?.title}</h2>
              <p className='text-slate-700 my-3'>{ProductDetails?.description}</p>
              <p className="text-green-600 font-semibold">{ProductDetails?.category?.name}</p> 
              <div className='flex justify-between items-center my-3'>
                <p className="font-bold text-lg">{ProductDetails?.price} EGP</p>
                <p className="flex items-center text-lg"> <i className=' text-yellow-300 fa fa-star mr-1'></i>{ProductDetails?.ratingsAverage}</p>
              </div>
              <div className="flex gap-4 mt-4">
                <button 
                  onClick={() => addProductToCart(ProductDetails._id)} 
                  className='bg-green-600 text-white px-4 py-2 rounded-lg w-full cursor-pointer hover:bg-green-700 transition duration-300 flex-grow' 
                >
                  Add To cart
                </button>
                {localStorage.getItem("userToken") && ( 
                  <button
                    onClick={() => handleWishlistToggle(ProductDetails._id)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300 text-base" 
                  >
                    <i
                      className={`fa-heart ${
                        isInWishlist(ProductDetails._id) ? 'fa-solid text-red-600' : 'fa-regular text-gray-500'
                      }`}
                    ></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : !isLoadingDetails && !error && (
            <p className='text-center text-xl text-gray-700'>Product details not found.</p>
        )}
      </div> 

     
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 mt-8'> 
        <h2 className='text-green-700 text-3xl my-5'>Related Products :</h2>
        {isLoading ? <Loader/> : null}
        {ralatedProducts?.length === 0 && !isLoading ? (
            <p className='text-center text-gray-600'>No related products found.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 py-4">
              {ralatedProducts?.map((product) => (
                <div key={product.id} className='bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 p-3 flex flex-col'>
                  <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
                    <img src={product.imageCover} className='w-full h-48 object-cover rounded-md mb-3' alt={product.title} loading="lazy" /> 
                    <h3 className='text-green-600 text-sm font-semibold'>{product.category.name}</h3>
                    <p className='text-gray-800 font-medium leading-tight mb-2'>{product.title.split (" ").slice(0,2).join(" ")}</p>
                    <div className='flex justify-between items-center text-sm'>
                      <p className='font-bold'>{product.price} EGP</p>
                      <p className='flex items-center'> 
                        <i className=' text-yellow-300 fa fa-star mr-1'></i>{product.ratingsAverage}
                      </p>
                    </div>
                  </Link>
                  <div className="flex items-center gap-2 mt-4"> 
                    <button onClick={() => addProductToCart(product._id)} className='bg-green-600 text-white px-3 py-2 text-sm rounded-lg w-full cursor-pointer flex-grow hover:bg-green-700 transition duration-300'>Add To cart</button>
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
              ))}
            </div>
        )}
      </div>
    </>
  );
}