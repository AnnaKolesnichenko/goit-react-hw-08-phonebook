import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import error from '../../images/error.jpeg';

const backgroundStyles = {
    backgroundImage: `url(${error})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'top',
    width: '100vw',
    height: '100vh',
    marginTop: '-10px'
  };

const NotExisting = () => {
  return (
    <div style={backgroundStyles}>
      <Typography variant='h5' paddingTop={4} color='white'>Ooooops.... Something went wrong, there is no page like this...</Typography>
      <Button component={Link} to='/' variant='contained' color='secondary' size='large' sx={{marginTop: '20px'}}>GO BACK</Button>
    </div>
  )
}

export default NotExisting
