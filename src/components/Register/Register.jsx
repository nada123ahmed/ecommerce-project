import React, { useState } from 'react'

 import { useFormik } from 'formik';
 import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.module.css"
export default function Register() {



const [userMessage, setUserMessage] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);
const [isloading, setIsloading] = useState(false);
 let navigate = useNavigate()
let mySchema= Yup.object({
   name:Yup.string().required(" name is req").min(3, "cant be less than 3 chars").max(10 , "max is 10 chars"),
      email: Yup.string().required("email is req").email(),
      password:Yup.string().required("password is req").matches(/^[A-Z][a-z0-9]{3,8}$/,"Password must start with a capital letter and be 4-9 characters long"),
      rePassword:Yup.string().required("repassword is req").oneOf([Yup.ref("password")], "Passwords must match"),
      phone:Yup.string().required("phone is req").matches(/^(002)?01[0125][0-9]{8}$/,"invalid phone num"),
})
  let formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema:mySchema,
   
    onSubmit: (values) => {
  if (!values.name || !values.email || !values.password || !values.rePassword || !values.phone) {
    console.log("Please fill all fields before submitting");
    return;
  }
  console.log("Submitting values:", values);
  registerForm(values);
},
  })

/
async function registerForm(values) {
  setIsloading(true);
    try {
     return await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data)=>{
console.log(data.data.message);
setUserMessage(data.data.message);
setErrorMessage(null);
navigate("/Login");
setIsloading(false);
      });
    
    } catch (error) {
      console.log(error.response.data.message);
      setUserMessage(null);
      setErrorMessage(error.response.data.message);
      setIsloading(false);

      
    }
  }
  return (
    <div className='w-[70%] mx-auto my-4'>
      <h2 className='text-3xl font-bold my-4'>Register Now :</h2>
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
         type="text" 
         placeholder="Name" 
         className={formik.errors.name ?`input w-full focus:outline-0 rounded-lg my-2 border-red-400`:`input w-full focus:outline-0 rounded-lg my-2`} 
         name='name'
          onChange={formik.handleChange}
         value={formik.values.name}
         onBlur={formik.handleBlur}
         />
        { formik.touched.name && formik.errors.name ? <div role="alert" className="alert alert-error alert-outline"> {formik.errors.name}</div>:null }
       
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
          <input 
         type="password" 
         placeholder=" Re-password"
          className={formik.errors.rePassword ?`input w-full focus:outline-0 rounded-lg my-2 border-red-400`:`input w-full focus:outline-0 rounded-lg my-2`}
          name='rePassword'
           onChange={formik.handleChange}
         value={formik.values.rePassword}
         onBlur={formik.handleBlur}
          />
            { formik.touched.rePassword && formik.errors.rePassword ? <div role="alert" className="alert alert-error alert-outline"> {formik.errors.rePassword}</div>:null}
           <input 
         type="tel" 
         placeholder=" Phone"
          className={formik.errors.phone ?`input w-full focus:outline-0 rounded-lg my-2 border-red-400`:`input w-full focus:outline-0 rounded-lg my-2`}
          name='phone'
           onChange={formik.handleChange}
         value={formik.values.phone}
         onBlur={formik.handleBlur}
          />
           { formik.touched.phone && formik.errors.phone ? <div role="alert" className="alert alert-error alert-outline"> {formik.errors.phone}</div>:null}
          <div className='text-end '>
            {isloading ? <button type='submit' className='px-6 py-3 bg-green-500 text-white rounded-lg cursor-pointer active:bg-green-200'><i className='fa fa-spinner fa-spin'></i></button>:<button type='submit' className='px-6 py-3 bg-green-500
           text-white rounded-lg cursor-pointer active:bg-green-200'>Register</button>}
            
            
          </div>
      </form>
    </div>
  )
}
