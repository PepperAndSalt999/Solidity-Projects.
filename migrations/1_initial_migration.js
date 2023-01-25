//Require returns a contract abstraction, need to match name of contract definition
const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  //caling interface for deployment aka "deployer"
  deployer.deploy(Migrations);
};
