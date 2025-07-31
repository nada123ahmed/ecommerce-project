
import React from 'react';
import "./CheckOut.module.css";
import { useFormik } from 'formik';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast'; 

export default function CheckOut() {
  let { onlinePayment, cashPayment } = useContext(CartContext);

  async function PerformPayment(values) {
    try {
      if (values.paymentMethod === "online") {
        await onlinePayment(values);
      } else if (values.paymentMethod === "cash") {
        await cashPayment(values);
      } else {
        console.warn("No payment method selected.");
        toast.error("Please select a payment method.");
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      toast.error("An error occurred during payment. Please try again.");
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      paymentMethod: '', 
    },
   
   
    onSubmit: (values) => {
      PerformPayment(values);
      console.log(values); 
    },
  });

  return (
    <div className='w-1/2 mx-auto p-4'> 
      <h2 className='text-green-600 text-3xl mb-4'>Enter your shipping data:</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="Details (e.g., street, building, apartment)"
          className={formik.errors.details && formik.touched.details ? `input w-full focus:outline-0 rounded-lg my-2 border-red-400 p-2` : `input w-full focus:outline-0 rounded-lg my-2 p-2`}
          name='details'
          onChange={formik.handleChange}
          value={formik.values.details}
          onBlur={formik.handleBlur}
        />
        {formik.touched.details && formik.errors.details ? <div role="alert" className="alert alert-error alert-outline text-red-700 text-sm mt-1"> {formik.errors.details}</div> : null}

        <input
          type="tel"
          placeholder="Phone (e.g., 01xxxxxxxxx)"
          className={formik.errors.phone && formik.touched.phone ? `input w-full focus:outline-0 rounded-lg my-2 border-red-400 p-2` : `input w-full focus:outline-0 rounded-lg my-2 p-2`}
          name='phone'
          onChange={formik.handleChange}
          value={formik.values.phone}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone ? <div role="alert" className="alert alert-error alert-outline text-red-700 text-sm mt-1"> {formik.errors.phone}</div> : null}

        <input
          type="text"
          placeholder="City"
          className={formik.errors.city && formik.touched.city ? `input w-full focus:outline-0 rounded-lg my-2 border-red-400 p-2` : `input w-full focus:outline-0 rounded-lg my-2 p-2`}
          name='city'
          onChange={formik.handleChange}
          value={formik.values.city}
          onBlur={formik.handleBlur}
        />
        {formik.touched.city && formik.errors.city ? <div role="alert" className="alert alert-error alert-outline text-red-700 text-sm mt-1"> {formik.errors.city}</div> : null}

        <div className='text-end mt-4'>
          <fieldset className="fieldset">
            <select 
             
              className="select select-bordered w-full my-2 p-2" 
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name='paymentMethod'
            >
              <option value="" disabled>Pick a payment method</option>
              <option value="online">ONLINE payment</option>
              <option value="cash">CASH payment</option>
            </select>
          </fieldset>
          <button type='submit' className='px-6 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 active:bg-green-200 transition duration-300'>CheckOut</button>
        </div>
      </form>
    </div>
  );
}

