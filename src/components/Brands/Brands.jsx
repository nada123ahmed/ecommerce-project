
import React from 'react';
import './Brands.module.css'; 
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom'; 

export default function Brands() {


  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  
  let { data, isLoading, isError, error } = useQuery({
    queryKey: ['allBrands'], 
    queryFn: getAllBrands, 
    staleTime: 5 * 60 * 1000, 
  });



  if (isLoading) {
    return <Loader />; 
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className='text-center text-red-600 font-extrabold text-3xl '>Error: {error.message}</p>
      </div>
    ); 
  }

  return (
    <>
      <div className='container mx-auto py-8'>
        <h2 className='text-green-700 text-3xl my-5 text-center'>All Brands</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.data.map((brand) => (
           
            // <Link to={`/products/brand/${brand._id}`} key={brand._id} className="block">
            <div key={brand._id} className="brand-card border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={brand.image} // الـ API بيرجع image للوجو الماركة
                alt={brand.name}
                className="w-full h-48 object-contain p-4" 
              />
              <div className="p-4 text-center border-t">
                <h3 className="text-xl font-semibold text-gray-800">{brand.name}</h3>
              </div>
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </>
  );
}
