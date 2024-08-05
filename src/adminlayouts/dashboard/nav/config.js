import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';
import InsightsIcon from '@mui/icons-material/Insights';
import SvgColor from '../../../components/svg-color';
import NewRequests from '../../../pages/NewRequests.js';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/adminlayout/admindashboard',
    icon: <InsightsIcon/>,
  },
  {
    title: 'Customers Management',
    path: '/adminlayout/customersmanagement',
    icon: <PersonIcon />,
  },
  {
    title: 'Transactions Management',
    path: '/adminlayout/transactionsmanagement',
    icon: <PaidIcon />,
  },

  {
    title: 'New Requests',
    path: '/adminlayout/newrequests',
    icon: <GroupIcon/>,
  },
  {
    title: 'Recently Deleted Accounts',
    path: '/adminlayout/recentlydeletedaccounts',
    icon: <PersonRemoveAlt1Icon/>,
  },
  
  {
    title: 'Feedbacks',
    path: '/error/CustomerReviews',
    icon: <ReviewsIcon/>,
    
  },
  

 
];

export default navConfig;
