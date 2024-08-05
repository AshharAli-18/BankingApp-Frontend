
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/dashboard/dashboard'; // Adjusted import path
import LoginPage from './pages/LoginPage';
import AdminDashboardLayout from './adminlayouts/dashboard/DashboardLayout';
import CustomerDashboardLayout from './customerlayouts/dashboard/DashboardLayout';
import AdminDashboard from './pages/AdminDashboard'
import CustomersManagement from './pages/CustomerManagement';
import AddCustomer from './pages/AddCustomer';
import TransactionsManagement from './pages/TransactionsManagement';
import FundsTransfer from './pages/FundsTransfer';
import ScrollToTop from './components/scroll-to-top';
import ThreeDPhone from './pages/MobileBanking';
import CustomerDashboard from './pages/CustomerDashboard';
import AccountStatement from './pages/AccountStatement';
import EditAccount from './pages/EditAccount';
import NotFound from './pages/Notfound';
import TransactionsDetail from './pages/TransactionDetail';
import Registration from './pages/Registration';
import NewRequests from './pages/NewRequests.js';
import RecentyDeletedAccounts from './pages/RecentlyDeletedAccounts.js';

const theme = createTheme({
  palette: {
    black: {
      main: '#212121',
    },
    white: {
      main: '#ffffff',
    },
    red: {
      main: '#e53935',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Registration" element={<Registration/>} />
          <Route path="/phone" element={<ThreeDPhone />} />
          <Route path="adminlayout/*" element={<AdminDashboardLayout />}>
            <Route path="admindashboard" element={<AdminDashboard />} />
            <Route path="customersmanagement" element={<CustomersManagement />} />
            <Route path="AddCustomer" element={<AddCustomer />} />
            <Route path="transactionsmanagement" element={<TransactionsManagement />} />
            <Route path="transactiondetail/:transactionId" element={<TransactionsDetail />} />
            <Route path="editaccount/:accountId" element={<EditAccount />} />
            <Route path="newrequests" element={<NewRequests />} />
            <Route path="recentlydeletedaccounts" element={<RecentyDeletedAccounts/>} />
          </Route>
          <Route path="customerlayout/*" element={<CustomerDashboardLayout />}>
            <Route path="customerdashboard" element={<CustomerDashboard />} />
            <Route path="fundstransfer" element={<FundsTransfer />} />
            <Route path="accountstatement" element={<AccountStatement />} />
            
          </Route>
          <Route path="*" element={<NotFound />} /> {/* Route for page not found */}
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
