
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import firstSlide from '../images/1st-slide.png'
import secondSlide from '../images/2nd-slide.png'
import thirdSlide from '../images/3rd-slide.png'
import fourthSlide from '../images/4th-slide.png'

const Carousels = () => {

  return (

    <>

    <Carousel className='carousel  container-md mt-5'>

      <Carousel.Item className='text-center'>
        <img src={firstSlide} alt="First slide" className='carousel-img'/>
      </Carousel.Item>

      <Carousel.Item className='text-center'>
        <img src={secondSlide} alt="Second slide" className='carousel-img'/>
      </Carousel.Item>

      <Carousel.Item className='text-center'>
        <img src={thirdSlide} alt="Third slide" className='carousel-img'/>
      </Carousel.Item>

      <Carousel.Item className='text-center'>
        <img src={fourthSlide} alt="Third slide" className='carousel-img'/>
      </Carousel.Item>

    </Carousel>
    
    </>


  )

}

export default Carousels