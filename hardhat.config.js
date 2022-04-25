require("@nomiclabs/hardhat-waffle");

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/d8zA-vce75P7kU1e3RzVS-U92g0bsLTy",
      accounts: []
    },
    mainnet: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/jxOVAj_MEFwuxubfJX72DBO0_FYWUatM",
      accounts: []
    }
  },
  solidity: "0.8.4",
};