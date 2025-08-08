
// import React from 'react';
// import "./CheckOut.module.css";
// import { useFormik } from 'formik';
// import { useContext } from 'react';
// import { CartContext } from '../../Context/CartContext';
// import toast from 'react-hot-toast'; 

// export default function CheckOut() {
//   let { onlinePayment, cashPayment } = useContext(CartContext);

//   async function PerformPayment(values) {
//     try {
//       if (values.paymentMethod === "online") {
//         await onlinePayment(values);
//       } else if (values.paymentMethod === "cash") {
//         await cashPayment(values);
//       } else {
//         console.warn("No payment method selected.");
//         toast.error("Please select a payment method.");
//       }
//     } catch (error) {
//       console.error("Error during payment processing:", error);
//       toast.error("An error occurred during payment. Please try again.");
//     }
//   }

//   let formik = useFormik({
//     initialValues: {
//       details: "",
//       phone: "",
//       city: "",
//       paymentMethod: '', 
//     },
   
   
//     onSubmit: (values) => {
//       PerformPayment(values);
//       console.log(values); 
//     },
//   });

//   return (
//     <div className='w-1/2 mx-auto p-4'> 
//       <h2 className='text-green-600 text-3xl mb-4'>Enter your shipping data:</h2>
//       <form onSubmit={formik.handleSubmit}>
//         <input
//           type="text"
//           placeholder="Details (e.g., street, building, apartment)"
//           className={formik.errors.details && formik.touched.details ? `input w-full focus:outline-0 rounded-lg my-2 border-red-400 p-2` : `input w-full focus:outline-0 rounded-lg my-2 p-2`}
//           name='details'
//           onChange={formik.handleChange}
//           value={formik.values.details}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.details && formik.errors.details ? <div role="alert" className="alert alert-error alert-outline text-red-700 text-sm mt-1"> {formik.errors.details}</div> : null}

//         <input
//           type="tel"
//           placeholder="Phone (e.g., 01xxxxxxxxx)"
//           className={formik.errors.phone && formik.touched.phone ? `input w-full focus:outline-0 rounded-lg my-2 border-red-400 p-2` : `input w-full focus:outline-0 rounded-lg my-2 p-2`}
//           name='phone'
//           onChange={formik.handleChange}
//           value={formik.values.phone}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.phone && formik.errors.phone ? <div role="alert" className="alert alert-error alert-outline text-red-700 text-sm mt-1"> {formik.errors.phone}</div> : null}

//         <input
//           type="text"
//           placeholder="City"
//           className={formik.errors.city && formik.touched.city ? `input w-full focus:outline-0 rounded-lg my-2 border-red-400 p-2` : `input w-full focus:outline-0 rounded-lg my-2 p-2`}
//           name='city'
//           onChange={formik.handleChange}
//           value={formik.values.city}
//           onBlur={formik.handleBlur}
//         />
//         {formik.touched.city && formik.errors.city ? <div role="alert" className="alert alert-error alert-outline text-red-700 text-sm mt-1"> {formik.errors.city}</div> : null}

//         <div className='text-end mt-4'>
//           <fieldset className="fieldset">
//             <select 
             
//               className="select select-bordered w-full my-2 p-2" 
//               value={formik.values.paymentMethod}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//               name='paymentMethod'
//             >
//               <option value="" disabled>Pick a payment method</option>
//               <option value="online">ONLINE payment</option>
//               <option value="cash">CASH payment</option>
//             </select>
//           </fieldset>
//           <button type='submit' className='px-6 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 active:bg-green-200 transition duration-300'>CheckOut</button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useContext, useState } from 'react';
// Make sure to import styles if you have them
// import "./CheckOut.module.css"; 
import { useFormik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function CheckOut() {
  // Get payment functions from context
  const { onlinePayment, cashPayment, cartId } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  // --- Main Payment Logic ---
  // This function now handles loading states and potential errors
  async function performPayment(values) {
    setIsLoading(true);
    const toastId = toast.loading('Processing your order...');

    try {
      let response;
      if (values.paymentMethod === "online") {
        // The 'onlinePayment' function should handle the redirection
        response = await onlinePayment(cartId, values);
        // Log the response to see the session URL
        console.log("Online Payment Response:", response);
        if (response?.data?.session.url) {
            // Redirect to the payment gateway
            window.location.href = response.data.session.url;
        } else {
            throw new Error("Could not retrieve payment URL.");
        }

      } else if (values.paymentMethod === "cash") {
        // The 'cashPayment' function should handle navigation to a success page
        response = await cashPayment(cartId, values);
        // After cash payment, you should probably navigate the user
        // to a "Thank You" or "My Orders" page.
        // This navigation logic should be inside the 'cashPayment' function or here.
        console.log("Cash Payment Response:", response);
      } else {
        // This case should not happen if validation is correct
        toast.error("Please select a payment method.", { id: toastId });
      }

    } catch (error) {
      // Catch any errors during the process
      console.error("Error during payment processing:", error);
      toast.error("An error occurred. Please try again.", { id: toastId });
    } finally {
      // Always stop the loading indicator
      setIsLoading(false);
    }
  }

  // --- Form Validation Schema using Yup ---
  // This ensures that the user cannot submit the form with invalid data
  const validationSchema = Yup.object({
    details: Yup.string().required('Shipping details are required').min(10, 'Please provide more details'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number'),
    city: Yup.string().required('City is required').min(3, 'City name is too short'),
    paymentMethod: Yup.string().required('Please select a payment method'),
  });

  // --- Formik Hook Setup ---
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: '',
    },
    validationSchema: validationSchema, // Apply the validation schema
    onSubmit: (values) => {
      performPayment(values);
    },
  });

  return (
    <div className='w-full max-w-lg mx-auto p-4 my-8'>
      <h2 className='text-green-600 text-3xl font-bold mb-6 text-center'>Shipping Information</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        
        {/* Details Input */}
        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
          <input
            id="details"
            type="text"
            placeholder="e.g., Street, building, apartment"
            className={`input w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.details && formik.errors.details ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'}`}
            name='details'
            onChange={formik.handleChange}
            value={formik.values.details}
            onBlur={formik.handleBlur}
          />
          {formik.touched.details && formik.errors.details ? <div className="text-red-600 text-sm mt-1">{formik.errors.details}</div> : null}
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="e.g., 01xxxxxxxxx"
            className={`input w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.phone && formik.errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'}`}
            name='phone'
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phone && formik.errors.phone ? <div className="text-red-600 text-sm mt-1">{formik.errors.phone}</div> : null}
        </div>

        {/* City Input */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            id="city"
            type="text"
            placeholder="e.g., Cairo, Alexandria"
            className={`input w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.city && formik.errors.city ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'}`}
            name='city'
            onChange={formik.handleChange}
            value={formik.values.city}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? <div className="text-red-600 text-sm mt-1">{formik.errors.city}</div> : null}
        </div>

        {/* Payment Method Select */}
        <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
                id="paymentMethod"
                className={`select w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.paymentMethod && formik.errors.paymentMethod ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'}`}
                value={formik.values.paymentMethod}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name='paymentMethod'
            >
                <option value="" disabled>Pick a payment method</option>
                <option value="online">Online Payment</option>
                <option value="cash">Cash on Delivery</option>
            </select>
            {formik.touched.paymentMethod && formik.errors.paymentMethod ? <div className="text-red-600 text-sm mt-1">{formik.errors.paymentMethod}</div> : null}
        </div>

        {/* Submit Button */}
        <div className='text-end mt-6'>
          <button 
            type='submit' 
            className='w-full px-6 py-3 bg-green-600 text-white font-bold rounded-lg cursor-pointer hover:bg-green-700 active:bg-green-800 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed'
            disabled={isLoading || !formik.isValid || !formik.dirty}
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </div>
  );
}
