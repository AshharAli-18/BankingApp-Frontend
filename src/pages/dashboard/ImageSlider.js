import React from 'react';
import Slider from 'react-slick';
import { Button, Container, Typography, Box } from '@mui/material'; // Import Typography and Box from Material-UI
import FeatureBox from './FeatureBox';

// Import slick-carousel CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

const ImageSlider = () => {
  const settings = {
    infinite: true,
    speed: 2000, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000 
  };
  const navigate=useNavigate(); 

  const handleSignUpClick=()=>{
    navigate(`/Registration`);
  }
  return (
    <>
      <style>
        {`
          body, html, #root {
            height: 100%;
            margin: 0;
            padding: 0;
            overflow-x: hidden; /* Prevent horizontal scrolling */
          }
          .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
            z-index: 1;
            pointer-events: none;
          }
          .slider-image-container {
            position: relative;
            height: 100vh; /* Ensure the image container takes full viewport height */
          }
          .slider-image {
            width: 100%;
            height: 100%;
            object-fit: cover; /* Ensure the image covers the entire container */
          }
          .container-overflow-hidden {
            overflow: hidden; /* Prevent any overflow */
          }
          .slider-primary-text, .slider-secondary-text, .slider-button {
            position: absolute;
            left: 55%;
            z-index: 2;
            color: white;
          }
          .slider-primary-text {
            bottom: 55%;
          }
          .slider-secondary-text {
            bottom: 47.5%;
          }
          .slider-button {
            bottom: 40%;
            padding: 10px;
            border-radius: 5px;
            border: 2px solid #e53935; 
            background-color: #e53935; 
            font-size: 20px;
          }
          .slider-feature-container {
            display: flex;
            flex-direction: column;
            
          }
          .feature-box-container {
            z-index: 3; /* Ensure the FeatureBox is on top */
            margin-top: -60px;
          }
        `}
      </style>
      <Container maxWidth={false} disableGutters className="container-overflow-hidden">
        <Box className="slider-feature-container">
          <Slider {...settings}>
            <div className="slider-image-container">
              <img src="images/inetbanking.jpg" alt="Slide 1" className="slider-image" />
              <div className="gradient-overlay"></div>
              <Typography variant="h2" className="slider-primary-text"><strong>Open your <span style={{color: '#e53935'}}>Digital</span> <br/> Account online!</strong></Typography>
              <Typography variant="h5" className="slider-secondary-text">Open your online account and experience the best banking <br/>services across the country</Typography>
              <Button className="slider-button" onClick={handleSignUpClick}>Open Account</Button>
            </div>
            <div className="slider-image-container">
              <img src="images/card.jpg" alt="Slide 2" className="slider-image" />
              <div className="gradient-overlay"></div>
              <Typography variant="h2" className="slider-primary-text"><strong>Open your <span style={{color: '#e53935'}}>Digital</span> <br/> Account online!</strong></Typography>
              <Typography variant="h5" className="slider-secondary-text">Open your online account and experience the best banking <br/>services across the country</Typography>
              <Button className="slider-button" onClick={handleSignUpClick}>Open Account</Button>
            </div>
            <div className="slider-image-container">
              <img src="images/employemeeting.jpg" alt="Slide 3" className="slider-image" />
              <div className="gradient-overlay"></div>
              <Typography variant="h2" className="slider-primary-text"><strong>Open your <span style={{color: '#e53935'}}>Digital</span> <br/> Account online!</strong></Typography>
              <Typography variant="h5" className="slider-secondary-text">Open your online account and experience the best banking <br/>services across the country</Typography>
              <Button className="slider-button" onClick={handleSignUpClick}>Open Account</Button>
            </div>
            <div className="slider-image-container">
              <img src="images/meeting2.jpg" alt="Slide 4" className="slider-image" />
              <div className="gradient-overlay"></div>
              <Typography variant="h2" className="slider-primary-text"><strong>Open your <span style={{color: '#e53935'}}>Digital</span> <br/> Account online!</strong></Typography>
              <Typography variant="h5" className="slider-secondary-text">Open your online account and experience the best banking <br/>services across the country</Typography>
              <Button className="slider-button" onClick={handleSignUpClick}>Open Account</Button>
            </div>
          </Slider>
          <Box className="feature-box-container">
            <FeatureBox />
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ImageSlider;
