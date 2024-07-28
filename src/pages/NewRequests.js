import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TextField,
  InputAdornment,
  TableHead,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { toast } from 'react-toastify';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { loadAccountsRequest } from '../redux/actions';
import { deleteAccountRequest } from '../redux/actions';
import { useSelector } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';


export default function CustomersManagement() {
  const [data, setData] = useState([]);
  const [signUpData, setSignUpData] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const  loggedInAdmin = useSelector(state => state.adminloginuser.admin);
  
  const token=loggedInAdmin.token;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/getAllRequests', {
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
        setData(result); // Adjust based on your API response structure
        console.log("Data is:", data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, [token]);

  const handleAccept = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getRequest/${id}`, {
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
      setSignUpData(result);
      console.log(result);
  
      try {
        const createAccountResponse = await axios.post(
          'http://localhost:8080/api/admin/createAccount',
          result,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
  
        if (createAccountResponse.status === 200) {
          handleRequestAcceptDelete(id);
          toast.success('Request accepted successfully!');
          
        } else {
          toast.error('Failed to accept request');
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
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while fetching the account.");
    }
  };
  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/api/deleteRequest/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        toast.success("Record deleted successfully!");
        // Optionally, refresh the data here
        // setData(data.filter(item => item.accountId !== accountId));
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while deleting the account.");
      }
    }
  };

  const handleRequestAcceptDelete = async (id) => {
  
      try {
        const response = await fetch(`http://localhost:8080/api/deleteRequest/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while deleting the account.");
      }
    
  };


  
  const goBackNav = () => {
    navigate(-1);
  };

  const goForwardNav = () => {
    navigate(+1);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginTop: '0px', marginLeft: '60px', marginRight: '60px' }}>
        <ArrowBackIosIcon onClick={goBackNav} />
        <Typography variant="h5" gutterBottom>
          <strong>New Customers Requests</strong>
        </Typography>
        <ArrowForwardIosIcon onClick={goForwardNav} />
      </div>

      <Container>
        <Card>
          <Container
            maxWidth="lg"
            sx={{
              mt: 2,
              ml: 0,
              mb: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextField
              id="search"
              type="search"
              label="Search from customers here..."
              sx={{
                flexGrow: 1,
                '& label': { fontSize: '0.8rem' },
                '& input': { height: '18px' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

          
          </Container>

          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#dcdcdc' }}>
                <TableRow>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>ID{' '}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Name{' '}</strong>
                    </div>
                  </TableCell>
                
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Email{' '}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Username{' '}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Phone{' '}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'right' }}>
                      <strong>Acc. Type{' '}</strong>
                    </div>
                  </TableCell>
                  
                  <TableCell  >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong>Accept</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <strong>Delete</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, index) => {
                  const { id, username, name, email, phoneNumber, accountType } = row;


                  const handleDeleteClick = () => {
                    handleDelete(id);
                  };

                  const handleAcceptClick = async () => {
                    handleAccept(id);
                   
                  };
                  return (
                    <TableRow hover key={index} tabIndex={-1} selected={selected.indexOf(index) !== -1}>
                      <TableCell align="left">{id}</TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left">{email}</TableCell>

                      <TableCell align="left">{username}</TableCell>

                      <TableCell align="left">{phoneNumber}</TableCell>

                      <TableCell align="left">{accountType}</TableCell>

                      

                      <TableCell align="left">
                        <IconButton size="large" color="success" onClick={handleAcceptClick}>
                          
                          <CheckCircleIcon/>
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton size="large" color="error" >
                          <Iconify icon={'eva:trash-2-outline'} onClick={handleDeleteClick} />
                        </IconButton>
                      </TableCell>
                     
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>
    </>
  );
}
