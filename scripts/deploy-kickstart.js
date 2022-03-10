const { ethers } = require('hardhat');

async function main() {
  const kickstarts = await ethers.getContractFactory('Kickstart');
  const kickstart = await kickstarts.deploy();

  await kickstart.deploy();
  console.log('success contract deployed', kickstart.address);
}
