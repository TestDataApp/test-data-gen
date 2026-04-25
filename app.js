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

  // ---------- Realistic Data Arrays ----------
  const firstNames = ["Aarav", "Vihaan", "Aditya", "Sai", "Arjun", "Zara", "Diya", "Aisha", "Neha", "Kavya", "John", "Emma", "Michael", "Sarah"];
  const lastNames = ["Sharma", "Patel", "Singh", "Kumar", "Gupta", "Smith", "Johnson", "Williams", "Brown", "Jones"];
  const cities = ["Chennai", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "New York", "London", "San Francisco", "Austin"];
  const states = ["Tamil Nadu", "Karnataka", "Maharashtra", "Delhi", "Telangana", "New York", "California", "Texas"];
  const streets = ["123 Main St", "456 Oak Ave", "789 Pine Ln", "101 Maple Dr", "202 Elm St", "303 Cedar Blvd"];
  const products = ["Laptop", "Smartphone", "Wireless Mouse", "Keyboard", "Headphones", "Monitor", "Smartwatch"];
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "company.co"];

  // ---------- Helpers ----------
  const rand = (len) => randomString(len !== undefined ? len : userLen);
  const randomNumber = (max = 10000) => Math.floor(Math.random() * max);
  const randomPhone = () => "+91" + Math.floor(6000000000 + Math.random() * 3999999999);
  const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomEmail = () => `${rand()}@${pickRandom(domains)}`;

  const pick = (valid, invalid, edge) => {
    if (mode === "invalid") return invalid;
    if (mode === "edge") return edge;
    return valid;
  };

  // ---------- Schemas ----------

  if (schema === "basic") {
    return {
      name: pick(`${pickRandom(firstNames)} ${pickRandom(lastNames)}`, "", "A"),
      email: pick(randomEmail(), "invalid-email", "a@a.com"),
      phone: pick(randomPhone(), "123", "+919999999999999999")
    };
  }

  if (schema === "ecommerce") {
    return {
      userId: pick("USR_" + rand(), null, ""),
      amount: pick(pickRandom([99, 149, 299, 499, 999]), -500, 0),
      items: [
        {
          name: pickRandom(products),
          price: pickRandom([49, 99, 199])
        }
      ]
    };
  }

  if (schema === "auth") {
    return {
      username: pick(`${pickRandom(firstNames).toLowerCase()}_${rand(4)}`, "' OR 1=1 --", "u"),
      password: pick(rand() + "123!", "<script>alert(1)</script>", "123")
    };
  }

  if (schema === "address") {
    return {
      name: pick(`${pickRandom(firstNames)} ${pickRandom(lastNames)}`, "", "A"),
      address: {
        street: pick(pickRandom(streets), "", "A"),
        city: pickRandom(cities),
        state: pickRandom(states),
        pincode: pick(Math.floor(100000 + Math.random() * 900000).toString(), "abc", "9999999999"),
        country: pickRandom(["India", "USA", "UK"])
      }
    };
  }

  if (schema === "order") {
    return {
      orderId: "ORD_" + rand(),
      userId: "USR_" + rand(),
      items: [
        { id: "item_" + rand(4), price: pickRandom([50, 100, 200]), qty: pickRandom([1, 2, 3, 4]) },
        { id: "item_" + rand(4), price: pickRandom([250, 500, 750]), qty: pickRandom([1, 2]) }
      ],
      totalAmount: pick(pickRandom([300, 600, 950]), -100, 0),
      paymentMethod: pickRandom(["UPI", "Credit Card", "PayPal", "Debit Card"]),
      status: pick(pickRandom(["PENDING", "COMPLETED", "SHIPPED", "DELIVERED"]), "UNKNOWN_STATUS", "")
    };
  }

  if (schema === "pagination") {
    return {
      page: pick(pickRandom([1, 2, 3, 4, 5]), -1, 999999),
      limit: pick(pickRandom([10, 20, 50, 100]), 0, 1000),
      sortBy: pickRandom(["createdAt", "updatedAt", "name", "price"]),
      order: pick(pickRandom(["asc", "desc"]), "invalid", "")
    };
  }

  if (schema === "search") {
    return {
      query: pick(pickRandom(products).toLowerCase(), "", "a"),
      filters: {
        priceMin: pick(pickRandom([0, 100, 500]), -100, 0),
        priceMax: pick(pickRandom([1000, 5000, 10000]), -1, 999999999),
        brand: pickRandom([["Dell", "HP"], ["Apple", "Samsung"], ["Sony", "LG"]])
      }
    };
  }

  if (schema === "file") {
    return {
      fileName: pick(`data_${rand(4)}.xlsx`, "data.exe", ""),
      fileSize: pick(pickRandom([1024, 20480, 1024000, 5000000]), 9999999999, 0),
      fileType: pick(
        pickRandom(["application/json", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]),
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
      "Content-Type": pick(pickRandom(["application/json", "text/plain", "application/xml"]), "", "")
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