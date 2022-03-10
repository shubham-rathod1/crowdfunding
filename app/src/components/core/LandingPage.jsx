import React, { useEffect, useState, useContext } from 'react';
import { ethers } from 'ethers';
import { useMoralis } from 'react-moralis';
import { Grid, Typography, Box } from '@mui/material';

import Header from './Header';
import CampaignCard from './CampaignCard';
import { campaign_abi } from '../../abi';
import { AppContext } from '../../context/AppContextProvider';
import PaymentDialog from '../payout/PaymentDialog';

export default function LandingPage({ factoryContract }) {
  const [wallet, setWallet] = useState('');
  const [open, setOpen] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [address, setAddress] = useState('');
  const { setUserAddress } = useContext(AppContext);

  const { authenticate, isAuthenticated, logout, isAuthenticating, user } =
    useMoralis();

  const handleClickOpen = (address) => {
    setAddress(address);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      if (factoryContract !== null) {
        const campaigns = await factoryContract.getCampaigns();
        setCampaigns(campaigns);
      }
    })();
  }, [factoryContract]);

  useEffect(() => {
    const provider = ethers.getDefaultProvider('rinkeby');
    const arry = [];
    campaigns?.forEach(async (item) => {
      const contract = new ethers.Contract(item, campaign_abi, provider);
      const payload = {
        address: contract.address,
        name: await contract.name(),
        description: await contract.description(),
        target: await contract.target(),
        deadline: await contract.deadline(),
        minContribution: await contract.minContribution(),
        raised: await contract.raisedAmount(),
        manager: await contract.manager(),
        noOfBackers: await contract.noOfBackers(),
        image: await contract.image(),
      };
      arry.push(payload);
      setCampaignData([...arry]);
    });
  }, [campaigns]);

  useEffect(() => {
    const address = isAuthenticated && user.get('ethAddress');
    isAuthenticated && setWallet(user.get('ethAddress'));
    setUserAddress(address);
  }, [isAuthenticated]);
  return !isAuthenticating ? (
    <div>
      <Header
        logout={logout}
        login={authenticate}
        isAuthenticated={isAuthenticated}
      />
      <div style={{ padding: '50px' }}>
        <div>
          <PaymentDialog
            open={open}
            address={address}
            handleClose={handleClose}
          />
        </div>
        {/* <div> */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <Typography variant='h5'>
            Explore Projects: {campaigns ? campaigns.length : 'loading'}
          </Typography>
          <Typography>
            {isAuthenticated ? ` Address: ${wallet}` : 'please login'}
          </Typography>
        </Box>
        {/* </div> */}
        <div>
          <Grid container spacing={2}>
            {campaignData?.map((camp) => {
              return (
                <Grid item lg={4} key={camp.address}>
                  <CampaignCard
                    {...camp}
                    isAuthenticated={isAuthenticated}
                    handleClickOpen={handleClickOpen}
                    login={authenticate}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  ) : (
    'loading'
  );
}
