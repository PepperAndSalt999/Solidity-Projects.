//get vault artifacts (json metadata)
const vault = artifacts.require("Vault");

//clarification on the inner workings of the modules.exports.
//when the modules are getting imported, the require of the artifacts is going to get on the stack, and executed.
//after that, the module function is going to be declared, but will be only executed when the module get called
module.exports = async function(deployer, network) {
    const Vault = await vault.deployed();
    if(!Vault)
        await deployer.deploy(vault);
}