import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {useNavigate} from 'react-router-dom' 

export default function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(`/login`); 
  };
  const handleSignUpClick=()=>{
    navigate(`/Registration`);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
      position="static" 
      color="black" 
     >
        <Toolbar>
          <Box sx={{ ml: '350px' }} />
          <Button color="white" >Career</Button>
          <Button color="white">FAQ</Button>
          <Button color="white">Rewards</Button>
          <Button color="white">Media</Button>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="white" startIcon={<EmailIcon />} sx={{ textTransform: 'none' }}>info@example.com</Button>
          <Button color="white" startIcon={<LocationOnIcon />} sx={{ textTransform: 'none' }}>Find nearest branch</Button>
        </Toolbar>
      </AppBar>

      <AppBar position="static" color='white'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="black">About</Button>
          <Button color="black">Services</Button>
          <Button color="black">Pages</Button>
          <Button color="black">Contact</Button>
          <Button
            color="black"
            sx={{
              ml: '200px',
              textTransform: 'none',
              border: '1px solid black'
            }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            variant='contained'
            color='red'
            style={{ color: 'white' }}
            sx={{
              ml: '20px',
              textTransform: 'none',
              border: '1px solid red',
            }}
            onClick={handleSignUpClick}
          >
            Open Account
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{

          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: '#e53935',
          width: { xs: '200px', sm: '350px' }, 
          height: { xs: 'auto', sm: '130px' }, 
          clipPath:  'polygon(0 0, 100% 0, 90% 100%, 0% 100%)' , 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <IconButton color="white">
          <AccountBalanceIcon fontSize="large" 
          sx={{
            ml: '-40px',
            mt:'5px',
            fontSize: '30px'
          }} />
        </IconButton>
        <Typography variant="h6" component="div"
         style={{ 
          color: 'white',
          fontSize: '30px',
          marginTop:'10px',
          marginLeft:'-10px'
           }}>
        <span style={{ fontWeight: 'bold' }}>Metro</span><span style={{ fontWeight: 'lighter' }}>Bank</span>
        </Typography>
      </Box>
    </Box>
  );
}
