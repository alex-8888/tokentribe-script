window.TokenTribeCrypto = async function (webhookUrl, projectId) {
  try {
    alert("Wallet connect modal loading...");

    // Delay half a second so user doesn’t have to click “Close”
    setTimeout(async () => {
      // Check if MetaMask or any wallet is installed
      if (typeof window.ethereum !== "undefined") {
        console.log("🦊 MetaMask detected. Connecting...");

        // Request wallet accounts
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const walletAddress = accounts[0];

        alert("Wallet connected successfully: " + walletAddress);

        // Send wallet info to Make webhook
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
          console.log("✅ Data sent to webhook.");
        } else {
          alert("Webhook request failed: " + response.status);
          console.error(await response.text());
        }
      } else {
        // Fallback to simulated wallet
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
          console.log("✅ Simulated wallet data sent to webhook.");
        } else {
          alert("Simulated webhook request failed: " + response.status);
        }
      }
    }, 500); // delay end

  } catch (err) {
    alert("Wallet connection failed. Check console for details.");
    console.error("❌ Wallet connect error:", err);
  }
};
