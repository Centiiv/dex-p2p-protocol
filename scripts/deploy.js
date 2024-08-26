async function main() {
    const Aggregator = await ethers.getContractFactory("Aggregator");
    const aggregator = await Aggregator.deploy();
    await aggregator.deployed();
  
    console.log("Aggregator deployed to:", aggregator.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
  