const MyToken = artifacts.require("MyToken");
const DEX = artifacts.require("DEX");

module.exports = async function(deployer) {
  await deployer.deploy(MyToken, "1000000000000000000000"); // 1000 tokens
  const tokenInstance = await MyToken.deployed();
  await deployer.deploy(DEX, tokenInstance.address, "10000000000000000"); // Price: 0.01 ETH
};
