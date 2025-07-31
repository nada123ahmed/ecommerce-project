import React from 'react'
import "./CatSlider.module.css"
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Slider from 'react-slick';
export default function CatSlider() {
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplayspeed:1000,
  };

function getCatSlider(){
  return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
}

  let {data}=useQuery({
    queryKey:["CatSlider"],
    queryFn:getCatSlider
  })

  let CatSlider=data?.data?.data
  return (
    <div className='container mx-auto my-10 '>
      <h1>show popular categories</h1>
      
           <Slider {...settings}>
          {CatSlider?.map((Cat)=><>
          <img className='h-[200px]  object-fit-cover' src={Cat.image} alt="catimg" />
          <p className='flex-wrap'>{Cat.name}</p>
          </>)}
        </Slider>
       
    </div>
  )
}
