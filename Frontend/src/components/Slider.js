import React, { useEffect, useState } from "react";
import axios from "../services/axiosService";
import { ToastContainer, toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import Arrows from "./Arrows";
import "./slider.css";

function Slider(props) {

  const numSlider=props.slides;
  const infinite=props.infinite;

  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderImage, setSliderImage] = useState([]);

  const len = sliderImage.length - 1;

  React.useEffect(() => {

    axios.get('/api/carousel/'+numSlider)
        .then(res => {
          if(res.data.status===true){
            setSliderImage(res.data.dataSet);
          }else{
            toast.warn(res.data.message, { position: toast.POSITION.TOP_RIGHT })
          }
          
        })
        .catch((error) => {

    })

  }, []);

  
  useEffect(() => {
      if(infinite===true){ 
        const interval = setInterval(() => {
          setActiveIndex(activeIndex === len ? 0 : activeIndex + 1);
        }, 3000);
        return () => clearInterval(interval);
      }
  }, [activeIndex]);
 

  return (
    <>
    {sliderImage.length<=10?
    <div className="slider-container">
      <SliderContent activeIndex={activeIndex} sliderImage={sliderImage} />

      {sliderImage.length!=1?
      <Arrows
        prevSlide={() =>
          setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)
        }
        nextSlide={() =>
          setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
        }
      />:""}

      <Dots
        activeIndex={activeIndex}
        sliderImage={sliderImage}
        onclick={(activeIndex) => setActiveIndex(activeIndex)}
      />
      <ToastContainer />
    </div>:""}
    </>
  );
}

export default Slider;
