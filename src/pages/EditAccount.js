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
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

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
  selectStyle: {
    marginTop: 12,
  },
});

const accTypes = ['Saving', 'Current'];

function EditAccount() {
  const classes = useStyle();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    accountType: '',
    address: '',
    cnic: '',
    balance: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    cnic: '',
    phone: '',
    balance: '',
  });

  const navigate = useNavigate();
  const { accountId } = useParams();
  const [account, setAccount] = useState({});
  const loggedInAdmin = useSelector(state => state.adminloginuser.admin);
  const token = loggedInAdmin.token;

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/account/${accountId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setAccount(result);
        setFormData({
          name: result.user.name || '',
          username: result.user.username || '',
          email: result.user.email || '',
          phone: result.user.phoneNumber || '',
          accountType: result.accountType || '',
          address: result.user.address || '',
          cnic: result.user.cnic || '',
          balance: result.balance || '',
        });

      } catch (error) {
        console.error('Error fetching account:', error);
        toast.error('Failed to fetch account');
      }
    };

    fetchAccount();
  }, [accountId, token]);

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
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailPattern.test(formData.email)) {
    //   tempErrors.email = 'Invalid Email Address';
    //   valid = false;
    // } else {
    //   tempErrors.email = '';
    // }

    // CNIC validation
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicPattern.test(formData.cnic)) {
      tempErrors.cnic = 'Invalid CNIC';
      valid = false;
    } else {
      tempErrors.cnic = '';
    }

    // Phone validation
    if (/[a-zA-Z]/.test(formData.phone)) {
      tempErrors.phone = 'Phone number should not contain alphabets';
      valid = false;
    } else {
      tempErrors.phone = '';
    }

    // Balance validation
    if (isNaN(formData.balance) || formData.balance < 0) {
      tempErrors.balance = 'Balance must be a non-negative number';
      valid = false;
    } else {
      tempErrors.balance = '';
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`http://localhost:8080/api/account/${accountId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          toast.success('Account updated successfully');
          navigate(-1);
          return;
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          toast.success('Account updated successfully');
          navigate(-1);
        } else {
          const text = await response.text();
          console.error('Unexpected response format:', text);
          toast.error('Failed to update account');
        }
      } catch (error) {
        console.error('Error updating account:', error);
        toast.error('Failed to update account');
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
        <h3 style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '24px' }}>Edit Account</h3>
        <ArrowForwardIosIcon onClick={goforward} />
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <FormGroup className={classes.formStyle}>
            <div className={classes.fieldStyle1}>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="name"
                  label={errors.name ? errors.name : "Name"}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  error={Boolean(errors.name)}
                />
              </FormControl>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </div>

            <div className={classes.fieldStyle1}>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="email"
                  // label={errors.email ? errors.email : "Email"}
                  label="Email"
                  value={formData.email}
                  type="email"
                  onChange={handleChange}
                  required
                  // error={Boolean(errors.email)}
                />
              </FormControl>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="phone"
                  label={errors.phone ? errors.phone : "Phone"}
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  error={Boolean(errors.phone)}
                />
              </FormControl>
            </div>

            <FormControl className={classes.selectStyle}>
              <TextField
                select
                name="accountType"
                label="Account Type"
                value={formData.accountType}
                onChange={handleChange}
                helperText="Please select the type of account"
              >
                {accTypes.map((accountType) => (
                  <MenuItem key={accountType} value={accountType}>
                    {accountType}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <div className={classes.fieldStyle1}>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="cnic"
                  label={errors.cnic ? errors.cnic : "CNIC"}
                  value={formData.cnic}
                  onChange={handleChange}
                  required
                  error={Boolean(errors.cnic)}
                />
              </FormControl>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="balance"
                  label={errors.balance ? errors.balance : "Balance"}
                  type="number"
                  value={formData.balance}
                  onChange={handleChange}
                  required
                  error={Boolean(errors.balance)}
                />
              </FormControl>
            </div>

            <FormControl className={classes.fieldStyle}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </FormControl>
            
            <Button type="submit" variant="contained" sx={{
              mt: 3,
              backgroundColor: "#e53935",
              '&:hover': {
                backgroundColor: "#e53935", 
              }
            }}>
              Save Changes
            </Button>
          </FormGroup>
        </form>
      </div>
    </>
  );
}

export default EditAccount;
