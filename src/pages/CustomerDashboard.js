import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Grid, Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function CustomerDashboard() {
  const theme = useTheme();
  const [chartLabels, setChartLabels] = useState([]);
  const [chartData, setChartData] = useState([]);
  const loginObject = "John Doe"; // Dummy user data
  const products = [
    { name: 'iPhone', category: 'mobile', price: 10000, color: 'red' },
    { name: 'Samsung Galaxy', category: 'mobile', price: 20000, color: 'blue' },
    { name: 'MacBook Pro', category: 'laptop', price: 150000, color: 'silver' },
    { name: 'Dell XPS', category: 'laptop', price: 100000, color: 'black' },
    { name: 'Sony Headphones', category: 'accessory', price: 5000, color: 'black' },
  ]; // Dummy products data
  const customers = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
    { name: 'David' },
    { name: 'Eve' },
  ]; // Dummy customers data
  const orders = [
    { orderdate: '2023-01-15', grandtotal: 1000, fname: 'Alice', status: 'completed' },
    { orderdate: '2023-02-10', grandtotal: 1500, fname: 'Bob', status: 'pending' },
    { orderdate: '2023-03-05', grandtotal: 2000, fname: 'Charlie', status: 'completed' },
    { orderdate: '2023-04-20', grandtotal: 2500, fname: 'David', status: 'completed' },
    { orderdate: '2023-05-15', grandtotal: 3000, fname: 'Eve', status: 'pending' },
  ]; // Dummy orders data
  const loggedInCustomer = useSelector((state) => state.customerloginuser.user);
  const userId = loggedInCustomer.userId;
  const token = loggedInCustomer.token;
  const [data, setData] = useState([]);
  
  useEffect(() => {
    console.log("Logged In user is:", loggedInCustomer);
    console.log("Logged In userId is:", userId);

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/user/${userId}/account`, { // Corrected spelling here
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        console.log("response is :", response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        setData(result);
        console.log("result is:", result); // Log result after setting state
    
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };
    
    fetchData();
  }, [token, userId, loggedInCustomer]);

  useEffect(() => {
    if (data) {
      console.log("data is:", data); // Log data when it changes
    }
  }, [data]);
  
  useEffect(() => {
    if (!orders.length) return;

    // Group orders by month and calculate total revenue for each month
    const revenueByMonth = orders.reduce((acc, order) => {
      const month = moment(order.orderdate).format('MM/YYYY');
      const totalRevenue = acc[month] ? acc[month] + order.grandtotal : order.grandtotal;
      return { ...acc, [month]: totalRevenue };
    }, {});

    // Extract chart labels (months) and data (revenues)
    const chartDataEntries = Object.entries(revenueByMonth);
    const sortedChartDataEntries = chartDataEntries.sort((a, b) => {
      return moment(a[0], 'MM/YYYY').valueOf() - moment(b[0], 'MM/YYYY').valueOf();
    });

    const chartLabelsdynamic = sortedChartDataEntries.map(entry => moment(entry[0], 'MM/YYYY').format('MM/DD/YYYY'));
    const chartDatadynamic = sortedChartDataEntries.map(entry => entry[1]);

    // Set chart labels and data
    setChartLabels(chartLabelsdynamic);
    setChartData(chartDatadynamic);
  }, [orders]);

  return (
    <>
      {/* <Helmet>
        <title> Admin Dashboard </title>
      </Helmet> */}

      <Container maxWidth="xl"  data-testid="customer-dashboard-component">
      <Typography variant="h5" sx={{ mb: 5 }}>
          <strong>Welcome <span style={{ color: 'grey' }}>{data.user?.name}</span> to the Customer Dashboard</strong>
        </Typography>

        <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} >
    <Box sx={{ borderRadius: 2, p: 2 , backgroundColor:"#f4f0ec"}}>
        <Grid container>
        <Grid item xs={8}>
            <Typography variant="h6" component="div" sx={{color: '#555555'}}>
            {data.user?.name}
            </Typography>
            <Typography variant="body1" component="div"  sx={{color: '#555555'}}>
            {data.accountType}
            </Typography>
            <Typography variant="body1" component="div"  sx={{color: '#555555'}}>
            {data.accountNumber}
            </Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Box sx={{
                backgroundColor: '#e53935',
                color: '#FFFFFF',
                borderRadius: '10px'

            }}>
                <Typography variant="h6" component="div" sx={{
                    pt: 2,
                    pb: 2,
                    pl:4,
                    pr:4,
                    fontSize: '1.6rem'
                }}>
            {data.balance}{' '} PKR 
            </Typography>
            </Box>
            
        </Grid>
        </Grid>
    </Box>
    </Grid>

          <Grid item xs={12} md={6} lg={8}>
      
            <AppWebsiteVisits  sx={{  borderRadius: 2, p: 2, backgroundColor:"#f4f0ec" }}
              title="Account Balance Status"
              subheader="Monthly Balance  "
              chartLabels={chartLabels}
              chartData={[
                {
                  type: 'area',
                  fill: 'gradient',
                  data: chartData,
                },
              ]}
            />
            
          </Grid>

        
<Grid item xs={12} md={6} lg={4}>
  <AppOrderTimeline  
    title="Transaction History"
    list={orders.slice(-5).map(order => ({
      id: order.fname + '-' + order.orderdate,
      title: `${order.fname} - Rs.${order.grandtotal}`,
      type: order.status,
      time: order.orderdate,
    }))}
    sx={{
      backgroundColor:"#f4f0ec"
    }}
  />
</Grid>


          <Grid item xs={12} md={12} lg={12}>
            <AppNewsUpdate
              title="Notifications"
              list={[
                { id: 1, title: 'Funds Transferred', description: 'Funds Transferred successfully.', image: '/components/covers/cover_1.jpg', postedAt: '2023-01-01' },
                { id: 2, title: 'Funds Transferred', description: 'Funds Transferred successfully.', image: '/assets/images/covers/cover_2.jpg', postedAt: '2023-01-02' },
                { id: 3, title: 'Limit Reached', description: 'Daily transfer limit is reached.', image: '/assets/images/covers/cover_3.jpg', postedAt: '2023-01-03' },
                { id: 4, title: 'Funds Recieved', description: 'Funds Recieved successfully.', image: '/assets/images/covers/cover_4.jpg', postedAt: '2023-01-04' },
                { id: 5, title: 'Funds Transferred', description: 'Funds Transferred successfully.', image: '/assets/images/covers/cover_5.jpg', postedAt: '2023-01-05' },
              ]}
              sx={{
               backgroundColor:"#f4f0ec"
              }}
            />
          </Grid>
 
          
 {/*
          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks title="Todo List" />
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
