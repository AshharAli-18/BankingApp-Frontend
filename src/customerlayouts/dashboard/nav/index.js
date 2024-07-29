import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { customerlogout } from '../../../redux/actions';
import account from '../../../_mock/account';
import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import AccountPopover from '../header/AccountPopover';
import navConfig from './config';
import newLogo from '../../../components/logo/DashboardLogo.PNG';

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: "#f4f0ec",
}));

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');
  const [dialogOpen, setDialogOpen] = useState(false); // State to manage dialog visibility

  const handleLogout = () => {
    setDialogOpen(true); // Open dialog before logging out
  };

  const handleConfirmLogout = () => {
    dispatch(customerlogout());
    navigate('/login');
    
    setDialogOpen(false); // Close dialog after logging out
  };

  const handleCancelLogout = () => {
    setDialogOpen(false); // Close dialog if user cancels logout
  };

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex', justifyContent: 'center' }}>
        <img src={newLogo} alt="Custom Logo" style={{ width: '200px', height: 'auto' }} />
      </Box>
  
      <NavSection data={navConfig} />
  
      <Box sx={{ flexGrow: 1 }} />
      
      {/* Logout button */}
      <Box sx={{ mt: '130%',px: 2.5, pb: 3 }}>
        <Button variant="contained" fullWidth onClick={handleLogout} sx={{
          backgroundColor: '#e53935',
          '&:hover': {
            backgroundColor: "#e53935", 
        }
        }}>
          Logout
        </Button>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
       
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
      {/* Dialog for logout confirmation */}
      <Dialog open={dialogOpen} onClose={handleCancelLogout}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to logout?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} sx={{
            color:"#e53935"
          }}>
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} sx={{
            color:"#e53935"
          }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
