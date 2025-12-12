window.TokenTribeCrypto = async function (webhookUrl, projectId) {
  try {
    console.log("Wallet connect modal loading...");

    // Create a simple on-screen message (non-blocking)
    const msgBox = document.createElement("div");
    msgBox.innerText = "Wallet connect modal loading...";
    msgBox.style.position = "fixed";
    msgBox.style.bottom = "20px";
    msgBox.style.right = "20px";
    msgBox.style.background = "#222";
    msgBox.style.color = "#fff";
    msgBox.style.padding = "10px 15px";
    msgBox.style.borderRadius = "8px";
    msgBox.style.fontFamily = "sans-serif";
    msgBox.style.zIndex = "9999";
    document.body.appendChild(msgBox);

    // Run after a short delay (so the UI updates first)
    setTimeout(async () => {
      if (typeof window.ethereum !== "undefined") {
        console.log("🦊 MetaMask detected. Connecting...");
        msgBox.innerText = "MetaMask detected. Connecting...";

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const walletAddress = accounts[0];
        console.log("Connected wallet:", walletAddress);
        msgBox.innerText = "Wallet connected: " + walletAddress;

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
          msgBox.innerText = "✅ Wallet connection logged successfully.";
          console.log("✅ Data sent to webhook.");
        } else {
          msgBox.innerText = "❌ Webhook request failed.";
          console.error(await response.text());
        }
      } else {
        console.log("⚙️ No wallet found. Simulating wallet connection...");
        msgBox.innerText = "No wallet found. Simulating wallet connection...";

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
          msgBox.innerText = "✅ Simulated wallet connection logged successfully.";
          console.log("✅ Simulated wallet data sent to webhook.");
        } else {
          msgBox.innerText = "❌ Simulated webhook request failed.";
        }
      }

      // Hide message after 3 seconds
      setTimeout(() => msgBox.remove(), 3000);
    }, 500);

  } catch (err) {
    console.error("❌ Wallet connect error:", err);
  }
};
