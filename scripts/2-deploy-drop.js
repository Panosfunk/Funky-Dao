import { AddressZero } from '@ethersproject/constants';

import sdk from "./1-initialize-sdk.js";
import {readFileSync} from "fs";

(async () => {
    try {
        const editioinDropAddress = await sdk.deployer.deployEditionDrop({
            name: "FunkyDAO Membership",
            description: "If you wanna be Funky, this is the only way..",
            image: readFileSync("scripts/assets/me.png"),
            primary_sale_recipient: AddressZero,
        });

        const editionDrop = await sdk.getContract(editioinDropAddress, "edition-drop");

        const metadata = await editionDrop.metadata.get();

        console.log("You actually deployed editionDrop contract, address: ", editioinDropAddress);
        console.log("editionDrop metadata: ", metadata);
    } catch (error) {
        console.log("failed to deploy contract ", error);
    }
}) ();