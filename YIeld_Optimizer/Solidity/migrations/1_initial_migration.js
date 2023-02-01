//get vault artifacts (json metadata)
const vault = artifacts.require("migrations");

module.exports = function(deployer) {
    deployer.deploy(vault);
}