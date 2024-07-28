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
import { useDispatch, useSelector} from 'react-redux';
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
  

  const  loggedInAdmin = useSelector(state => state.adminloginuser.admin);
  
  const token=loggedInAdmin.token;
  
  useEffect(() => {
    console.log("Logged In Admin is:", loggedInAdmin);
   
   
  }, []);
  
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
    try {
      const response = await axios.post(
        'http://localhost:8080/api/admin/createAccount',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      // Check if response status is OK
      console.log("response status is:", response.status);
      if (response.status === 200) {
        toast.success('Account created successfully');
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        // Handle unexpected status codes
        toast.error('Failed to create account');
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
                  label="Name"
                  variant="outlined"
                  name="name"
                 
                  onChange={handleChange}
                  required
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
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={handleChange}
                  required />

              </FormControl>
              <FormControl className={classes.fieldStyle}>
                <TextField
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
                select
                label="AccountType"
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
      
                label="Password"
                name="password"
                onChange={handleChange}

              >
              </TextField>
            </FormControl>

            <FormControl className={classes.selectStyle}>

              <TextField

                label="Phone"
                name="phoneNumber"
                onChange={handleChange}

              >
              </TextField>
              </FormControl>
          

            <FormControl className={classes.fieldStyle}>
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                name="address"
                onChange={handleChange}
                multiline
                rows={4} />
            </FormControl>


        
            <Button type="submit" variant="contained" sx={{
              mt: 3,
              backgroundColor: "#e53935",
              '&:hover': {
                backgroundColor: "#e53935", 
              }
            }}>
              Add Customer
            </Button>
          </FormGroup>
        </form>
      </div>
    </>
  );
}


export default AddCustomer;
