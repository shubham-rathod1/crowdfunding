import React, { useState, useContext } from 'react';
import { Box, TextField } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useMoralis } from 'react-moralis';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicDetails from './BasicDetails';
import ContractDetails from './ContractDetails';
import Review from './Review';
import { AppContext } from '../../context/AppContextProvider';
import useFetch from '../../hooks/useFetch';
import Header from '../core/Header';
import { Moralis } from 'moralis';

const steps = ['Basic Details', 'Contract Details', 'Review'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicDetails />;
    case 1:
      return <ContractDetails />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function CreateCampaign() {
  const { authenticate, isAuthenticated, logout, isAuthenticating, user } =
    useMoralis();
  const [activeStep, setActiveStep] = useState(0);
  const { campaignForm, setCampaignForm, userAddress, setImgUrl } =
    useContext(AppContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const dummyImage =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdgsQb_YcG2ZzuQA_p7Nb0NBRPYFx6m1BHbO6teQ1Z2Zl1b-ySwyMpLJhHH4lscnfMXHk&usqp=CAU';

  const handleChange = (e) => {
    const value = e.target.files[0];
    setPreview(URL.createObjectURL(value));
    setFile(value);
  };

  const handleSubmit = async () => {
    const data = new Moralis.File(file.name, file);
    await data.saveIPFS();
    const url = data.ipfs();
    setCampaignForm({ ...campaignForm, image: url });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const { data, fetch, isFetching, isLoading } = useFetch({
    functionName: 'createCampaign',
    params: {
      _name: campaignForm.name,
      _target: campaignForm.target,
      _description: campaignForm.description,
      _manager: '0xAf2F4B7dD92F585503A0307EC569181DfdF0da93',
      _deadline: '3600',
      _minContribution: campaignForm.minContribution,
      _image: campaignForm.image,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Header
        logout={logout}
        login={authenticate}
        isAuthenticated={isAuthenticated}
      />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Container
          sx={{ flexBasis: '40%', display: 'flex', alignItems: 'center' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <img height='300px' width='300px' src={preview || dummyImage} />
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TextField
                sx={{ width: '300px', margin: '10px 0' }}
                type='file'
                onChange={handleChange}
              />
              <Button
                sx={{ width: '100px', height: '40px', margin: '10px 20px' }}
                variant='contained'
                onClick={handleSubmit}
              >
                Upload
              </Button>
            </div>
          </div>
        </Container>
        <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
          <Paper
            variant='outlined'
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component='h1' variant='h4' align='center'>
              Create Campaign
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <>
              {activeStep === steps.length ? (
                <>
                  <Typography variant='h5' gutterBottom>
                    Thank you for using KickStart.
                  </Typography>
                  <Typography variant='subtitle1'>
                    Your campaigns is created and will be live shortly.
                  </Typography>
                </>
              ) : (
                <>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant='contained'
                      onClick={
                        activeStep === steps.length - 1 ? fetch : handleNext
                      }
                      sx={{ mt: 3, ml: 1 }}
                    >
                      {activeStep === steps.length - 1
                        ? 'create campaign'
                        : 'Next'}
                    </Button>
                  </Box>
                </>
              )}
            </>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}
