    import React, { useState } from 'react';
    // import { Helmet } from 'react-helmet-async';
    import { styled } from '@mui/material/styles';
    import { Container, Typography, Divider, Stack, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
    import { Link } from 'react-router-dom';
    import CloseIcon from '@mui/icons-material/Close';
    import  LoginForm  from '../forms/LoginForm';
    import RegistrationPage from './Registration';
    import useResponsive from '../hooks/useResponsive';
    import Logo from '../components/logos/logo.png'
    import LoginImage from '../components/images/LoginImage.jpg'
    import { useNavigate } from 'react-router-dom';


    const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
    }));

    // const StyledSection = styled('div')(({ theme }) => ({
    // // height: '100vh',
    // // width: '100%',
    // // maxWidth: 480,
    // // display: 'flex',
    // // flexDirection: 'column',
    // // justifyContent: 'center',
    // // backgroundColor: theme.palette.background.default,
    // // minWidth: 498,
    // // minHeight: 600
    // }));

    const StyledContent = styled('div')(({ theme }) => ({
    // maxWidth: 480,
    // margin: 'auto',
    // minHeight: 'auto',
    // display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'column',
    // padding: theme.spacing(12, 0),
    marginTop:'260px'
    }));

    const CloseButtonContainer = styled('div')({
    position: 'absolute',
    top: '8px', // Adjust the top position as needed
    right: '8px', // Adjust the right position as needed
    cursor: 'pointer',
    });


    export default function LoginPage() {



    const [openRegistrationDialog, setOpenRegistrationDialog] = useState(false);

    const mdUp = useResponsive('up', 'md');
    const navigate=useNavigate();

    const handleOpenRegistration = () => {
        navigate('/Registration');
    };

    const closeDialog = () => {
        setOpenRegistrationDialog(false);
    };

    const handleCloseRegistrationDialog = () => {
        setOpenRegistrationDialog(false);
    };

    return (
        <>
        {/* <Helmet>
            <title> Login | Minimal UI </title>
        </Helmet> */}

        <StyledRoot>
            <img
            src={Logo}
            alt="Logo"
            style={{
                position: 'fixed',
                top: '10px', // Adjust the top position as needed
                left: '7px', // Adjust the left position as needed
                width: '270px', // Adjust the width as needed
                height: 'auto', // Adjust the height as needed, 'auto' maintains the aspect ratio
            }}
            />


            {mdUp && (
            // <StyledSection >
             <img
                src={LoginImage}
                alt="login"
                style={{
                    height: '100vh',
                    width: 'auto'

                }}
            />

            // </StyledSection>

            )}

            <Container maxWidth="sm">
            <StyledContent>
                    
            <Typography variant="h6" gutterBottom>
                Welcome to the Admin portal
                </Typography>
                <Typography variant="h4" gutterBottom>
                Sign in here!
                </Typography>
                <div className="d-grid d-md-flex justify-content-md-end mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: 0, marginRight: '8px' }}>Don't have an account?</p>
                <Button onClick={handleOpenRegistration} variant="contained"   sx={{
        fontSize: '12px',
        backgroundColor: "#e53935",
        '&:hover': {
            backgroundColor: "#e53935", 
        }
    }}>
                    Create new account
                </Button>
                </div>


                <Stack direction="row" spacing={2}>
                {/* Buttons for social login */}
                </Stack>

                <Divider sx={{ my: 3 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    OR
                </Typography>
                </Divider>

                <LoginForm />
            </StyledContent>
            </Container>
        </StyledRoot>

        <Dialog open={openRegistrationDialog} onClose={handleCloseRegistrationDialog} >
            <DialogTitle>
            Sign Up!
            <CloseButtonContainer>
                <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseRegistrationDialog}
                aria-label="close"
                >
                <CloseIcon />
                </IconButton>
            </CloseButtonContainer>
            </DialogTitle>
            <DialogContent >
            <RegistrationPage closeDialog={closeDialog} />
            </DialogContent>
        </Dialog>
        </>
    );
    }
