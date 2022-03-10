import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AppContext } from '../../context/AppContextProvider';

export default function PaymentForm() {
  const { campaignForm, setCampaignForm } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaignForm({ ...campaignForm, [name]: value });
  };
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Contract Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name='target'
            label='Campaign Target'
            helperText='Amount in wei'
            fullWidth
            variant='standard'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name='start'
            label='Start Date'
            fullWidth
            variant='standard'
            type='datetime-local'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name='deadline'
            label='End Date'
            fullWidth
            variant='standard'
            type='datetime-local'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            name='minContribution'
            label='Min contribution'
            helperText='Min amount to fund'
            fullWidth
            variant='standard'
            // type='number'
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
