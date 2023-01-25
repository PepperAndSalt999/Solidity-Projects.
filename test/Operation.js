//Test functions one by one.

const Operation =  artifacts.require("Operation");

describe("Multiply number", function () {
    describe("Deployment", function () {
      it("Did the multiplication.", async function () {
        const operation = await Operation.new("Hello, world!");
        assert.equal(await operation.multiply_number(30), 60);
      });
    });
  });