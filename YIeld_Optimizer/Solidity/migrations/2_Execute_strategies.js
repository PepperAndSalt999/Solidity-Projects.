const executer = artifacts.require("Execute_strategies");

module.exports = function(deployer){
    deployer.deploy(executer);
};