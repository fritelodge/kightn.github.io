(function () {
  if (sessionStorage.getItem("utmTestPopupShown")) return;

  const params = new URLSearchParams(window.location.search);
  let hasTestUTM = false;

  params.forEach((value, key) => {
    if (key.toLowerCase().startsWith("utm_") && value.toLowerCase().includes("test")) {
      hasTestUTM = true;
    }
  });

  if (!hasTestUTM) return;

  sessionStorage.setItem("utmTestPopupShown", "true");

  // Styles
  const style = document.createElement("style");
  style.innerHTML = `
    .utm-modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .utm-modal {
      background: #ffffff;
      max-width: 420px;
      width: 90%;
      padding: 22px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      position: relative;
    }
    .utm-modal h2 {
      margin: 0 0 15px;
      font-size: 22px;
      text-align: center;
    }
    .utm-row {
      display: flex;
      gap: 10px;
    }
    .utm-modal input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .utm-modal button {
      width: 100%;
      padding: 12px;
      background: #0d65bf;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
    .utm-close {
      position: absolute;
      top: 10px;
      right: 12px;
      font-size: 20px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Modal HTML
  const modal = document.createElement("div");
  modal.className = "utm-modal-overlay";
  modal.innerHTML = `
    <div class="utm-modal">
      <div class="utm-close">&times;</div>
      <h2>Unlock Your Savings Now</h2>

      <form method="POST"
            action="https://www.dealersocket.com/forms/post"
            target="_self">

        <!-- REQUIRED DEALERSOCKET FIELDS -->
        <input type="hidden" name="dealerId" value="YOUR_DEALER_ID_HERE">
        <input type="hidden" name="source" value="Website Popup">
        <input type="hidden" name="campaign" value="UTM Test">
        <input type="hidden" name="leadType" value="Sales">
        <input type="hidden" name="comments" value="UTM Test Popup Submission">

        <!-- USER FIELDS -->
        <div class="utm-row">
          <input type="text" name="firstName" placeholder="First Name" required>
          <input type="text" name="lastName" placeholder="Last Name" required>
        </div>

        <input type="email" name="email" placeholder="Email Address" required>
        <input type="tel" name="phone" placeholder="Phone Number" required>

        <!-- OPTIONAL TRACKING -->
        <input type="hidden" name="pageUrl" value="${window.location.href}">

        <button type="submit">Submit</button>
      </form>
    </div>
  `;
  document.body.appendChild(modal);

  // Close logic
  modal.querySelector(".utm-close").onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
})();
