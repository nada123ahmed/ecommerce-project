
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export let WishlistContext = createContext();

export default function WishlistContextProvider(props) {

  const [wishlistItems, setWishlistItems] = useState([]); 

  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0); 

  const [wishlistProductIds, setWishlistProductIds] = useState([]);

  let headers = {
    token: localStorage.getItem("userToken"), 
  };


  async function addToWishlist(productId) {
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId }, 
        { headers } 
      );
      if (data.status === "success") {
        toast.success(data.message); 
        setWishlistProductIds(data.data); 
        setNumOfWishlistItems(data.data.length);
        getWishlist(); 
        return true; 
      }
    } catch (error) {
      // console.error("Error adding to wishlist", error);
      // toast.error("Failed to add to wishlist");
       const errorMessage = error.response?.data?.message || "Failed to add to wishlist";
    toast.error(errorMessage);
      return false; 
    }
  }
  async function removeWishlistItem(productId) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, 
        { headers }
      );
      if (data.status === "success") {
        toast.success(data.message); 
        setWishlistProductIds(data.data); 
        setNumOfWishlistItems(data.data.length);
        getWishlist(); 
        return true; 
      }
    } catch (error) {
      console.error("Error removing from wishlist", error);
      toast.error("Failed to remove from wishlist");
      return false; 
    }
  }


  async function getWishlist() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers }
      );
      if (data.status === "success") {
        setWishlistItems(data.data);
        setNumOfWishlistItems(data.count); 
        setWishlistProductIds(data.data.map(item => item.id)); 
        return data; 
      }
    } catch (error) {
      console.error("Error getting wishlist", error);
     
      if (error.response && error.response.status === 404) {
          setWishlistItems([]);
          setNumOfWishlistItems(0);
          setWishlistProductIds([]);
      } else {
        toast.error("Failed to fetch wishlist");
      }
      return null; 
    }
  }

 
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getWishlist();
    }
  }, []); 

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        removeWishlistItem,
        getWishlist,
        wishlistItems, 
        wishlistProductIds, 
        numOfWishlistItems,
        setWishlistItems, 
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}
