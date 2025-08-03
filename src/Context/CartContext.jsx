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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  // Use the navigate hook for internal routing
  const navigate = useNavigate();

  // State for cart details
  const [numOfItems, setNumOfItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);

  // Common headers for API calls
  let headers = { token: localStorage.getItem("userToken") };

  // --- CORE CART FUNCTIONS (Refactored with async/await and try/catch) ---

  async function getCart() {
    try {
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers });
      if (data.status === "success") {
        setNumOfItems(data.numOfCartItems);
        setTotalPrice(data.data.totalCartPrice);
        setCartId(data.data._id);
        setCartProducts(data.data.products);
      }
      return data;
    } catch (error) {
      // Handle cases where the cart is empty on the backend
      if (error.response && error.response.status === 404) {
          setNumOfItems(0);
          setTotalPrice(0);
          setCartProducts([]);
      }
      console.error("Error fetching cart:", error);
      return error;
    }
  }

  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      );
      if (data.status === "success") {
        toast.success(data.message, { duration: 2000 });
        // Refresh cart details after adding an item
        await getCart(); 
      }
      return data;
    } catch (error) {
      toast.error("Failed to add item to cart.");
      console.error("Add to cart error:", error);
      return error;
    }
  }

  async function updateCart(productId, count) {
    // Prevent quantity from dropping to 0 or less, which should be a 'remove' action
    if (count < 1) {
      return removeCartItem(productId);
    }
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );
      if (data.status === "success") {
        setTotalPrice(data.data.totalCartPrice);
        setNumOfItems(data.numOfCartItems);
        setCartProducts(data.data.products);
      }
      return data;
    } catch (error) {
      console.error("Update cart error:", error);
      return error;
    }
  }

  async function removeCartItem(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers }
      );
      if (data.status === "success") {
        setTotalPrice(data.data.totalCartPrice);
        setNumOfItems(data.numOfCartItems);
        setCartProducts(data.data.products);
        toast.success("Item removed successfully.");
      }
      return data;
    } catch (error) {
      console.error("Remove item error:", error);
      return error;
    }
  }

  async function clearCart() {
    try {
      const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers });
      if (data.message === "success") {
        setNumOfItems(0);
        setTotalPrice(0);
        setCartProducts([]);
        toast.success("Cart cleared successfully.");
      }
      return data;
    } catch (error) {
      console.error("Clear cart error:", error);
      return error;
    }
  }


  // --- PAYMENT FUNCTIONS (Corrected Logic) ---

  async function onlinePayment(shippingAddress) {
    try {
      const { data } = await axios.post(
        // Ensure the URL is correct and your server is running on this port
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      );
      if (data.status === "success") {
        // Redirect to external payment URL. This is correct.
        window.location.href = data.session.url;
      }
      return data;
    } catch (error) {
      console.error("Online payment error:", error);
      toast.error("Could not initiate online payment.");
      return error;
    }
  }

  async function cashPayment(shippingAddress) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        { headers }
      );
      if (data.status === "success") {
        toast.success("Order placed successfully!");
        // Clear cart state
        setNumOfItems(0);
        setTotalPrice(0);
        setCartProducts([]);
        // Navigate internally to the orders page after a delay to show the toast
        setTimeout(() => {
          navigate("/allorders");
        }, 1500);
      }
      return data;
    } catch (error) {
      console.error("Cash payment error:", error);
      toast.error("Failed to place order.");
      return error;
    }
  }

  // Fetch cart on initial load if there's a user token
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
        updateCart,
        clearCart,
        onlinePayment,
        cashPayment,
        numOfItems,
        totalPrice,
        cartProducts, // Pass products to be used in Cart component
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

