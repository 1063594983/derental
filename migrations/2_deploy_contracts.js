// var Rental = artifacts.require("Rental");
var Marketplace = artifacts.require("Marketplace");

module.exports = function(deployer) {
  // deployer.deploy(Rental)
  deployer.deploy(Marketplace, "0xaaa5110d4d02b4daad52e0d1679e4e0f36c889fc");
};
