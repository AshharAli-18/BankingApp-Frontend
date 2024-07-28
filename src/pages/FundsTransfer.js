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
import LinearProgress from '@mui/material/LinearProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
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

const accTypes = ['Account Number'];
const purposes = ['Other', 'Educational payments', 'loan'];

function FundsTransfer() {
  const classes = useStyle();
  const [formData, setFormData] = useState({
    transferType: '',
    accountType: '',
    accountnumber: '',
    amount: '',
    purpose: '',
  });

  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [effectProgress, setEffectProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loggedInCustomer = useSelector((state) => state.customerloginuser.user);
  const userId = loggedInCustomer.userId;
  const token = loggedInCustomer.token;

  const API_BASE_URL = 'http://localhost:8080/api';

  const fetchAccountId = async (userId, token) => {
    console.log("token is:", token);
    console.log("user id is:", userId);
    try {
      const response = await fetch(`${API_BASE_URL}/getAccoutByUserId/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch account ID');
      const data = await response.json();
      return data.accountId; // Adjust this based on your API response
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };

  const performTransaction = async (requestBody, token) => {
    console.log("perform transaction called!");
    console.log("Request body is:", requestBody);
    try {
      const response = await fetch(`${API_BASE_URL}/transferMoney`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("response transfer is:", response);
      if (response.status === 200) {
        toast.success('Funds Transferred successfully');
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(`Transfer failed: ${errorData.message}`);
      }
    } catch (error) {
      toast.error('Transfer failed: Network error');
    }
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    const accountId = await fetchAccountId(userId, token);
    
    if (accountId) {
      const requestBody = {
        fromAccountId: accountId,
        toAccountNumber: formData.accountnumber,
        amount: parseFloat(formData.amount),
      };
    console.log("request body is:", requestBody);
    performTransaction(requestBody, token);
    }
    
    
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(+1);
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px',
          marginLeft: '90px',
          marginRight: '90px',
        }}
      >
        <ArrowBackIosIcon onClick={goBack} />
        <h3 style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '24px' }}>Transfer Funds</h3>
        <ArrowForwardIosIcon onClick={goForward} />
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <FormGroup className={classes.formStyle}>
            <FormControl className={classes.selectStyle}>
              <TextField
                select
                label="Transfer Type"
                name="transferType"
                value={formData.transferType}
                onChange={handleChange}
                helperText="Please select the beneficiary"
              >
                <MenuItem value="Within Metro Bank">Within Metro Bank</MenuItem>
              </TextField>
            </FormControl>

            <FormControl className={classes.selectStyle}>
              <TextField
                select
                label="Account Type"
                name="accountType"
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
                  label="Account Number"
                  variant="outlined"
                  name="accountnumber"
                  value={formData.accountnumber}
                  onChange={handleChange}
                  required
                />
              </FormControl>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            </div>

            <FormControl className={classes.selectStyle}>
              <TextField
                select
                label="Purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                helperText="Please select the purpose of payment"
              >
                {purposes.map((purpose) => (
                  <MenuItem key={purpose} value={purpose}>
                    {purpose}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                backgroundColor: '#e53935',
                '&:hover': {
                  backgroundColor: '#e53935',
                },
              }}
            >
              Transfer
            </Button>
          </FormGroup>
        </form>
      </div>
    </>
  );
}

export default FundsTransfer;