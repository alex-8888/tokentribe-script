window.TokenTribeCrypto = async function (webhookUrl, projectId) {
  try {
    alert("Wallet connect modal loading...");

    if (typeof window.ethereum === "undefined") {
      alert("No wallet found. Please install MetaMask.");
      return;
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const walletAddress = accounts[0];

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        wallet: walletAddress,
        payment_method: "Crypto",
        status: "Wallet Connected",
        timestamp: new Date().toISOString()
      })
    });

    alert("Wallet connected successfully: " + walletAddress);
  } catch (err) {
    console.error("Wallet connection failed:", err);
    alert("Failed to connect wallet.");
  }
};
