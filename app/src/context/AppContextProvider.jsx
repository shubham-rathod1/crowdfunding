import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const init = {
  name: '',
  description: '',
  target: '',
  deadline: '',
  minContribution: '',
  manager: '',
  image: '',
};

export default function AppContextProvider({ children }) {
  const [campaignForm, setCampaignForm] = useState(init);
  const [userAddress, setUserAddress] = useState(null);
  // const [imgUrl, setImgUrl] = useState('');
  const value = {
    campaignForm,
    setCampaignForm,
    setUserAddress,
    userAddress,
  };
  return (
    <div>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </div>
  );
}
