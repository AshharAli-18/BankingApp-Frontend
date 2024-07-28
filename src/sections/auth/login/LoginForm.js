  import { useEffect, useState } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useDispatch, useSelector } from 'react-redux';
  import axios from 'axios'; // Import Axios

  import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
  import { LoadingButton } from '@mui/lab';
  import Router2 from '../../../routes'
  import { loginRequest } from '../../../../redux/action';
  // import { loginUser } from '../';
  import Iconify from '../../../components/iconify';


  export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // State to track loading stateF
    const [error, setError] = useState(''); // State to display error messages
    const dispach= useDispatch();
    
    
    const navigate = useNavigate();

    const [values, setValues] = useState({
      phone: '',
      password: '',
    })

    const handleInput = (event)=>{
      setValues(prev => ({ ...prev, [event.target.name]: [event.target.value]}))
    }

    
   const  loginObject = useSelector(state => state.user.user);

   const handleSubmit1 = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true while request is being processed
  
    try {
      await dispach(loginRequest(values.phone, values.password)); // Pass phone and password separately
  
    } catch (error) {
      setError('An error occurred while logging in.'); // Handle any errors that occur during login
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };
    
   useEffect(() => {
    if(loginObject)
    {
      // console.log("user is:", loginObject.Login);
      console.log("user is:", loginObject);
      
      // After dispatching the login request, check if login was successful
      if (loginObject && loginObject.Login && loginObject.token) {
      
        navigate('/Admindashboard');
       <Router2 />
     } else {
       alert('Invalid Credentials!');
     }
    }
  }, [loginObject]);

  
  

    return (
      <>
        <Stack spacing={3}>
        <TextField
            name="phone"
            label="Phone number"
            value={values.phone}
            onChange={handleInput}
          />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleInput}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        {error && <div style={{ color: 'red' }}>{error}</div>}

        <LoadingButton fullWidth size="large" variant="contained" onClick={handleSubmit1} className='bg-blue-600' loading={loading}>
          Login
        </LoadingButton>
      </>
    );
  }
