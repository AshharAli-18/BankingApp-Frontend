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
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { toast } from 'react-toastify';
import Iconify from '../components/iconify';
import { useSelector } from 'react-redux';


export default function CustomersManagement() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  const  loggedInAdmin = useSelector(state => state.adminloginuser.admin);
  const token=loggedInAdmin.token;
  const  customers  = useSelector(state => state.accounts.accounts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/getAllAccounts', {
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
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (accountId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:8080/api/admin/deleteAccount/${accountId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        toast.success("Account deleted successfully!");
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while deleting the account.");
      }
    }
  };
  

  const handleEdit = async (accountId) => {
    navigate(`/adminlayout/editaccount/${accountId}`);
  };

  const handleAddCustomerClick = () => {
    navigate(`/adminlayout/AddCustomer`);
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
          <strong>Customers</strong>
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

            <AddBoxIcon
              sx={{
                color: '#e53935',
                fontSize: '24px',
                width: '55px',
                height: '55px',
                marginLeft: 1,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.5)',
                  cursor: 'pointer',
                },
              }}
              onClick={handleAddCustomerClick}
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
                      <strong>Account Id{' '}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Balance{' '}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Acc. Type{' '}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Phone{' '}</strong>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <strong>Edit</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Delete</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Detail</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {records.map((row, index) => {
                  const { userId, user,  accountId, balance, accountType } = row;

                  const handleDeleteClick = () => {
                    handleDelete(accountId);
                  };

                  const handleEditClick = () => {
                    handleEdit(accountId);
                  };

                  const handleDetailClick = () => {
                    // handle detail click
                  };

                  return (
                    <TableRow hover key={index} tabIndex={-1} selected={selected.indexOf(index) !== -1}>
                      <TableCell align="left">{userId}</TableCell>

                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {user?.name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell align="left">{user?.email}</TableCell>

                      <TableCell align="left">{accountId}</TableCell>

                      <TableCell align="left">{balance}</TableCell>

                      <TableCell align="left">{accountType}</TableCell>

                      <TableCell align="left">{user?.phoneNumber}</TableCell>

                      

                      <TableCell align="right">
                        <IconButton size="large" color="primary" onClick={handleEditClick}>
                          <Iconify icon={'eva:edit-2-fill'} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="large" color="error" onClick={handleDeleteClick}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="large" color="info" onClick={handleDetailClick}>
                          <ArrowCircleRightIcon />
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
