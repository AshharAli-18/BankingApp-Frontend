import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  FormControl,
  TextField,
  Button,
  MenuItem,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const useStyle = makeStyles({
  formStyle: {
    width: '85%',
    margin: 'auto',
    padding: 20,
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.5)',
    marginTop: 40,
  },
  fieldStyle: {
    marginTop: 10,
    flex: 1,
    marginRight: 10,
  },
  fieldStyle1: {
    display: 'flex',
  },
  labestyle: {
    paddingTop: '8px',
  },
  uploadlabestyle: {
    paddingBottom: '20px',
  },
  selectStyle: {
    marginTop: 12,
  },
  uploadinputBox: {
    border: '1px solid #ccc',
    borderRadius: 4,
    paddingTop: '20px',
    width: '100%',
  },
  buttonstyle: {
    marginTop: 20,
  },
  inputsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const accformat = ['Saving', 'Current'];

function AddCustomer() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInAdmin = useSelector(state => state.adminloginuser.admin);
  const token = loggedInAdmin.token;

  useEffect(() => {
    console.log("Logged In Admin is:", loggedInAdmin);
  }, [loggedInAdmin]);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    cnic: '',
    password: '',
    phoneNumber: '',
    address: '',
    accountType: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    cnic: '',
    password: '',
    phoneNumber: ''
  });

  const handleChange = (event) => {
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
    } else {
      tempErrors.phoneNumber = '';
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {

      console.log("FormData is :", formData);
      try {
        const response = await axios.post(
          'http://localhost:8080/api/account',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("response status is:", response.status);
        if (response.status === 200) {
          toast.success('Account created successfully');
          setTimeout(() => {
            navigate(-1);
          }, 2000);
        } else {
          toast.error('Failed to create account');
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

  const goback = () => {
    navigate(-1);
  };

  const goforward = () => {
    navigate(+1);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginLeft: '90px', marginRight: '90px' }}>
        <ArrowBackIosIcon onClick={goback} />
        <h3 style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '24px' }}>Add New Customer</h3>
        <ArrowForwardIosIcon onClick={goforward} />
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <FormGroup className={classes.formStyle}>
            <div className={classes.fieldStyle1}>
              <FormControl className={classes.fieldStyle}>
                <TextField
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
                  id="outlined-basic"
                  label={errors.cnic ? errors.cnic : "CNIC"}
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
                select
                label="AccountType"
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
                label={errors.password ? errors.password : "Password"}
                name="password"
                type="password"
                onChange={handleChange}
                error={Boolean(errors.password)}
              />
            </FormControl>

            <FormControl className={classes.selectStyle}>
              <TextField
                label={errors.phoneNumber ? errors.phoneNumber : "Phone"}
                name="phoneNumber"
                onChange={handleChange}
                error={Boolean(errors.phoneNumber)}
              />
            </FormControl>

            <FormControl className={classes.fieldStyle}>
              <TextField
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
                }
              }}
            >
              Add Customer
            </Button>
          </FormGroup>
        </form>
      </div>
    </>
  );
}

export default AddCustomer;
