
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import './index.css'
// import App from './App.jsx'
// import "@fortawesome/fontawesome-free/css/all.min.css"

// import { TokenContextProvider } from './Context/TokenContext.jsx'
// import CartContextProvider from './Context/CartContext.jsx';
// import WishlistContextProvider from './Context/WishlistContext.jsx';


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <TokenContextProvider>
//       <CartContextProvider>
//         <WishlistContextProvider>
        
         

//             <App />

         
//         </WishlistContextProvider>
//       </CartContextProvider>
//     </TokenContextProvider>
//   </StrictMode>
// )
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import App from './App.jsx';
import "@fortawesome/fontawesome-free/css/all.min.css";

// 1. قم باستيراد BrowserRouter
import { BrowserRouter } from 'react-router-dom'; 

import { TokenContextProvider } from './Context/TokenContext.jsx';
import CartContextProvider from './Context/CartContext.jsx';
import WishlistContextProvider from './Context/WishlistContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. اجعل BrowserRouter هو المكون الخارجي الذي يغلف كل شيء */}
    <BrowserRouter> 
      <TokenContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <App />
          </WishlistContextProvider>
        </CartContextProvider>
      </TokenContextProvider>
    </BrowserRouter>
  </StrictMode>
);