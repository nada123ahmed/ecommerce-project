
import './Categories.module.css'; 
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader'; 
import { Link } from 'react-router-dom'; 

export default function Categories() {

  function getAllCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }


  let { data, isLoading, isError, error } = useQuery({
    queryKey: ['allCategories'], 
    queryFn: getAllCategories, 
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
        <h2 className='text-green-700 text-3xl my-5 text-center'>Shop Popular Categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.data.map((category) => (
            <Link to={`/products/category/${category._id}`} key={category._id} className="block"> 
              <div className="category-card border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover" 
                />
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
