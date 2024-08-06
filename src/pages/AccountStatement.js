import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import {
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';



export default function AccountStatement() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const API_BASE_URL = 'http://localhost:8080/api';

  const  loggedInCustomer = useSelector(state => state.customerloginuser.user);
const userId = loggedInCustomer.userId;
const token = loggedInCustomer.token;

const fetchAccountId = async (userId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch account ID');
      const data = await response.json();
      return data.accountId; 
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };
  
  const fetchTransactions = async (accountId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/getTransactionByAccountId/${accountId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data = await response.json();
     
      return data; 
    } catch (error) {
      toast.error(error.message);
      return [];
    }
  };
  



  useEffect(() => {
    console.log("loggedInCustomer id is:", userId);
    
    const fetchData = async () => {
      const accountId = await fetchAccountId(userId, token);
  
      if (accountId) {
        const transactions = await fetchTransactions(accountId, token);
        
        setData(transactions);
        console.log("transactions:", transactions);
      }
    };
    
    fetchData();
  }, [userId, token]);
  
  useEffect(() => {
    console.log("data", data);
  }, [data]);

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
          <strong>Account Statement</strong>
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
              label="Search from account statements here..."
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
                      <strong>Account To{' '}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Amount{' '}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Date{' '}</strong>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'right' }}>
                      <strong>CR/DB</strong>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {records.map((row, index) => {
                  const { transactionId, toAccountNumber, amount, date, creditDebit } = row;
                  return (
                    <TableRow hover key={index} tabIndex={-1} selected={selected.indexOf(index) !== -1}>
                      <TableCell align="left">{transactionId}</TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                            {toAccountNumber}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{amount}</TableCell>
                      <TableCell align="left">{date}</TableCell>
                      <TableCell align="left">
      {creditDebit === 'CR' ? <TrendingDownIcon color='success'/> : <TrendingUpIcon color='error'/>}
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
