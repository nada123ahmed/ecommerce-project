import React, { useContext, useEffect, useState } from 'react'
import "./Cart.module.css"
import { CartContext } from '../../Context/CartContext'
import Loader from '../Loader/Loader';
import emptycart from "../../assets/2eacfa305d7715bdcd86bb4956209038.jpg"
import { Link } from 'react-router-dom';
export default function Cart() {
  let{getCart , removeCartItem,UpdateCart,TotalPrice,ClearCart}=useContext(CartContext);
const [CartItems, setCartItems] = useState([])
const [isLoading, setIsLoading] = useState(true)


  async function getAllCart() {
  let response=  await getCart()
  console.log(response.data.data.products ,"cart component");
  setCartItems(response.data.data.products);
  setIsLoading(false)
  
  }
  async function removeProduct(productId) {
   let response= await removeCartItem(productId)
   console.log(response, "remove items");
   setCartItems(response.data.data.products)
   setIsLoading(false)
  }

 async function UpdateCartProduct (productId ,count) {
   let response= await UpdateCart(productId,count)
   console.log(response, "update items");
   setCartItems(response.data.data.products)
  }


 async function clearAllCart() {
   let response= await ClearCart()
   console.log(response, "clear");
   setCartItems([])
  
  }
useEffect(()=>{
  getAllCart()
},[])
  return (
    <>
   
    







       <div className='container mx-auto px-4 py-8'> 
        {isLoading ? <Loader /> : null}

        {CartItems.length === 0 && !isLoading ? ( 
          <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)]">
            <img className='w-[300px] h-[300px] object-contain' src={emptycart} alt="Your cart is empty" />
            <p className="text-xl text-gray-600 mt-4">Your cart is empty!</p>
            <Link to="/Products" className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
              Browse Products
            </Link>
          </div>
        ) : !isLoading && ( 
          <>
            <div className='text-end mb-4'>
              <button onClick={() => clearAllCart()} className='bg-red-800 text-white px-4 py-3 rounded-xl cursor-pointer hover:bg-red-700 transition duration-300'>Clear Cart</button>
            </div>
            <h2 className='text-green-700 text-3xl my-5 text-center sm:text-left'>Cart Data :</h2>

           
            <div className="overflow-x-auto hidden md:block"> 
              <table className="table w-full">
                <thead>
                  <tr className='text-center'>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>QTY</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th>Actions</th> 
                  </tr>
                </thead>
                <tbody>
                  {CartItems.map((item) =>
                    <tr key={item?.product?.id} className='text-center'>
                      <td className='flex justify-center'>
                        <div className="flex items-center gap-3">
                          <div className="w-[100px] h-[100px]">
                            <img
                              src={item?.product?.imageCover}
                              className='w-full h-full object-cover'
                              alt={item?.product?.title} />
                          </div>
                        </div>
                      </td>
                      <td>
                        {item?.product?.title}
                      </td>
                      <td>
                        <div className='flex items-center justify-center gap-2'>
                          <button onClick={() => UpdateCartProduct(item?.product?.id, item.count + 1)} className='border-2 border-green-700 px-2 py-1 rounded-full cursor-pointer hover:bg-green-700 hover:text-white transition duration-200'>+</button>
                          <span className='px-2 font-semibold'>{item.count}</span>
                          <button onClick={() => UpdateCartProduct(item?.product?.id, item.count - 1)} className='border-2 border-green-700 px-2 py-1 rounded-full cursor-pointer hover:bg-green-700 hover:text-white transition duration-200'>-</button>
                        </div>
                      </td>
                      <td>
                        {item.price} EGP
                      </td>
                      <td>
                        {item.price * item.count} EGP
                      </td>
                      <td>
                        <button onClick={() => removeProduct(item?.product?.id)} className='text-red-700 px-3 py-2 cursor-pointer hover:text-red-900 transition duration-200'><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>)}
                  <tr className='text-center text-3xl font-bold bg-gray-100'> 
                    <td colSpan="4">Total Price</td> 
                    <td colSpan="1">{TotalPrice} EGP</td>
                    <td>
                      <Link to="/CheckOut">
                        <button className="text-green-700 px-3 py-2 cursor-pointer outline-2 rounded-xl border-2 border-green-700 hover:bg-green-700 hover:text-white transition duration-300">
                          Checkout
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

           
            <div className="block md:hidden"> 
              <div className="grid grid-cols-1 gap-4">
                {CartItems.map((item) => (
                  <div key={item?.product?.id} className="border p-4 rounded-lg shadow-md flex flex-col">
                    <div className="flex items-center mb-3">
                      <img
                        src={item?.product?.imageCover}
                        className='w-24 h-24 object-cover rounded-md mr-4'
                        alt={item?.product?.title}
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800">{item?.product?.title}</h3>
                        <p className="text-md text-gray-600 my-1">Unit Price: <span className="font-bold">{item.price} EGP</span></p>
                        <p className="text-md text-gray-600">Total: <span className="font-bold">{item.price * item.count} EGP</span></p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 border-t pt-3">
                      <div className='flex items-center gap-2'>
                        <button onClick={() => UpdateCartProduct(item?.product?.id, item.count + 1)} className='border-2 border-green-700 px-2 py-1 rounded-full cursor-pointer text-sm hover:bg-green-700 hover:text-white transition duration-200'>+</button>
                        <span className='px-2 font-semibold text-lg'>{item.count}</span>
                        <button onClick={() => UpdateCartProduct(item?.product?.id, item.count - 1)} className='border-2 border-green-700 px-2 py-1 rounded-full cursor-pointer text-sm hover:bg-green-700 hover:text-white transition duration-200'>-</button>
                      </div>
                      <button onClick={() => removeProduct(item?.product?.id)} className='text-red-700 px-3 py-2 cursor-pointer hover:text-red-900 transition duration-200 flex items-center'>
                        <i className="fa-solid fa-trash mr-1"></i>Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6 p-4 border-t-2 border-gray-300 bg-gray-50 rounded-lg shadow-sm">
                <p className='text-3xl font-bold text-green-700'>Total Price: {TotalPrice} EGP</p>
                <Link to="/CheckOut">
                  <button className="mt-4 bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition duration-300">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
