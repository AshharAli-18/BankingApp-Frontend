import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Stack, IconButton, InputAdornment, TextField, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../components/iconify';
import { customerloginRequest, adminloginRequest } from '../redux/actions';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [values, setValues] = useState({
    email: '',
    password: '',
    role: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let valid = true;
    let tempEmailError = '';

    // Email validation
    if (values.email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(values.email)) {
        tempEmailError = 'Invalid email address';
        valid = false;
      }
    } else {
      tempEmailError = 'Email is required';
      valid = false;
    }

    setEmailError(tempEmailError);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    

    if (validateForm()) {
      try {
        if (values.role === 'user') {
          await dispatch(customerloginRequest(values.email, values.password));
        } else if (values.role === 'admin') {
          await dispatch(adminloginRequest(values.email, values.password));
        }
      } catch (error) {
        setError('An error occurred while logging in.');
      } 
    }
  };

  const loggedInCustomer = useSelector(state => state.customerloginuser.user);
  const loggedInAdmin = useSelector(state => state.adminloginuser.admin);

  useEffect(() => {
    if (loggedInCustomer && loggedInCustomer.loggedIn && loggedInCustomer.token) {
      if (values.role === 'user') {
        navigate('/customerlayout/customerdashboard');
      } else {
        alert('Invalid Credentials!');
      }
    }

    if (loggedInAdmin && loggedInAdmin.loggedIn && loggedInAdmin.token) {
      if (values.role === 'admin') {
        navigate('/adminlayout/admindashboard');
      } else {
        alert('Invalid Credentials!');
      }
    }
  }, [loggedInCustomer, loggedInAdmin, values.role, navigate]);

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
          label={emailError ? emailError : "Email"}
          value={values.email}
          onChange={handleInput}
          error={Boolean(emailError)}
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
