import React, { useState } from 'react';
import {
  FormGroup,
  FormControl,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Divider,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import useResponsive from '../hooks/useResponsive';
import LoginImage from '../components/images/LoginImage.jpg';

const useStyle = makeStyles({
  formStyle: {
    width: '85%',
    margin: 'auto',
    padding: 20,
    marginTop: 10,
  },
  fieldStyle: {
    marginTop: 10,
    flex: 1,
    marginRight: 10,
  },
  fieldStyle1: {
    display: 'flex',
    marginTop: 10,
  },
  selectStyle: {
    display: 'flex',
    marginTop: 10,
    width: '98.5%',
  },
  fieldWidth: {
    width: '100%',
  },
});

const accformat = ['Saving', 'Current'];

function Registration() {
  const classes = useStyle();
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    cnic: '',
    password: '',
    phoneNumber: '',
    address: '',
    accountType: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    cnic: '',
    password: '',
    phoneNumber: '',
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    let tempErrors = { ...errors };

    // Name validation
    if (/\d/.test(formData.name)) {
      tempErrors.name = 'Invalid Name';
      valid = false;
    } else {
      tempErrors.name = '';
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      tempErrors.email = 'Invalid Email Address';
      valid = false;
    } else {
      tempErrors.email = '';
    }

    // CNIC validation
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicPattern.test(formData.cnic)) {
      tempErrors.cnic = 'Invalid CNIC';
      valid = false;
    } else {
      tempErrors.cnic = '';
    }

    // Password validation
    if (formData.password.length < 8) {
      tempErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    } else {
      tempErrors.password = '';
    }

    // phoneNumber validation
    if (/[a-zA-Z]/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = 'Phone number should not contain alphabets';
      valid = false;
    }else if (formData.phoneNumber.length < 10) {
      tempErrors.phoneNumber = 'Phone number must be at least 10 characters long';
      valid = false;
    } else {
      tempErrors.phoneNumber = '';
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Formdata is:", formData);
      try {
        const response = await axios.post(
          'http://localhost:8080/api/auth/customerRequest',
          formData
        );
  
        console.log("response status is:", response.status);
        if (response.status === 200) {
          toast.success('Request sent successfully!');
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error('Failed to send request');
        }
      } catch (error) {
        if (error.response) {
          const errorMessage = error.response.data.message || 'An error occurred';
          toast.error(errorMessage);
        } else {
          toast.error('Network or server error');
        }
        console.error('Error:', error);
      }
    }
  };

  const handleloginclick = () => {
    navigate("/Login");
  };

  return (
    <>
      <Grid container spacing={2}>
        {mdUp && (
          <Grid item md={6}>
            <img
              src={LoginImage}
              alt="login"
              style={{
                height: '100vh',
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </Grid>
        )}
        <Grid item xs={12} md={6}>
          <Typography style={{ marginLeft: '360px', marginTop: '120px', fontWeight: 'bold', fontSize: '35px' }}>
            SignUp Here!
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup className={classes.formStyle}>
              <div className={classes.fieldStyle1}>
                <FormControl className={classes.fieldStyle}>
                  <TextField
                    className={classes.fieldWidth}
                    id="outlined-basic"
                    label={errors.name ? errors.name : "Name"}
                    variant="outlined"
                    name="name"
                    onChange={handleChange}
                    required
                    error={Boolean(errors.name)}
                  />
                </FormControl>
                <FormControl className={classes.fieldStyle}>
                  <TextField
                    className={classes.fieldWidth}
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    name="username"
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </div>

              <div className={classes.fieldStyle1}>
                <FormControl className={classes.fieldStyle}>
                  <TextField
                    className={classes.fieldWidth}
                    id="outlined-basic"
                    label={errors.email ? errors.email : "Email"}
                    variant="outlined"
                    name="email"
                    onChange={handleChange}
                    required
                    error={Boolean(errors.email)}
                  />
                </FormControl>
                <FormControl className={classes.fieldStyle}>
                  <TextField
                    className={classes.fieldWidth}
                    id="outlined-basic"
                    label={errors.cnic ? errors.cnic : "Cnic"}
                    variant="outlined"
                    name="cnic"
                    onChange={handleChange}
                    required
                    error={Boolean(errors.cnic)}
                  />
                </FormControl>
              </div>

              <FormControl className={classes.selectStyle}>
                <TextField
                  className={classes.fieldWidth}
                  select
                  label="Account Type"
                  name="accountType"
                  onChange={handleChange}
                  helperText="Please select the type of account"
                >
                  {accformat.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <FormControl className={classes.selectStyle}>
                <TextField
                  className={classes.fieldWidth}
                  label={errors.password ? errors.password : "Password"}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  error={Boolean(errors.password)}
                />
              </FormControl>

              <FormControl className={classes.selectStyle}>
                <TextField
                  className={classes.fieldWidth}
                  label={errors.phoneNumber ? errors.phoneNumber : "Phone"}
                  name="phoneNumber"
                  onChange={handleChange}
                  error={Boolean(errors.phoneNumber)}
                />
              </FormControl>

              <FormControl className={classes.fieldStyle}>
                <TextField
                  className={classes.fieldWidth}
                  id="outlined-basic"
                  label="Address"
                  variant="outlined"
                  name="address"
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#e53935",
                  '&:hover': {
                    backgroundColor: "#e53935",
                  },
                }}
              >
                Send Sign Up Request
              </Button>

            </FormGroup>
            <Divider sx={{ my: 1, width: '50%', mx: 'auto' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>

            <Typography variant="h5" gutterBottom sx={{ ml: 12 }}>
              Already have an account?
              <Button
                onClick={handleloginclick}
                variant="contained"
                sx={{
                  mt: 0,
                  ml: 2,
                  backgroundColor: "#e53935",
                  '&:hover': {
                    backgroundColor: "#e53935",
                  },
                }}
              >
                Login
              </Button>
            </Typography>
          </form>
        </Grid>
      </Grid>
    </>
  );
}



export default Registration;
