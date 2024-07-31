    import { useState, useEffect } from 'react';
    import { useNavigate, useParams} from 'react-router-dom';
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
    import { loadTransactionsByTransferRequest } from '../redux/actions';
    import TrendingUpIcon from '@mui/icons-material/TrendingUp';
    import TrendingDownIcon from '@mui/icons-material/TrendingDown';





    export default function TransactionsDetail() {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const  loggedInAdmin = useSelector(state => state.adminloginuser.admin);
    const token=loggedInAdmin.token;
    const { transactionId } = useParams();

    useEffect(() => {
        console.log("Logged In Admin is:", loggedInAdmin);
        dispatch(loadTransactionsByTransferRequest(token, transactionId));
    }, [dispatch, token, transactionId]); // Add dependencies here if necessary
    const  transactions  = useSelector(state => state.transactionsbytransferid.transfers);


    useEffect(() => {
    setData(transactions);
    console.log("transfers are:", transactions);

    }, [transactions, transactionId]);
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
            <strong>Transaction Details</strong>
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
                        <strong>Transaction Id{' '}</strong>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong>Account Id{' '}</strong>
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
                        <strong>Credit/Debit{' '}</strong>
                        </div>
                    </TableCell>
                
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map((row, index) => {
                    const { transactionId, AccountId, amount, date, creditDebit} = row;

                    const handleDeleteClick = () => {
                        // handle delete click
                    };

                    const handleEditClick = () => {
                        // handle edit click
                    };

                

                    return (
                        <TableRow hover key={index} tabIndex={-1} selected={selected.indexOf(index) !== -1}>
                        <TableCell align="left">{transactionId}</TableCell>

                        <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                                {AccountId}
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
            </Card>
        </Container>
        </>
    );
    }
