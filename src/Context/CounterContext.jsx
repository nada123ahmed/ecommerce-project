import React, { createContext, useState } from 'react'



  export let CounterContext   =   createContext();
 export  function CounterContextProvider(props){


   
    
    const [Counter, setCounter] = useState(30)
return <CounterContext.Provider value={{Counter, setCounter}}>
{props.children}
</CounterContext.Provider>
  }