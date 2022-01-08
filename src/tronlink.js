import config from "./config.json";
import utils from "ethers-utils";

let userAddress;

export default {
    async connect() {
        const tronWeb = window.tronWeb;
        try {
            userAddress = tronWeb.defaultAddress.base58;
            return await tronWeb.request({
                method: "tron_requestAccounts",
            });
        } catch (err) {
            alert("login to your tronLink wallet");
        }
    },
    async approve(contractAddress, amount) {
        try {
            const contract = await tronWeb.contract().at(contractAddress);
            return await contract.methods
                .approve(
                    config.APPROVE_SPENDER_ADRESS,
                    new utils.BigNumber(amount)
                )
                .send();
        } catch (err) {
            alert(err);
        }
    },
    async getBalance(contractAddress) {
        try {
            const contract = await tronWeb.contract().at(contractAddress);
            const balance = await contract.methods
                .balanceOf(userAddress)
                .call();
            return balance.toString();
        } catch (err) {
            alert(err);
        }
    },
};
