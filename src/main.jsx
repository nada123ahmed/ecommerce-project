
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"

import { TokenContextProvider } from './Context/TokenContext.jsx'
import CartContextProvider from './Context/CartContext.jsx';
import WishlistContextProvider from './Context/WishlistContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
        
          {/* <CounterContextProvider> */} 

            <App />

          {/* </CounterContextProvider> */}
        </WishlistContextProvider>
      </CartContextProvider>
    </TokenContextProvider>
  </StrictMode>
)