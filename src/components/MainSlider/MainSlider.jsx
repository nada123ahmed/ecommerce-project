import React from 'react'
import "./MainSlider.module.css"
import slider1 from "./../../assets/grocery-banner-2.jpeg"
import slider2 from "./../../assets/grocery-banner.png"
import slider3 from "./../../assets/slider-image-1.jpeg"
import slider4 from "./../../assets/slider-image-2.jpeg"
import slider5 from "./../../assets/slider-image-3.jpeg"
import Slider from 'react-slick'
export default function MainSlider() {

   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplayspeed:1000,
  };

  return (
    <div className='container mx-auto my-5'>
      <div className='flex'>
        <div className='w-3/4'>
        <Slider {...settings}>
          <img className='h-[400px]' src={slider1} alt="sliderimg1" />
          <img className='h-[400px]'  src={slider3} alt="sliderimg2" />
          <img className='h-[400px]' src={slider2} alt="sliderimg3" />
        </Slider>
        </div>
        <div className="w-1/4">
        <img className='h-[200px]'  src={slider4} alt="imgslider4" />
        <img className='h-[200px]' src={slider5} alt="imgslider5" />
        </div>
      </div>
    </div>
  )
}
