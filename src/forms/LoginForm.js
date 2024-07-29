import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Stack, IconButton, InputAdornment, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../components/iconify';
import { customerloginRequest } from '../redux/actions';
import { adminloginRequest } from '../redux/actions';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading state
  const [error, setError] = useState(''); // State to display error messages
  const dispach= useDispatch();
  const navigate=useNavigate();
    
  // const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
    role: '',
  });

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit  = async (event) => {
   
    event.preventDefault();
    setLoading(true); // Set loading state to true while request is being processed
  
    try {
      if (values.role === 'user') {
      await dispach(customerloginRequest(values.email, values.password)); // Pass phone and password separately
      }
      if (values.role === 'admin') {
        await dispach(adminloginRequest(values.email, values.password)); // Pass phone and password separately
      }
   
    } catch (error) {
      setError('An error occurred while logging in.'); // Handle any errors that occur during login
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const  loggedInCustomer = useSelector(state => state.customerloginuser.user);
  const  loggedInAdmin = useSelector(state => state.adminloginuser.admin);
  useEffect(() => {
    if (loggedInCustomer) {
      // console.log("user is:", loginObject.Login);
      console.log("user is:", loggedInCustomer);
  
      // After dispatching the login request, check if login was successful
      if (loggedInCustomer.loggedIn && loggedInCustomer.token) {
        if (values.role === 'user') {
          navigate('/customerlayout/customerdashboard');
        } else {
          alert('Invalid Role!');
        }
      } else {
        alert('Invalid Credentials!');
      }
    }
  
    if (loggedInAdmin) {
      console.log("admin is:", loggedInAdmin);
  
      if (loggedInAdmin.loggedIn && loggedInAdmin.token) {
        if (values.role === 'admin') {
          navigate('/adminlayout/admindashboard');
        } else {
          alert('Invalid Role!');
        }
      } else {
        alert('Invalid Credentials!');
      }
    }
  }, [loggedInCustomer, loggedInAdmin]);
  

  return (
    <>


      
      <Stack spacing={3}>
      <TextField
          name="role"
          label="Role"
          value={values.role}
          onChange={handleInput}
          select
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="user">User</MenuItem>
        </TextField>
        <TextField
          name="email"
          label="Email"
          value={values.email}
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
        <Link variant="subtitle2" underline="hover" sx={{ color: "#e53935" }}>
          Forgot password?
        </Link>
      </Stack>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      <LoadingButton
        fullWidth
        size="large"
        variant="contained"
        onClick={handleSubmit}
        loading={loading}
        sx={{
          backgroundColor: "#e53935",
          '&:hover': {
            backgroundColor: "#e53935",
          }
        }}
      >
        Login
      </LoadingButton>
    </>
  );
}
