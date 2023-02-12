//get vault artifacts (json metadata)
const vault = artifacts.require("Vault");


//module.exports allow node.js to export the function
//so that other file can access the code
module.exports = async function(deployer) {
    const Vault = await vault.deployed();
    if(!Vault)
        await deployer.deploy(vault);
}