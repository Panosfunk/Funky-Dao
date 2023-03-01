import sdk from "./1-initialize-sdk.js";

(async () => {
  try {
    const vote = await sdk.getContract("0x634f02C664da04C344b7F956117c8A61fa2a98Cd", "vote");

    const token = await sdk.getContract("0xf6f94294dA2A7194f84AB8CD1F9Fb7f7D35A0807", "token");
    await token.roles.grant("minter", vote.getAddress());

    console.log("Successfully gave vote contract permissions to act on token contract");

  } catch (error) {
    console.log("Could not transfer funds to Vote Contract", error);
    process.exit(1);
  }

  try {
    // This is our governance contract.
    const vote = await sdk.getContract("0x634f02C664da04C344b7F956117c8A61fa2a98Cd", "vote");
    // This is our ERC-20 contract.
    const token = await sdk.getContract("0xf6f94294dA2A7194f84AB8CD1F9Fb7f7D35A0807", "token");

    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = Number(ownedAmount) / 100 * 90;

    await token.transfer(
        vote.getAddress(),
        percent90
    );

    console.log("Succesfully transferred " + percent90 + " tokens to vote contract");
  } catch (error) {
    console.error("failed to transfer tokens to vote cotnract ", error);
  }
})();