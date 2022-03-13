require("dotenv").config();
const { AnchorEarn, CHAINS, NETWORKS, DENOMS } = require("@anchor-protocol/anchor-earn");
const fs = require("fs");

const anchorEarn = new AnchorEarn({
  chain: CHAINS.TERRA,
  network: NETWORKS.COLUMBUS_5,
  address: process.env.ADDRESS,
});

// timer 24 hours
main();
setInterval(main, 1000 * 60 * 60 * 24);

async function main() {
  const userBalance = await anchorEarn.balance({
    currencies: [DENOMS.UST],
  });

  const market = await anchorEarn.market({
    currencies: [DENOMS.UST],
  });

  // read from json
  const json = JSON.parse(fs.readFileSync("data.json", "utf8"));

  // fs write to json file
  const data = {
    userBalance: userBalance.balances[0].deposit_balance,
    market: market.markets[0].APY,
    time: new Date(),
  };
  
  console.log(data)
  
  // add data to json
  json.push(data);

  // write to json file
  fs.writeFileSync("./data.json", JSON.stringify(json, null, 2));
}
