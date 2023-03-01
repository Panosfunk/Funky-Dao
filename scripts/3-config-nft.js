import sdk from "./1-initialize-sdk.js"
import {readFileSync} from "fs";

(async () => {
    try {
        const editionDrop = await sdk.getContract("0x7cc73a56c9201fb7C88Ce4C8Bdc70945B01812ab", "edition-drop");
        await editionDrop.createBatch([
            {
                name: "Vincent 1",
                description: "This is the key to FunkTown",
                image: readFileSync("scripts/assets/Vincent1.png"),
            },
        ]);
        console.log("Successfully created a new NFT in the drop!");
    }catch (error) {
        console.log(error);
    }
}) ();