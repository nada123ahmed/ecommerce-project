import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

 export let CartContext =createContext();
 export default function CartContextProvider(props){
const [numOfItems, setnumOfItems] = useState(0)
const [TotalPrice, setTotalPrice] = useState(0)
const [cartId, setCartId] = useState(null)


let headers =
{ token:localStorage.getItem("userToken"),};
 async function addToCart(productId){
    return await axios.post("https://ecommerce.routemisr.com/api/v1/cart" ,{
        productId
    },
    {
        headers,
        }
       
    
).then((data)=>{
    // console.log(data?.data?.message);
    console.log(data.data.data._id
,"add");
setCartId(data.data.data._id);
//         console.log(data.data.data.totalCartPrice
// );
setTotalPrice(data.data.data.totalCartPrice)
 setnumOfItems(data.data.numOfCartItems)

    
    toast.success(data?.data?.message)
    return data
    
}
).catch((error)=>{
    // console.log(error);
    //  toast.error(data?.data?.message)
     toast.error(error.response?.data?.message || "Error adding item to cart");
    return error;
    
})

}

 async function getCart(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/cart" ,{
   
        headers,
        }
       
    
).then((data)=>{
   
    console.log(data , "get cart data");
     setnumOfItems(data.data.numOfCartItems)
    setTotalPrice(data.data.data.totalCartPrice)
setCartId(data.data.data._id)
    return data
    
}
).catch((error)=>{
    console.log(error);
    
    return error;
    
})

}


 async function removeCartItem(productId){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,
       
    {
        headers,
        }
       
    
).then((data)=>{
    // console.log(data?.data?.message);
    console.log(data , "remmove");
     setnumOfItems(data.data.numOfCartItems)
     setTotalPrice(data.data.data.totalCartPrice)

    // toast.success(data?.data?.message)
    return data
    
}
).catch((error)=>{
    // console.log(error);
    //  toast.error(data?.data?.message)
    return error;
    
})

}

 async function UpdateCart(productId,count){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{
        count
    },
    {
        headers,
        }
       
    
).then((data)=>{
    console.log(data?.data?.message);
    console.log(data , "update");
     setnumOfItems(data.data.numOfCartItems)
     setTotalPrice(data.data.data.totalCartPrice)
setCartId(data.data.data._id);
   
    return data
    
}
).catch((error)=>{
   
    return error;
    
})

}

async function onlinePayment(shippingAddress){
     const baseUrl = window.location.origin;
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}` ,{
        shippingAddress
    },
    {
        headers,
        }
       
    
).then((data)=>{
   
        console.log(data,"online payment");
        window.location.href=data.data.session.url;

// setnumOfItems(0)
//      setTotalPrice(0)
    
   
    return data
    
}
).catch((error)=>{
  
 
    return error;
    
})

}
async function cashPayment(shippingAddress){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,{
        shippingAddress
    },
    {
        headers,
        }
       
    
).then((data)=>{
   
        console.log(data,"online payment");
        // window.location.href="http://localhost:5173"
         window.location.href="/allorders";
setnumOfItems(0)
     setTotalPrice(0)

    
   
    return data
    
}
).catch((error)=>{
    
 
    return error;
    
})

}
async function ClearCart(){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` ,
       
    {
        headers,
        }
       
    
).then((data)=>{
    // console.log(data?.data?.message);
    console.log(data , "clear data");
     setnumOfItems(0)
     setTotalPrice(0)

    // toast.success(data?.data?.message)
    return data
    
}
).catch((error)=>{
    // console.log(error);
    //  toast.error(data?.data?.message)
    return error;
    
})

}


    return <CartContext.Provider value={{addToCart , getCart,removeCartItem ,UpdateCart, numOfItems,TotalPrice ,ClearCart ,onlinePayment,cashPayment}}>
{props.children}
    </CartContext.Provider>

 }
