import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AppContext } from '../../context/AppContextProvider';

export default function BasicDetails() {
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
        <Grid item xs={12}>
          <TextField
            required
            id='name'
            name='name'
            label='Campaign Name'
            fullWidth
            autoComplete='given-name'
            variant='standard'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='description'
            name='description'
            label='Description'
            fullWidth
            autoComplete='tell us about your campaign'
            variant='standard'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='image'
            name='image'
            label='Upload campaign image'
            fullWidth
            autoComplete='shipping address-level2'
            variant='standard'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
