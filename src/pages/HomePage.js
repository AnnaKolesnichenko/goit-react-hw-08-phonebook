import React from 'react';
import backgroundImage from '../images/p.jpeg'; 
import { Typography } from '@mui/material';

const HomePage = () => {
  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    width: '100vw',
    height: '100vh',
  };

  return (
    <div style={backgroundStyles}>
      <Typography variant='h5' color="#01579b" textAlign='left' paddingLeft={4} paddingTop={6} >CREATE YOUR OWN BOOK OF CONTACTS</Typography>
      <Typography variant='h6' color="#0277bd" textAlign='left' paddingLeft={4} paddingTop={4}>EASY... FAST... SECURE</Typography>
      <Typography variant='subtitle1' color="#0288d1" textAlign='left' paddingLeft={4} paddingTop={4}>STAY CONNECTED</Typography>
    </div>
  );
};

export default HomePage;

