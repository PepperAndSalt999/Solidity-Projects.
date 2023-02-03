//get vault artifacts (json metadata)
const vault = artifacts.require("Vault");

module.exports = function(deployer) {
    deployer.deploy(vault);
}