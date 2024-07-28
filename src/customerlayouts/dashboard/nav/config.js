import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import GroupIcon from '@mui/icons-material/Group';
import PaidIcon from '@mui/icons-material/Paid';
import SettingsIcon from '@mui/icons-material/Settings';
import InsightsIcon from '@mui/icons-material/Insights';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HistoryIcon from '@mui/icons-material/History';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/customerlayout/customerdashboard',
    icon: <InsightsIcon/>,
  },
  {
    title: 'Funds Transfer',
    path: '/customerlayout/fundstransfer',
    icon: <PaidIcon />,
  },
  {
    title: 'Account Statement',
    path: '/customerlayout/accountstatement',
    icon: <HistoryIcon />,
  },
  {
    title: 'Make Donations',
    path: '/Donations',
    icon: <VolunteerActivismIcon/>,
  },
  {
    title: 'Bill Payments',
    path: '/Bill',
    icon: <CreditScoreIcon />,
  },
  {
    title: 'Cards Management',
    path: '/Cards',
    icon: <CreditCardIcon />,
  },
  {
    title: 'Cheques Management',
    path: '/Cheques',
    icon: <ReceiptLongIcon  />,
  },
  {
    title: 'Purchase Tickets',
    path: '/Tickets',
    icon: <ConfirmationNumberIcon/>,
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <SettingsIcon />,
  },



  // {
  //   title: 'New Requests',
  //   path: '/error/newrequests',
  //   icon: <GroupIcon />,
  // },
  
  // {
  //   title: 'Feedbacks',
  //   path: '/error/CustomerReviews',
  //   icon: <ReviewsIcon/>,
    
  // },
  

 
];

export default navConfig;
