import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Grid, Container, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
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

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
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

      <Container maxWidth="xl" >
      <Typography variant="h5" sx={{ mb: 5 }}>
         <strong>Welcome <span style={{ color: 'grey' }}>{loginObject}</span> to the Admin Dashboard</strong> 
        </Typography>

        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
      
    {orders && orders.length > 0 && (
      <AppWidgetSummary sx={{
        backgroundColor: "#f4f0ec"
      }} 
        title="Total Customers"
        total={orders.reduce((sum, order) => sum + parseFloat(order.grandtotal), 0)}
        color="error"
        icon={'mdi:account'}
      />
    )}
  
</Grid>

          <Grid item xs={12} sm={6} md={4} >
            <AppWidgetSummary title="New Customers" total={customers.length} color="error" icon={'mdi:chart-areaspline'} sx={{
            backgroundColor: "#f4f0ec"
          }} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Total Transactions" total={products.length} color="error" icon={'mdi-stackoverflow'} sx={{
            backgroundColor: "#f4f0ec"
          }}  />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits sx={{
            backgroundColor: "#f4f0ec"
          }}
              title="Revenue Status"
              subheader="Monthly Progress"
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
            <AppCurrentVisits
            sx={{
              backgroundColor: "#f4f0ec"
            }}
              title="Current Visits"
              chartData={[
                { label: 'Punjab', value: 4344 },
                { label: 'Sindh', value: 5435 },
                { label: 'Balochistan', value: 1443 },
                { label: 'KPK', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
             sx={{
              backgroundColor: "#f4f0ec"
            }}
              title="Notifications"
              list={[
                { id: 1, title: 'Order Received', description: 'New order has been received.', image: '/assets/images/covers/cover_1.jpg', postedAt: '2023-01-01' },
                { id: 2, title: 'Product Shipped', description: 'Product has been shipped.', image: '/assets/images/covers/cover_2.jpg', postedAt: '2023-01-02' },
                { id: 3, title: 'Payment Processed', description: 'Payment has been processed.', image: '/assets/images/covers/cover_3.jpg', postedAt: '2023-01-03' },
                { id: 4, title: 'Customer Review', description: 'New customer review added.', image: '/assets/images/covers/cover_4.jpg', postedAt: '2023-01-04' },
                { id: 5, title: 'Stock Replenished', description: 'Stock has been replenished.', image: '/assets/images/covers/cover_5.jpg', postedAt: '2023-01-05' },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
             sx={{
              backgroundColor: "#f4f0ec"
            }}
              title="Customers  Timeline"
              list={orders.slice(-5).map(order => ({
                id: order.fname + '-' + order.orderdate,
                title: `${order.fname} - Rs.${order.grandtotal}`,
                type: order.status,
                time: order.orderdate,
              }))}
            />
          </Grid>

         
        </Grid>
      </Container>
    </>
  );
}
