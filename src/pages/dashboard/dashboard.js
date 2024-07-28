import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Header from './Header';
import ImageSlider from './ImageSlider';
import Footer from './Footer';
import FeatureBox from './FeatureBox';
import LoginPage from '../LoginPage';
import ThreeDPhone from '../MobileBanking';
import { Box } from '@mui/material';

export default function Dashboard() {
  return (
    <div>
       <Box sx={{backgroundColor:'#a9a9a9', height:'100vh' }}>
       <Header />
       <ImageSlider />
       <Footer />
      </Box>
    </div>
  );
}
