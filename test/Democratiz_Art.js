const { expect } = require("chai");
const { BN } = require('@openzeppelin/test-helpers');

describe("Get functions", function () {

    it("Should get the listing price", async function () {
        const DA = await ethers.getContractFactory("Democratiz_Art");
        const da = await DA.deploy();

        expect(await da.getListingPrice()).to.equal(new BN(1500000000000000));
    });

});

