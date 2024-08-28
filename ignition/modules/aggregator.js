const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AggregatorModule", (m) => {
  const aggregatorContract = m.contract("Aggregator", []);

  return { aggregatorContract };
});
