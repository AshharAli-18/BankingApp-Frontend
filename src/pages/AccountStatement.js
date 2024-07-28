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
      const response = await fetch(`${API_BASE_URL}/getAccoutByUserId/${userId}`, {
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <strong>Cr/Db{' '}</strong>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, index) => {
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
                      <TableCell align="left">{creditDebit}</TableCell>
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
