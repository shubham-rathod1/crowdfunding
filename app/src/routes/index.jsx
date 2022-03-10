import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import Accounts from '../components/accounts/Accounts';
import CreateCampaign from '../components/campaign/CreateCampaign';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact="true" path='/' element={<App />} />
        <Route path='/campaigns' element={<CreateCampaign />} />
        <Route path='/accounts' element={<Accounts />} />
      </Routes>
    </BrowserRouter>
  );
}
