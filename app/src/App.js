import React, { useEffect, useState } from 'react';
import LandingPage from './components/core/LandingPage';
import { ethers } from 'ethers';
import { campaign_abi, kickstart_abi } from './abi';
import { useMoralis } from 'react-moralis';

function App() {
  const { enableWeb3 } = useMoralis();

  const [factoryContract, setFactoryContract] = useState(null);

  useEffect(() => {
    (async function () {
      const provider = ethers.getDefaultProvider('rinkeby');
      const contract = new ethers.Contract(
        process.env.REACT_APP_KICKSTART_ADD,
        kickstart_abi,
        provider
      );
      setFactoryContract(contract);
      enableWeb3();
    })();
  }, []);
  return (
    <>
      <LandingPage factoryContract={factoryContract} />
    </>
  );
}

export default App;
