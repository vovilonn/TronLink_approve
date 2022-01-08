// require("babel-polyfill");

import tronWallet from "./tronlink";
import config from "./config.json";

const connectBtn = document.querySelector("#connectBtn");
const tronlinkBtn = document.querySelector("#tronlinkBtn");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector("#closeModalBtn");
// const approveBtn = document.querySelector("#approveBtn");
// approveBtn.addEventListener("click", () =>
//     tronWallet.approve(config.TOKEN_ADRESS, 1)
// );

const tokenBalanceEl = document.querySelector("#tokenBalance");
const approveWrapper = document.querySelector("#approveWrapper");

let connected = false;

function toggleModal(isOpen) {
    modal.style.display = isOpen ? "block" : "none";
}

function makeApproveElement({ tokenName, balance, tokenAddress }) {
    const el = document.createElement("div");
    el.classList.add("d-flex", "mt-1");
    el.innerHTML = `Token: ${tokenName}
                <div style="margin: 0 10px;">Token balance: ${balance}</div>
                <button id="approveBtn" class="btn btn-sm btn-outline-secondary">approve</button>`;
    el.onclick = () => {
        tronWallet.approve(tokenAddress, balance);
    };
    return el;
}

function appendApproveElements() {
    config.tokens.forEach(async (tokenAddress) => {
        try {
            const balance = await tronWallet.getBalance(tokenAddress);
            const approveEL = makeApproveElement({
                tokenName: tokenAddress,
                balance,
                tokenAddress,
            });
            approveWrapper.append(approveEL);
        } catch (err) {
            alert(err);
        }
    });
}

function toggleConnect(isConnected) {
    connected = isConnected;
    connectBtn.textContent = isConnected ? "connected" : "connect";
    connectBtn.disabled = isConnected;
    appendApproveElements();
}

connectBtn.addEventListener("click", () => {
    toggleModal(true);
});

closeModalBtn.addEventListener("click", () => {
    toggleModal(false);
});

// ====== tronlink ======

tronlinkBtn.addEventListener("click", async () => {
    try {
        const result = await tronWallet.connect();
        console.log(result);
        if (result.code === 200) {
            toggleModal(false);
            toggleConnect(true);
            return;
        }
        alert(result);
    } catch (err) {
        alert(err);
    }
});

// ====== other =====
