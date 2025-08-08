// import axios from "axios";
// import { createContext, useState } from "react";
// import toast from "react-hot-toast";

//  export let CartContext =createContext();
//  export default function CartContextProvider(props){
// const [numOfItems, setnumOfItems] = useState(0)
// const [TotalPrice, setTotalPrice] = useState(0)
// const [cartId, setCartId] = useState(null)


// let headers =
// { token:localStorage.getItem("userToken"),};
//  async function addToCart(productId){
//     return await axios.post("https://ecommerce.routemisr.com/api/v1/cart" ,{
//         productId
//     },
//     {
//         headers,
//         }
       
    
// ).then((data)=>{
//     // console.log(data?.data?.message);
//     console.log(data.data.data._id
// ,"add");
// setCartId(data.data.data._id);
// //         console.log(data.data.data.totalCartPrice
// // );
// setTotalPrice(data.data.data.totalCartPrice)
//  setnumOfItems(data.data.numOfCartItems)

    
//     toast.success(data?.data?.message)
//     return data
    
// }
// ).catch((error)=>{
//     // console.log(error);
//      toast.error(data?.data?.message)
//     return error;
    
// })

// }

//  async function getCart(){
//     return await axios.get("https://ecommerce.routemisr.com/api/v1/cart" ,{
   
//         headers,
//         }
       
    
// ).then((data)=>{
   
//     console.log(data , "get cart data");
//      setnumOfItems(data.data.numOfCartItems)
//     setTotalPrice(data.data.data.totalCartPrice)
// setCartId(data.data.data._id)
//     return data
    
// }
// ).catch((error)=>{
//     console.log(error);
    
//     return error;
    
// })

// }


//  async function removeCartItem(productId){
//     return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
       
//     {
//         headers,
//         }
       
    
// ).then((data)=>{
//     // console.log(data?.data?.message);
//     console.log(data , "remmove");
//      setnumOfItems(data.data.numOfCartItems)
//      setTotalPrice(data.data.data.totalCartPrice)

//     // toast.success(data?.data?.message)
//     return data
    
// }
// ).catch((error)=>{
//     // console.log(error);
//     //  toast.error(data?.data?.message)
//     return error;
    
// })

// }

//  async function UpdateCart(productId,count){
//     return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
//         count
//     },
//     {
//         headers,
//         }
       
    
// ).then((data)=>{
//     console.log(data?.data?.message);
//     console.log(data , "update");
//      setnumOfItems(data.data.numOfCartItems)
//      setTotalPrice(data.data.data.totalCartPrice)
// setCartId(data.data.data._id);
   
//     return data
    
// }
// ).catch((error)=>{
   
//     return error;
    
// })

// }

// async function onlinePayment(shippingAddress){
//     return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` ,{
//         shippingAddress
//     },
//     {
//         headers,
//         }
       
    
// ).then((data)=>{
   
//         console.log(data,"online payment");
//         window.location.href=data.data.session.url;

// setnumOfItems(0)
//      setTotalPrice(0)
    
   
//     return data
    
// }
// ).catch((error)=>{
  
 
//     return error;
    
// })

// }
// async function cashPayment(shippingAddress){
//     return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,{
//         shippingAddress
//     },
//     {
//         headers,
//         }
       
    
// ).then((data)=>{
   
//         console.log(data,"online payment");
//         window.location.href="http://localhost:5173"
// setnumOfItems(0)
//      setTotalPrice(0)

    
   
//     return data
    
// }
// ).catch((error)=>{
    
 
//     return error;
    
// })

// }
// async function ClearCart(){
//     return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,
       
//     {
//         headers,
//         }
       
    
// ).then((data)=>{
//     // console.log(data?.data?.message);
//     console.log(data , "clear data");
//      setnumOfItems(0)
//      setTotalPrice(0)

//     // toast.success(data?.data?.message)
//     return data
    
// }
// ).catch((error)=>{
//     // console.log(error);
//     //  toast.error(data?.data?.message)
//     return error;
    
// })

// }


//     return <CartContext.Provider value={{addToCart , getCart,removeCartItem ,UpdateCart, numOfItems,TotalPrice ,ClearCart ,onlinePayment,cashPayment}}>
// {props.children}
//     </CartContext.Provider>

//  }
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

// This is a helper function to get the latest token.
// It prevents issues with stale headers.
const getHeaders = () => {
  const token = localStorage.getItem("userToken");
  return {
    headers: {
      token: token,
    },
  };
};

export default function CartContextProvider(props) {
  const [numOfItems, setNumOfItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartId, setCartId] = useState(null);

  // --- Helper function to update cart state from API response ---
  function updateCartState(data) {
    setNumOfItems(data.numOfCartItems || 0);
    setTotalPrice(data.data.totalCartPrice || 0);
    setCartProducts(data.data.products || []);
    setCartId(data.data._id || null);
  }

  // --- Main Cart Functions with proper error handling ---

  async function getCart() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        getHeaders()
      );
      updateCartState(data);
      return data;
    } catch (error) {
      // This error is common if the user has no cart yet. We handle it gracefully.
      if (error.response?.data?.message.includes("No cart exist for this user")) {
        setNumOfItems(0);
        setTotalPrice(0);
        setCartProducts([]);
      } else {
        console.error("Error fetching cart:", error);
      }
      return error;
    }
  }

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        getHeaders()
      );
      toast.success(data?.message || "Product added successfully!");
      updateCartState(data);
      return data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Could not add product.");
      return error;
    }
  }

  async function removeCartItem(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        getHeaders()
      );
      toast.success("Product removed successfully.");
      updateCartState(data);
      return data;
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error(error.response?.data?.message || "Could not remove item.");
      return error;
    }
  }

  async function updateCartItemCount(productId, count) {
    // If count is 0, remove the item instead.
    if (count < 1) {
      return removeCartItem(productId);
    }
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        getHeaders()
      );
      updateCartState(data);
      return data;
    } catch (error) {
      console.error("Error updating item count:", error);
      toast.error(error.response?.data?.message || "Could not update item.");
      return error;
    }
  }

  async function clearCart() {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        getHeaders()
      );
      // Manually reset state after clearing
      setNumOfItems(0);
      setTotalPrice(0);
      setCartProducts([]);
      setCartId(null);
      return true;
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error(error.response?.data?.message || "Could not clear cart.");
      return error;
    }
  }

  // --- Payment Functions ---

  async function onlinePayment(shippingAddress) {
    try {
      // The URL should point to your frontend's "all orders" or a success page
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173/allorders`,
        { shippingAddress },
        getHeaders()
      );
      // IMPORTANT: We do NOT clear the cart here. We only redirect.
      // The cart should be cleared only after payment is confirmed.
      return data;
    } catch (error) {
      console.error("Error creating online payment session:", error);
      toast.error(error.response?.data?.message || "Payment service failed.");
      return error;
    }
  }

  async function cashPayment(shippingAddress) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        getHeaders()
      );
      if (data.status === "success") {
        toast.success("Order placed successfully!");
        // Clear the cart after a successful cash order
        clearCart();
      }
      return data;
    } catch (error) {
      console.error("Error creating cash order:", error);
      toast.error(error.response?.data?.message || "Could not place order.");
      return error;
    }
  }
  
  // Fetch the user's cart when the app loads
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getCart();
    }
  }, []);


  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCart,
        removeCartItem,
        updateCartItemCount, // Renamed for clarity
        clearCart,
        onlinePayment,
        cashPayment,
        numOfItems,
        totalPrice,
        cartProducts,
        cartId, // CRITICAL: Added cartId to the provider
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
