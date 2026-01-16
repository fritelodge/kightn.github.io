(function () {
  // Prevent showing multiple times per session
  if (sessionStorage.getItem("utmTestPopupShown")) return;

  const params = new URLSearchParams(window.location.search);
  let hasTestUTM = false;

  params.forEach((value, key) => {
    if (key.toLowerCase().startsWith("utm_") && value.toLowerCase().includes("highgear")) {
      hasTestUTM = true;
    }
  });

  if (!hasTestUTM) return;

  sessionStorage.setItem("utmTestPopupShown", "true");

  // Inject styles
  const style = document.createElement("style");
  style.innerHTML = `
    .utm-modal-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
    }
    .utm-modal {
      background: #ffffff;
      max-width: 400px;
      width: 90%;
      padding: 20px;
      border-radius: 8px;
      font-family: Arial, sans-serif;
      position: relative;
    }
    .utm-modal h2 {
      margin-top: 0;
      font-size: 20px;
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
      padding: 10px;
      background: #0d65bf;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .utm-close {
      position: absolute;
      top: 10px;
      right: 12px;
      cursor: pointer;
      font-size: 18px;
    }
  `;
  document.head.appendChild(style);

  // Build modal
  const modal = document.createElement("div");
  modal.className = "utm-modal-overlay";
  modal.innerHTML = `
    <div class="utm-modal">
      <div class="utm-close">&times;</div>
      <h2>Get More Information</h2>
      <form id="utmTestForm">
        <input type="text" name="name" placeholder="Full Name" required />
        <input type="email" name="email" placeholder="Email Address" required />
        <input type="tel" name="phone" placeholder="Phone Number" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  // Close handlers
  modal.querySelector(".utm-close").onclick = () => modal.remove();
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };

  // Form submit
  document.getElementById("utmTestForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value
    };

    console.log("UTM Test Lead:", formData);

    // TODO: send to CRM / backend
    modal.remove();
    alert("Thank you! We'll be in touch soon.");
  });
})();
