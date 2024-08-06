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
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { toast } from 'react-toastify';
import Iconify from '../components/iconify';
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
          'http://localhost:8080/api/account',
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
  const records = data.slice(firstIndex, lastIndex);

  const generatePageNumbers = () => {
    const totalPages = Math.ceil(data.length / recordsPerPage);
    const currentPageIndex = currentPage - 1;
    const displayedPages = [];

    if (totalPages <= 8) {
      for (let i = 1; i <= totalPages; i += 1) {
        displayedPages.push(i);
      }
    } else if (currentPage <= 4) {
      displayedPages.push(1, 2, 3, 4, 5);
      displayedPages.push('...');
      displayedPages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      displayedPages.push(1);
      displayedPages.push('...');
      for (let i = totalPages - 4; i <= totalPages; i += 1) {
        displayedPages.push(i);
      }
    } else {
      displayedPages.push(1);
      displayedPages.push('...');
      for (let i = currentPageIndex - 1; i <= currentPageIndex + 1; i += 1) {
        displayedPages.push(i + 1);
      }
      displayedPages.push('...');
      displayedPages.push(totalPages);
    }

    return displayedPages;
  };


  const numbers = generatePageNumbers();



  const postPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

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
              label="Search from customer requests here..."
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
                {records.map((row, index) => {
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
          <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '16px', marginBottom: '8px' }}>
  <ul style={{ display: 'flex', alignItems: 'center', gap: '16px', listStyleType: 'none' }}>
    <li>
      
        <RemoveIcon   style={{ color: currentPage === 1 ? 'gray' : '#4B5563' }}
        onClick={prePage}
        disabled={currentPage === 1} // Disable if on first page
         />
      
    </li>
    {numbers.map((n, i) => (
      <li key={i}>
        {typeof n === 'number' ? ( // Check if n is a number
          <button
            style={{
              padding: '6px 16px',
              borderRadius: '4px',
              borderColor: 'transparent',
              backgroundColor: currentPage === n ? '#e53935' : 'transparent',
              color: currentPage === n ? 'white' : '#e53935',
            }}
            onClick={() => changeCurrentPage(n)}
            onMouseEnter={e => {
              if (currentPage !== n) e.currentTarget.style.backgroundColor = '#ffcccb';
            }}
            onMouseLeave={e => {
              if (currentPage !== n) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            {n}
          </button>
        ) : (
          <span style={{ padding: '8px 16px' }}>...</span> // Render dots
        )}
      </li>
    ))}
    <li>
      
        <AddIcon
         style={{ color: currentPage === Math.ceil(data.length / recordsPerPage) ? 'gray' : '#4B5563' }}
         onClick={postPage}
         disabled={currentPage === Math.ceil(data.length / recordsPerPage)} // Disable if on last page+ 
        />
      
    </li>
  </ul>
</nav>
        </Card>
      </Container>
    </>
  );
}
