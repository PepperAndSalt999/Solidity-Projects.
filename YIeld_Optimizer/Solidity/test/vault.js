const Vault =  artifacts.require("Vault");

describe("Write features of vault", function(){
    if("able to receive money", async function(){
        const vault = await Vault.new();
       // assert.equal(await Vault.getter(), 100);
    });
});