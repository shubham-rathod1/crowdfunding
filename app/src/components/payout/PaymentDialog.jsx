import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useFetch from '../../hooks/campaignFun';

// import { fund } from '../campaignFun';

export default function PaymentDialog({ open, handleClose, address }) {
  const [val, setVal] = useState('');
  // console.log(address);
  const handleChange = (e) => {
    const { value } = e.target;
    setVal(value);
  };
  const { data, fetch, isFetching, isLoading } = useFetch({
    functionName: 'fund',
    msgValue: val,
    contractAddress: address,
  });
  const handleFund = () => {
    if (val !== '') {
      console.log(address);
      fetch();
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Show your support Now!!!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            please enter the amount you wish to fund
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Enter Amount to Fund'
            type='number'
            fullWidth
            variant='standard'
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='outlined' onClick={(handleClose, handleFund)}>
            Fund
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
