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
import { useDispatch } from 'react-redux';
import useResponsive from '../hooks/useResponsive';
import LoginImage from '../components/images/LoginImage.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

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
    width: '98.5%'
  },
  // fieldWidth: {
  //   width: '100%', // Ensures all fields take the full width of the parent container
  // },
});

const accformat = ['Saving', 'Current'];

function Registration() {
  const classes = useStyle();
  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
  });

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Form data is :", formData);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/customerRequest',
        formData
      );
  
      // Check if response status is OK
      console.log("response status is:", response.status);
      if (response.status === 200) {
        toast.success('Request sent successfully!');
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        // Handle unexpected status codes
        toast.error('Failed to send request');
      }
    } catch (error) {
      // Check if the error has a response and handle it
      if (error.response) {
        const errorMessage = error.response.data.message || 'An error occurred';
        toast.error(errorMessage);
      } else {
        toast.error('Network or server error');
      }
      console.error('Error:', error);
    }
  };
  const handleloginclick = async () => {
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
        <Typography style={{ marginLeft: '360px',marginTop:'120px', fontWeight: 'bold', fontSize: '35px' }}>SignUp Here!</Typography>
          <form onSubmit={handleSubmit}>
            <FormGroup className={classes.formStyle}>
              <div className={classes.fieldStyle1}>
                <FormControl className={classes.fieldStyle}>
                  <TextField
                    className={classes.fieldWidth}
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    name="name"
                    onChange={handleChange}
                    required
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
                    label="Email"
                    variant="outlined"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl className={classes.fieldStyle}>
                  <TextField
                    className={classes.fieldWidth}
                    id="outlined-basic"
                    label="Cnic"
                    variant="outlined"
                    name="cnic"
                    onChange={handleChange}
                    required
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
                  {accformat.map((accformat) => (
                    <MenuItem key={accformat} value={accformat}>
                      {accformat}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              <FormControl className={classes.selectStyle}>
                <TextField
                  className={classes.fieldWidth}
                  label="Password"
                  name="password"
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl className={classes.selectStyle}>
                <TextField
                  className={classes.fieldWidth}
                  label="Phone"
                  name="phoneNumber"
                  onChange={handleChange}
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

                <Typography variant="h5" gutterBottom sx={{
                  ml:12
                }}>
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
