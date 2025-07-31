import React, { useContext, useState } from 'react'
import "./Login.module.css"
import { useFormik } from 'formik';
 import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/TokenContext';

export default function Login() {
  const [userMessage, setUserMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isloading, setIsloading] = useState(false);
  let {Token, setToken} = useContext(TokenContext);
let navigate = useNavigate()
let mySchema= Yup.object({
      email: Yup.string().required("email is req").email(),
      password:Yup.string().required("password is req").matches(/^[A-Z][a-z0-9]{3,8}$/,"Password must start with a capital letter and be 4-9 characters long"),
     
})
 let formik=useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:mySchema,
    // onSubmit:(values)=>{
    // console.log(values);
    // registerForm(values);
    // return;
    // }
    onSubmit: (values) => {
  if ( !values.email || !values.password ) {
    console.log("Please fill all fields before submitting");
    return;
  }
  console.log("Submitting values:", values);
  loginForm(values);
},
  })

async function loginForm(values) {
  setIsloading(true);
    try {
     return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data)=>{
console.log(data.data.token);
localStorage.setItem("userToken",data.data.token)
setToken(data.data.token);
setUserMessage(data.data.message);
setErrorMessage(null);
navigate("/");
setIsloading(false);
      });
    
    } catch (error) {
      console.log(error.response.data.message);
      setUserMessage(null);
      setErrorMessage(error.response.data.message);
      setIsloading(false);

      // alert(error.response?.data?.message || "Registration failed");
    }
  }
  return (
     <div className='w-[70%] mx-auto my-4'>
      <h2 className='text-3xl font-bold my-4'>Login Now :</h2>
      {userMessage ? <div role="alert" className="alert alert-success">
        <p>
          {userMessage}
        </p>
      </div>:null}

       {errorMessage ? <div role="alert" className="alert alert-warning">
        <p>
          {errorMessage}
        </p>
      </div>:null}
      <form onSubmit={formik.handleSubmit}>
       
         <input
          type="email"
           placeholder="email" 
           className={formik.errors.email ?`input w-full focus:outline-0 rounded-lg my-2 border-red-400`:`input w-full focus:outline-0 rounded-lg my-2`} 
           name='email'
            onChange={formik.handleChange}
         value={formik.values.email}
         onBlur={formik.handleBlur}
           />
           { formik.touched.email && formik.errors.email ? <div role="alert" className="alert alert-error alert-outline"> {formik.errors.email}</div>:null}
         <input 
         type="password" 
         placeholder="password"
          className={formik.errors.password ?`input w-full focus:outline-0 rounded-lg my-2 border-red-400`:`input w-full focus:outline-0 rounded-lg my-2`}
          name='password'
           onChange={formik.handleChange}
         value={formik.values.password}
         onBlur={formik.handleBlur}
          />
            { formik.touched.password && formik.errors.password ? <div role="alert" className="alert alert-error alert-outline"> {formik.errors.password}</div>:null}
        
          <div className='text-end '>
            {isloading ? <button type='submit' className='px-6 py-3 bg-green-500 text-white rounded-lg cursor-pointer active:bg-green-200'><i className='fa fa-spinner fa-spin'></i></button>:<button type='submit' className='px-6 py-3 bg-green-500
           text-white rounded-lg cursor-pointer active:bg-green-200'>Login</button>}
            
            
          </div>
      </form>
    </div>
  )
}
