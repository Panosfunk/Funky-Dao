import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        const voteContractAddress = await sdk.deployer.deployVote({
            name: "My amazing DAO",
            voting_token_address: "0xf6f94294dA2A7194f84AB8CD1F9Fb7f7D35A0807",
            // These parameters are specified in number of blocks. 
            // Assuming block time of around 13.14 seconds (for Ethereum)

            // After a proposal is created, when can members start voting?
            // For now, we set this to immediately.
            voting_delay_in_blocks: 0, 
            // How long do members have to vote on a proposal when it's created?
            // we will set it to 1 day = 6570 blocks
            voting_period_in_blocks: 6570,
            
            // The minimum % of the total supply that need to vote for
            // the proposal to be valid after the time for the proposal has ended.
            voting_quorum_fraction: 0,

            // What's the minimum # of tokens a user needs to be allowed to create a proposal?
            // I set it to 0. Meaning no tokens are required for a user to be allowed to
            // create a proposal.
            proposal_token_threshold: 0,
        });

        console.log(
          "✅ Successfully deployed vote contract, address:",
          voteContractAddress,
        );
    } catch (error) {
        console.log("Failed to deploy vote contract: ", error);
    }
})();