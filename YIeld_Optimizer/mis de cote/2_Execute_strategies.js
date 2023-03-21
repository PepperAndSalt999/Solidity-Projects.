const executer = artifacts.require("Execute_strategies");

module.exports = async function(deployer){
    i(network == "goerli")
    {
        const deployedContract = await executer.deployed();
        if (!deployedContract)
            deployer.deploy(executer, {overwrite:false}); //won't redeploy the contract if it has already been deployed
    }
    else
        deployer.deploy(executer);

};