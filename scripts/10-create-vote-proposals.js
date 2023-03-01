import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";

(async () => {
    try {
        const vote = await sdk.getContract("0x634f02C664da04C344b7F956117c8A61fa2a98Cd", "vote");

        const token = await sdk.getContract("0xf6f94294dA2A7194f84AB8CD1F9Fb7f7D35A0807", "token");
        const amount = 420_000;
        const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";

        const executions = [
            {
                toAddress: token.getAddress(),
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    "mintTo", [
                        vote.getAddress(),
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
            }
        ];
        await vote.propose(description, executions);
        console.log("Successfully created proposal to mint tokens");
    } catch (error) {
        console.error("failed to create first proposal", error);
        process.exit(1);
    }
    
    try {
        const vote = await sdk.getContract("0x634f02C664da04C344b7F956117c8A61fa2a98Cd", "vote");

        const token = await sdk.getContract("0xf6f94294dA2A7194f84AB8CD1F9Fb7f7D35A0807", "token");
        const amount = 6_900;
        const description = "Should the  DAO transfer " + amount + " tokens from the treasure to " + process.env.WALLET_ADDRESS + " for being awesome?";
        
        const executions = [
            {
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    "transfer",
                    [
                        process.env.WALLET_ADDRESS,
                        ethers.utils.parseUnits(amount.toString(), 18),
                    ]
                ),
                toAddress: token.getAddress(),
            }
        ]
        await vote.propose(description, executions);
        console.log(
            "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
        );
        } catch (error) {
            console.error("failed to create second proposal", error);
        }
    
})();