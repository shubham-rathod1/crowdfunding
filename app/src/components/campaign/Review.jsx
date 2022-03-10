import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import { Box } from '@mui/material';
import { AppContext } from '../../context/AppContextProvider';

export default function Review() {
  const { campaignForm } = useContext(AppContext);
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Review your Campaign
      </Typography>
      <List disablePadding>
        {[campaignForm]?.map((item) => {
          return (
            <div>
              <Box>Name: {item.name}</Box>
              <Box>Description: {item.description}</Box>
              <Box>Target: {item.target}</Box>
              <Box>MinContribution: {item.minContribution}</Box>
              <Box>Deadline: {item.deadline}</Box>
              <Box>Name: {item.name}</Box>
            </div>
          );
        })}
      </List>
    </React.Fragment>
  );
}
