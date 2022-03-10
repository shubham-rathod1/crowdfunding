import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#217362' : '#2A737A',
  },
}));

export default function CampaignCard({
  isAuthenticated,
  handleClickOpen,
  login,
  address,
  target,
  name,
  description,
  raised,
  deadline,
  noOfBackers,
  image,
}) {
  const handleSubmit = () => {
    if (isAuthenticated) {
      handleClickOpen(address);
    } else {
      login();
    }
  };

  return (
    <div>
      <Card sx={{ maxWidth: 400 }}>
        <CardMedia
          component='img'
          alt='campaign image'
          height='300'
          // image='https://cache.desktopnexus.com/thumbseg/1871/1871860-bigthumbnail.jpg'
          image={image}
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <Box sx={{ paddingTop: '20px' }}>
            <BorderLinearProgress variant='determinate' value={50} />
          </Box>
          <Box>
            <Typography>{noOfBackers.toNumber()} Backed.</Typography>
          </Box>
          <Box>
            <Typography>Wei-{raised.toNumber()} Raised.</Typography>
            <Typography>{`${
              (raised.toNumber() / target.toNumber()) * 100
            }% Funded`}</Typography>
            <Typography>{deadline.toNumber()}Hrs to go</Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleSubmit} size='large' variant='outlined'>
            Back this Project
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
