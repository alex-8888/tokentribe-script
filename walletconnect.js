window.TokenTribeCrypto = async function (webhookUrl, projectId) {
  try {
    alert("Wallet connect modal loading...");

    if (typeof window.ethereum !== "undefined") {
      console.log("🦊 MetaMask detected. Connecting...");
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const walletAddress = accounts[0];
      alert("Wallet connected successfully: " + walletAddress);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: walletAddress,
          payment_method: "Crypto",
          status: "Connected via MetaMask",
          project_id: projectId,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert("Wallet connection logged successfully.");
      } else {
        alert("Webhook request failed: " + response.status);
      }

    } else {
      alert("No wallet found. Simulating wallet connection...");

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet: "0xFAKE1234",
          payment_method: "Crypto (Simulated)",
          status: "Simulated connection",
          project_id: projectId,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        alert("Simulated wallet connection logged successfully.");
      } else {
        alert("Simulated webhook request failed: " + response.status);
      }
    }
  } catch (err) {
    alert("Wallet connection failed. Check console for details.");
    console.error("❌ Wallet connect error:", err);
  }
};
