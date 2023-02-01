//Test functions one by one.

const Operation =  artifacts.require("Operation");
const Advanced_operation = artifacts.require("Advanced_operation");

describe("Modify number", function () {
    describe("Deployment", function () {

      it("modify and read the state variable.", async function () {
        const operation = await Operation.new("Hello, world!");
        await operation.state_modify(50);
        assert.equal(await operation.get_state_variable(), 100);
      });

      it("Did the multiplication.", async function () {
        const operation = await Operation.new("Hello, world!");
        assert.equal(await operation.multiply_number(30), 60);
      });

      it("Did the complex multiplication.", async function () {
        const operation = await Advanced_operation.new("hi");
        assert.equal(await operation.advanced_multiplication(30), 3600);
      });

    });
});