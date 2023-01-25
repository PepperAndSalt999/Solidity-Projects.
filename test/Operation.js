//Test functions one by one.

const Operation =  artifacts.require("Operation");

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

    });
  });