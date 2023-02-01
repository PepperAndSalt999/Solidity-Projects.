const connectButton = document.getElementById("connectButton");

connectButton.addEventListener("click", () => {
      if (typeof window.ethereum !== "undefined") {
        ethereum
          .request({ method: "eth_requestAccounts" })
          .then((accounts) => {
                const account = accounts[0]
                walletID.innerHTML = `Wallet connected: ${account}`;
            }).catch((error) => {
                console.log(error, error.code);
            });
        } else {
           window.open("https://metamask.io/download/", "_blank");
           installAlert.classList.add("show");
        }
});

const form = document.getElementById("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const numberInput = document.getElementById("numberInput");
  const enteredNumber = numberInput.value;
  console.log("The entered number is:", enteredNumber);
});
