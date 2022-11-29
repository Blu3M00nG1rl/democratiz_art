const DemocratizArt = artifacts.require("DemocratizArt");

module.exports = async function (callback) {
  const deployed = await DemocratizArt.deployed();

  callback();
};
