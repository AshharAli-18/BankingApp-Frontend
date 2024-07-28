
import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SecurityIcon from '@mui/icons-material/Security';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { styled } from '@mui/material/styles';
import Header from './Header';

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flexGrow: 1,
  padding: theme.spacing(2),
  backgroundColor: '#d3d3d3',
  '&:hover': {
    backgroundColor: '#e53935',
    cursor: 'pointer',
    color:'white'
  },
}));

const IconWrapper = styled('div')({
  marginTop: '10px',
  backgroundColor: '#e53935',
  color: 'white',
  borderRadius: '50%',
  padding: '0.8rem',
  width: '2rem',
  height: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',  
});

const FeatureTitle = styled(Typography)({
  fontSize: '1.4rem',
  marginTop: '30px',
  textAlign: 'center',
});

const FeatureSubtitle = styled(Typography)({
  fontSize: '1.1rem',
  marginTop: '30px',
  textAlign: 'center',
});

function Features() {
  const handleItemClick = (itemName) => {
    alert(`${itemName} clicked`);
  };

  return (
    
    <Box sx={{ display: 'flex', justifyContent: 'center', mb:'150px'}}>
      <Grid container spacing={0} justifyContent="center" alignItems="stretch" sx={{ width: '70%' }}>
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <FeatureBox onClick={() => handleItemClick('Item 1')}>
            <IconWrapper>
              <SecurityIcon />
            </IconWrapper>
            <FeatureTitle variant="h5">
              <strong>Secure Transaction</strong>
            </FeatureTitle>
            <FeatureSubtitle>
              Transfer funds globally with ease and security. Our advanced encryption technology ensures your transactions are protected against fraud and unauthorized access.
            </FeatureSubtitle>
          </FeatureBox>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <FeatureBox onClick={() => handleItemClick('Item 2')}>
            <IconWrapper>
              <QueryBuilderIcon />
            </IconWrapper>
            <FeatureTitle variant="h5">
              <strong>Less Time in Loan Approvals</strong>
            </FeatureTitle>
            <FeatureSubtitle>
              Get your loans approved faster than ever. Our streamlined process minimizes paperwork and reduces waiting times, so you can access the funds you need quickly.
            </FeatureSubtitle>
          </FeatureBox>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <FeatureBox onClick={() => handleItemClick('Item 3')}>
            <IconWrapper>
              <EqualizerIcon />
            </IconWrapper>
            <FeatureTitle variant="h5">
              <strong>Lowest Processing Fee</strong>
            </FeatureTitle>
            <FeatureSubtitle>
              Enjoy the lowest processing fees available than other banks in town. We offer competitive rates to help you save money on all of your transactions.
            </FeatureSubtitle>
          </FeatureBox>
        </Grid>

        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <FeatureBox onClick={() => handleItemClick('Item 4')}>
            <IconWrapper>
              <SupportAgentIcon />
            </IconWrapper>
            <FeatureTitle variant="h5">
              <strong>24/7 Support</strong>
            </FeatureTitle>
            <FeatureSubtitle>
              Receive support anytime from our expert team. Our dedicated professionals are available around the clock to assist you with any queries or issues.
            </FeatureSubtitle>
          </FeatureBox>
        </Grid>
      </Grid>
    </Box>
   
  );
}

export default Features;
