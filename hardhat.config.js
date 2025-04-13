require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    polygonAmoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/AMReezTlvd-UE5LaCy11OWGRqwIXUiRj`,
      accounts: [
        "",
      ],
      timeout: 200000,
    },
  },
};
