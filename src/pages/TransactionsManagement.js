    import { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { useSelector, useDispatch } from 'react-redux';
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

    import SearchIcon from "@mui/icons-material/Search";
    import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
    import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
    import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
    import AddIcon from '@mui/icons-material/Add';
    import RemoveIcon from '@mui/icons-material/Remove';
    import { toast } from 'react-toastify';
    import Iconify from '../components/iconify';
    import Scrollbar from '../components/scrollbar';
    import { loadTransfersRequest } from '../redux/actions';

    

    export default function TransactionsManagement() {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const  loggedInAdmin = useSelector(state => state.adminloginuser.admin);
    const token=loggedInAdmin.token;
    
  
    const  transfers  = useSelector(state => state.transfers.transfers);
  
    useEffect(() => {
      console.log("Logged In Admin is:", loggedInAdmin);
      dispatch(loadTransfersRequest(token));
     
    }, [dispatch, token]); // Add dependencies here if necessary
    
    
    useEffect(() => {
      setData(transfers);
      console.log("transfers are:", data);
    }, [transfers]);
    const handleDelete = async () => {
        // handle delete functionality
    };

    const handleEdit = async () => {
        // handle edit functionality
    };

    const handleDetail = async (transferId) => {
        navigate(`/adminlayout/transactiondetail/${transferId}`);
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
            <strong>Transactions</strong>
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
                label="Search from transactions here..."
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
                        <strong>Account To (id){' '}</strong>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong>Account From(id){' '}</strong>
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
                        <strong>Detail</strong>
                    </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {records.map((row, index) => {
                    const { transferId, toAccountNumber,  fromAccountId, toAccountId, amount, date, type, crdb} = row;

                    const handleDeleteClick = () => {
                        // handle delete click
                    };

                    const handleEditClick = () => {
                        // handle edit click
                    };

                    const handleDetailClick = () => {
                        handleDetail(transferId)
                    };

                    return (
                        <TableRow hover key={index} tabIndex={-1} selected={selected.indexOf(index) !== -1}>
                        <TableCell align="left">{transferId}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                                {toAccountNumber}
                            </Typography>
                            </Stack>
                        </TableCell>

                        <TableCell align="left">{toAccountId}</TableCell>

                        <TableCell align="left">{fromAccountId}</TableCell>

                        <TableCell align="left">{amount}</TableCell>

                        <TableCell align="left">{date}</TableCell>



                        <TableCell align="center" style={{ verticalAlign: 'middle' }}>
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
