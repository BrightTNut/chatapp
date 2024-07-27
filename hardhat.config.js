require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    polygonAmoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/AMReezTlvd-UE5LaCy11OWGRqwIXUiRj`,
      accounts: [
        "2da9ab43ab88fe2f0ed21dc9cc670fcbd483b29785688c6ef0c9691795a32962",
      ],
      timeout: 200000,
    },
  },
};
