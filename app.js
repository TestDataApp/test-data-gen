document.addEventListener("DOMContentLoaded", () => {
  handleTypeChange();
});

function handleTypeChange() {
  const typeSelection = document.getElementById("type").value;
  const lengthInput = document.getElementById("strLength");
  const lengthLabel = document.getElementById("lengthLabel");
  
  if (typeSelection.startsWith("email:")) {
    lengthInput.disabled = false;
    if (lengthLabel) lengthLabel.textContent = "Email Prefix (Length)";
  } else if (typeSelection.startsWith("json:")) {
    lengthInput.disabled = false;
    if (lengthLabel) lengthLabel.textContent = "JSON String Length";
  } else {
    lengthInput.disabled = true;
    if (lengthLabel) lengthLabel.textContent = "Length";
    document.getElementById("lengthError").textContent = "";
  }
}

function randomString(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateEmail(domainSelection, userLen) {
  let domain = domainSelection;
  if (domain === "random") {
    const domains = [
      "gmail.com", "yahoo.com", "test.com", "hotmail.com", 
      "outlook.com", "enterprise.org", "startup.io", 
      "verylongdomainnameexample.com", "multi-part-domain.co.uk"
    ];
    domain = domains[Math.floor(Math.random() * domains.length)];
  }
  return `${randomString(userLen)}@${domain}`;
}

function generatePhone(countryCode) {
  const num = Math.floor(9000000000 + Math.random() * 1000000000);
  return countryCode + num;
}

function generateJSON(schema, userLen) {
  const mode = document.getElementById("mode")?.value || "valid"; // optional dropdown

  // ---------- Helpers ----------
  const rand = (len) => randomString(len !== undefined ? len : userLen);

  const randomNumber = (max = 10000) => Math.floor(Math.random() * max);

  const randomPhone = () => "+91" + Math.floor(6000000000 + Math.random() * 3999999999);

  const randomEmail = () => `${rand()}@test.com`;

  const pick = (valid, invalid, edge) => {
    if (mode === "invalid") return invalid;
    if (mode === "edge") return edge;
    return valid;
  };

  // ---------- Schemas ----------

  if (schema === "basic") {
    return {
      name: pick("User_" + rand(), "", "A"),
      email: pick(randomEmail(), "invalid-email", "a@a.com"),
      phone: pick(randomPhone(), "123", "+919999999999999999")
    };
  }

  if (schema === "ecommerce") {
    return {
      userId: pick(rand(), null, ""),
      amount: pick(randomNumber(), -500, 0),
      items: [
        {
          name: "Item_" + rand(3),
          price: pick(100, -10, 0)
        }
      ]
    };
  }

  if (schema === "auth") {
    return {
      username: pick("user_" + rand(), "' OR 1=1 --", "u"),
      password: pick(rand() + "123", "<script>alert(1)</script>", "123")
    };
  }

  // ---------- NEW ADDITIONS ----------

  if (schema === "address") {
    return {
      name: "User_" + rand(),
      address: {
        street: pick("123 Main St", "", "A"),
        city: "Chennai",
        state: "Tamil Nadu",
        pincode: pick("600001", "abc", "9999999999"),
        country: "India"
      }
    };
  }

  if (schema === "order") {
    return {
      orderId: "ORD_" + rand(),
      userId: rand(),
      items: [
        { id: "item1", price: 100, qty: 2 },
        { id: "item2", price: 250, qty: 1 }
      ],
      totalAmount: pick(450, -100, 0),
      paymentMethod: "UPI",
      status: pick("PENDING", "UNKNOWN_STATUS", "")
    };
  }

  if (schema === "pagination") {
    return {
      page: pick(1, -1, 999999),
      limit: pick(10, 0, 1000),
      sortBy: "createdAt",
      order: pick("desc", "invalid", "")
    };
  }

  if (schema === "search") {
    return {
      query: pick("laptop", "", "a"),
      filters: {
        priceMin: pick(1000, -100, 0),
        priceMax: pick(50000, -1, 999999999),
        brand: ["Dell", "HP"]
      }
    };
  }

  if (schema === "file") {
    return {
      fileName: pick("data.xlsx", "data.exe", ""),
      fileSize: pick(1024000, 9999999999, 0),
      fileType: pick(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/unknown",
        ""
      )
    };
  }

  if (schema === "headers") {
    return {
      Authorization: pick(
        "Bearer " + rand(20),
        "",
        "Bearer"
      ),
      "Content-Type": pick("application/json", "text/plain", "")
    };
  }

  return { message: "Unknown schema selected" };
}

function generate() {
  const typeSelection = document.getElementById("type").value;
  const countVal = document.getElementById("count").value;
  const count = parseInt(countVal, 10);
  const lengthInput = document.getElementById("strLength");
  const userLen = lengthInput ? parseInt(lengthInput.value, 10) : 8;

  // Clear previous errors
  document.getElementById("countError").textContent = "";
  document.getElementById("lengthError").textContent = "";

  let hasError = false;

  if (isNaN(count) || count < 1 || count > 100) {
    document.getElementById("countError").textContent = "Count Must be 1-100";
    hasError = true;
  }

  if (!lengthInput.disabled && (isNaN(userLen) || userLen < 3 || userLen > 100)) {
    document.getElementById("lengthError").textContent = "Length Must be 3-100";
    hasError = true;
  }

  if (hasError) return;

  const [baseType, subType] = typeSelection.split(":");

  // 🔥 Track event (place it here — BEFORE generation logic)
  if (typeof gtag === "function") {
    gtag('event', 'generate_click', {
      event_category: 'engagement',
      event_label: baseType,   // email / phone / json
      value: count
    });
  }

  let result = [];

  for (let i = 0; i < count; i++) {
    if (baseType === "email") result.push(generateEmail(subType, userLen));
    if (baseType === "phone") result.push(generatePhone(subType));
    if (baseType === "json") result.push(generateJSON(subType, userLen));
  }

  document.getElementById("output").textContent =
    baseType === "json" ? JSON.stringify(result, null, 2) : result.join("\n");
}


function copyOutput(btn) {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text);

  // Store the original text
  const originalText = btn.textContent;

  // Change the button text
  btn.textContent = "Copied!";
  btn.disabled = true; // Optional: prevent double-clicks

  // Revert back after 1.5 seconds
  setTimeout(() => {
    btn.textContent = originalText;
    btn.disabled = false;
  }, 1500);
}

function clearOutput() {
  // Target the pre tag and empty its content
  document.getElementById("output").textContent = "";
}


async function submitFeedback() {
  const isAnon = document.getElementById("anonymous").checked;

  const name = isAnon ? "Anonymous" : document.getElementById("name").value || "Not provided";
  const email = isAnon ? "Anonymous" : document.getElementById("email").value || "Not provided";
  const messageBox = document.getElementById("message");
  const message = messageBox.value;

  if (!message) {
    alert("Please enter feedback");
    return;
  }

  const button = document.querySelector(".primary-btn");
  button.textContent = "Sending...";
  button.disabled = true;

  try {
    const res = await fetch("/api/sendFeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    if (res.ok) {
      messageBox.value = "";
      messageBox.placeholder = "✅ Feedback sent. Thanks!";

      // Auto close feedback section
      document.querySelector(".feedback").removeAttribute("open");
    } else {
      alert("Error sending feedback");
    }
  } catch (err) {
    alert("Network error. Try again.");
  }

  // Reset button
  button.textContent = "Send Feedback";
  button.disabled = false;

  // Reset placeholder after 3 sec
  setTimeout(() => {
    messageBox.placeholder = "Your feedback";
  }, 3000);
}

function toggleIdentity() {
  const isAnon = document.getElementById("anonymous").checked;
  document.getElementById("identityFields").style.display = isAnon ? "none" : "block";
}