import React, { useState, useEffect } from 'react';
import {
  FormGroup,
  FormControl,
  TextField,
  InputAdornment,
  InputLabel,
  Box,
  Paper,
  Typography,
  IconButton,
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

const accTypes = ['Saving', 'Current'];

function EditAccount() {
  const classes = useStyle();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    accountType: '',
  });

  const navigate = useNavigate();
  const { accountId } = useParams();
  const [account, setAccount] = useState({});
  const loggedInAdmin = useSelector(state => state.adminloginuser.admin);
  const token = loggedInAdmin.token;

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/getAccount/${accountId}`, {
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
        console.log("result is:",result);
        setAccount(result);


        // Update form data immediately after setting account data
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

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`http://localhost:8080/api/admin/updateAccount/${accountId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log("response :", response);
      // Check if the response is empty
      if (response.status === 200) {
        toast.success('Account updated successfully');
        navigate(-1);
        return;
      }
  
      // Check if the response is valid JSON
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const result = await response.json();
        console.log('Account updated successfully:', result);
        toast.success('Account updated successfully');
        navigate(-1);
      } else {
        // Handle non-JSON responses
        const text = await response.text();
        console.error('Unexpected response format:', text);
        toast.error('Failed to update account');
      }
    } catch (error) {
      console.error('Error updating account:', error);
      toast.error('Failed to update account');
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
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </FormControl>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="username"
                  label="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                  label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </FormControl>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </FormControl>
            </div>
            <FormControl className={classes.selectStyle}>
              <TextField
                select
                name="accounttype"
                label="Account Type"
                value={formData.accountType}
                onChange={(e) => setFormData({ ...formData, accountType: e.target.value })}
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
                  label="CNIC"
                  value={formData.cnic}
                  onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                  required
                />
              </FormControl>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="balance"
                  label="Balance"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  required
                />
              </FormControl>
            </div>

            <FormControl className={classes.fieldStyle}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                name="address"
                label="Address"
                multiline
                rows={4}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
