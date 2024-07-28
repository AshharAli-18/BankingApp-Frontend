import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, TextField, InputAdornment } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 70;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor: '#e9eef1', // Set the background color to gray
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 80}px)`,
    marginRight: theme.spacing(5), // Add margin-right to the header
  },
  borderRadius: '0 0 20px 20px', // Round bottom corners
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    // padding: theme.spacing(0, 5),
  },
}));

export default function Header({ onOpenNav }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalID);

  }, []);

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <TextField
  id="outlined-basic"
  variant="outlined"
  value={currentDate.toLocaleDateString(undefined, {
    month: 'short', // Abbreviated month name
    day: '2-digit', // Two-digit day of the month
    year: 'numeric', // Full numeric representation of the year
  })}
  InputProps={{
    readOnly: true,
    startAdornment: (
      <InputAdornment position="start" sx={{ marginRight: 1 }}>
        <CalendarMonthIcon />
      </InputAdornment>
    ),
    sx: {
      height: 40,
      width: 165,
      marginTop: 0,
      typography: {
        fontSize: 16,
      },
      color: 'text.secondary',
      // Remove border styles
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
  }}
  sx={{ marginLeft: -2 }} // Adjust left margin
/>



        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
