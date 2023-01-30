const Gaz_test = artifacts.require("Gaz_test")

module.exports = function(deployer) {
    deployer.deploy(Gaz_test);
}