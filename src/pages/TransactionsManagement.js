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
    import { loadTransfersRequest } from '../redux/actions';

    const generateDummyData = () => {
        const data = [];
        for (let i = 1; i <= 5; i++) {
        data.push({
            Id: `Transaction${i}`, // Assuming this is the transaction ID
            accountTo: `ACC${i}`, // Example account to transfer to
            accountFrom: `ACC${i + 1}`, // Example account to transfer from
            amount: `$${(i * 50).toFixed(2)}`, // Example amount with 2 decimal places
            date: `2024-07-${i < 10 ? '0' + i : i}`, // Example date
            type: i % 2 === 0 ? 'Deposit' : 'Withdrawal', // Example transaction type
            crdb: i % 2 === 0 ? 'CR' : 'DB', // Example credit or debit
        });
        }
        return data;
    };
    

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
                    {data.map((row, index) => {
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
            </Card>
        </Container>
        </>
    );
    }
