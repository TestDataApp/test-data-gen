const structure = {
  email: {
    label: "Email",
    categories: {
      all: {
        label: "Domains",
        options: [
          { value: "email:random", label: "Random Domain" },
          { value: "email:yopmail.com", label: "yopmail.com" },
          { value: "email:gmail.com", label: "gmail.com" },
          { value: "email:yahoo.com", label: "yahoo.com" },
          { value: "email:multi-part-domain.co.uk", label: "multi-part-domain.co.uk" },
          { value: "email:test.com", label: "test.com" },
          { value: "email:verylongdomainnameexample.com", label: "Very Long Domain" },
          { value: "email:outlook.com", label: "outlook.com" },
          { value: "email:enterprise.org", label: "enterprise.org" },
          { value: "email:startup.io", label: "startup.io" },
          { value: "email:hotmail.com", label: "hotmail.com" }
        ]
      }
    }
  },
  phone: {
    label: "Phone",
    categories: {
      all: {
        label: "Regions",
        options: [
          { value: "phone:+91", label: "India (+91)" },
          { value: "phone:+1", label: "USA (+1)" },
          { value: "phone:+44", label: "UK (+44)" }
        ]
      }
    }
  },
  json: {
    label: "JSON",
    categories: {
      basic: {
        label: "Basic",
        options: [
          { value: "json:basic", label: "Basic User" },
          { value: "json:auth", label: "Auth Payload" }
        ]
      },
      ecommerce: {
        label: "E-commerce",
        options: [
          { value: "json:ecommerce", label: "Simple Cart" },
          { value: "json:order", label: "Order / Checkout" }
        ]
      },
      userdata: {
        label: "User Data",
        options: [
          { value: "json:address", label: "User with Address" }
        ]
      },
      api: {
        label: "API Testing",
        options: [
          { value: "json:pagination", label: "Pagination" },
          { value: "json:search", label: "Search / Filter" }
        ]
      },
      file: {
        label: "File Testing",
        options: [
          { value: "json:file", label: "File Metadata" }
        ]
      },
      headers: {
        label: "Headers",
        options: [
          { value: "json:headers", label: "Auth Headers" }
        ]
      }
    }
  },
  custom: {
    label: "Custom",
    categories: {
      builder: {
        label: "Schema Builder",
        options: [
          { value: "custom:schema", label: "Custom JSON Schema" }
        ]
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initDropdowns();
});

function initDropdowns() {
  const mainTypeSelect = document.getElementById("mainType");
  mainTypeSelect.innerHTML = "";
  for (const [key, val] of Object.entries(structure)) {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = val.label;
    mainTypeSelect.appendChild(opt);
  }
  
  handleMainTypeChange();
}

function handleMainTypeChange() {
  const mainTypeVal = document.getElementById("mainType").value;
  const subCategorySelect = document.getElementById("subCategory");
  subCategorySelect.innerHTML = "";
  
  const categories = structure[mainTypeVal].categories;
  for (const [key, val] of Object.entries(categories)) {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = val.label;
    subCategorySelect.appendChild(opt);
  }

  handleSubCategoryChange();
}

function handleSubCategoryChange() {
  const mainTypeVal = document.getElementById("mainType").value;
  const subCategoryVal = document.getElementById("subCategory").value;
  const typeSelect = document.getElementById("type");
  typeSelect.innerHTML = "";

  const options = structure[mainTypeVal].categories[subCategoryVal].options;
  for (const option of options) {
    const opt = document.createElement("option");
    opt.value = option.value;
    opt.textContent = option.label;
    typeSelect.appendChild(opt);
  }

  handleTypeChange();
}

function handleTypeChange() {
  const typeSelection = document.getElementById("type").value;
  const lengthInput = document.getElementById("strLength");
  const lengthLabel = document.getElementById("lengthLabel");
  const customContainer = document.getElementById("customSchemaContainer");
  
  if (customContainer) {
    customContainer.style.display = typeSelection.startsWith("custom:") ? "block" : "none";
  }

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
      "gmail.com", "yahoo.com", "test.com", "hotmail.com","yopmail.com",
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
  const streets = ["123 Main St", "456 Oak Ave", "789 Pine Ln", "101 Maple Dr", "202 Elm St", "303 Cedar Blvd"];
  const products = ["Laptop", "Smartphone", "Wireless Mouse", "Keyboard", "Headphones", "Monitor", "Smartwatch"];
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "company.co"];

  // ---------- Geo Data ----------
  const geoData = {
    India: {
      states: {
        Maharashtra: {
          cities: ["Mumbai", "Pune", "Nagpur"],
          pincodes: ["400001", "411001", "440001"]
        },
        Karnataka: {
          cities: ["Bangalore", "Mysore", "Hubli"],
          pincodes: ["560001", "570001", "580001"]
        },
        Delhi: {
          cities: ["New Delhi", "Dwarka"],
          pincodes: ["110001", "110075"]
        },
        "Tamil Nadu": {
          cities: ["Chennai", "Coimbatore", "Madurai"],
          pincodes: ["600001", "641001", "625001"]
        },
      Telangana: {
        cities: ["Hyderabad", "Warangal", "Nizamabad"],
        pincodes: ["500001", "506001", "503001"]
      }
      }
    },
    USA: {
      states: {
        California: {
          cities: ["Los Angeles", "San Francisco", "San Diego"],
          pincodes: ["90001", "94101", "92101"]
        },
        "New York": {
          cities: ["New York City", "Buffalo", "Rochester"],
          pincodes: ["10001", "14201", "14601"]
        },
        Texas: {
          cities: ["Houston", "Austin", "Dallas"],
          pincodes: ["77001", "73301", "75201"]
        },
        Florida: {
        cities: ["Miami", "Orlando", "Tampa"],
          pincodes: ["33101", "32801", "33601"]
      },
        Illinois: {
          cities: ["Chicago", "Springfield", "Naperville"],
          pincodes: ["60601", "62701", "60540"]
        }
      }
    },
    UK: {
      states: {
        England: {
          cities: ["London", "Manchester", "Birmingham"],
          pincodes: ["EC1A 1BB", "M1 1AE", "B1 1AA"]
        },
        Scotland: {
          cities: ["Edinburgh", "Glasgow", "Aberdeen"],
          pincodes: ["EH1 1AA", "G1 1AA", "AB10 1AA"]
        },
        Wales: {
          cities: ["Cardiff", "Swansea", "Newport"],
          pincodes: ["CF10 1AA", "SA1 1AA", "NP10 1AA"]
      },
        "Northern Ireland": {
          cities: ["Belfast", "Derry", "Lisburn"],
          pincodes: ["BT1 1AA", "BT48 6AA", "BT28 1AA"]
        }
      }
    }
  };

  // ---------- Helpers ----------
  const rand = (len) => randomString(len !== undefined ? len : userLen);
  const randomNumber = (max = 10000) => Math.floor(Math.random() * max);
  const randomPhone = () => "+91" + Math.floor(6000000000 + Math.random() * 3999999999);
  const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomEmail = () => `${rand()}@${pickRandom(domains)}`;

  const generateGeoAddress = () => {
    const country = pickRandom(Object.keys(geoData));
    const state = pickRandom(Object.keys(geoData[country].states));
    const stateData = geoData[country].states[state];
    return {
      country,
      state,
      city: pickRandom(stateData.cities),
      pincode: pickRandom(stateData.pincodes)
    };
  };

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
    const geo = generateGeoAddress();
    return {
      name: pick(`${pickRandom(firstNames)} ${pickRandom(lastNames)}`, "", "A"),
      address: {
        street: pick(pickRandom(streets), "", "A"),
        city: geo.city,
        state: geo.state,
        pincode: pick(geo.pincode, "abc", "9999999999"),
        country: geo.country
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

function generateCustomFromSchema(schema) {
  if (typeof schema === 'string') {
    const type = schema.toLowerCase();
    if (type === 'string') return randomString(10);
    if (type === 'number') return Math.floor(Math.random() * 1000);
    if (type === 'boolean') return Math.random() > 0.5;
    if (type === 'email') return randomString(8) + "@example.com";
    if (type === 'phone') return "+1" + Math.floor(2000000000 + Math.random() * 7999999999);
    if (type === 'date') return new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString();
    return schema; // default fallback if unrecognized
  }
  
  if (Array.isArray(schema)) {
    const result = [];
    if (schema.length > 0) {
      const numItems = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < numItems; i++) {
        result.push(generateCustomFromSchema(schema[0]));
      }
    }
    return result;
  }
  
  if (typeof schema === 'object' && schema !== null) {
    const result = {};
    for (const key in schema) {
      result[key] = generateCustomFromSchema(schema[key]);
    }
    return result;
  }
  
  return schema;
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

  if (isNaN(count) || count < 1 || count > 10000) {
    document.getElementById("countError").textContent = "Count Must be 1-10,000";
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
  let parsedSchema = null;

  if (baseType === "custom") {
    const schemaText = document.getElementById("customSchemaInput").value;
    try {
      parsedSchema = JSON.parse(schemaText);
      const schemaErrorEl = document.getElementById("schemaError");
      if (schemaErrorEl) schemaErrorEl.textContent = "";
    } catch (e) {
      const schemaErrorEl = document.getElementById("schemaError");
      if (schemaErrorEl) schemaErrorEl.textContent = "Invalid JSON schema";
      return;
    }
  }

  for (let i = 0; i < count; i++) {
    if (baseType === "email") result.push(generateEmail(subType, userLen));
    else if (baseType === "phone") result.push(generatePhone(subType));
    else if (baseType === "json") result.push(generateJSON(subType, userLen));
    else if (baseType === "custom") result.push(generateCustomFromSchema(parsedSchema));
  }

  document.getElementById("output").textContent =
    (baseType === "json" || baseType === "custom") ? JSON.stringify(result, null, 2) : result.join("\n");
  
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.disabled = false;
  }
}


function toggleDownloadMenu() {
  const menu = document.getElementById("downloadMenu");
  if (menu) {
    menu.style.display = menu.style.display === "none" ? "block" : "none";
  }
}

document.addEventListener("click", function(event) {
  const menu = document.getElementById("downloadMenu");
  const downloadBtn = event.target.closest('button[onclick="toggleDownloadMenu()"]');
  if (menu && menu.style.display === "block" && !downloadBtn) {
    menu.style.display = "none";
  }
});

function downloadFile(format) {
  const outputText = document.getElementById("output").textContent;
  if (!outputText) return;
  
  let content = outputText;
  let type = "text/plain";
  let extension = "txt";

  if (format === 'json') {
    type = "application/json";
    extension = "json";
  } else if (format === 'csv') {
    type = "text/csv";
    extension = "csv";
    
    try {
      const data = JSON.parse(outputText);
      if (Array.isArray(data) && data.length > 0) {
        const headers = new Set();
        data.forEach(item => {
           if(typeof item === 'object' && item !== null) {
             Object.keys(item).forEach(k => headers.add(k));
           }
        });
        const headerArr = Array.from(headers);
        
        let csv = headerArr.join(",") + "\n";
        data.forEach(item => {
           if(typeof item === 'object' && item !== null) {
             const row = headerArr.map(header => {
                let val = item[header];
                if (typeof val === 'object') val = JSON.stringify(val);
                if (val === null || val === undefined) val = "";
                val = String(val).replace(/"/g, '""');
                if (val.includes(",") || val.includes("\n") || val.includes('"')) {
                  val = `"${val}"`;
                }
                return val;
             });
             csv += row.join(",") + "\n";
           } else {
             csv += item + "\n";
           }
        });
        content = csv;
      } else if (Array.isArray(data)) {
        content = data.join("\n");
      }
    } catch(e) {
      content = outputText.split("\n").map(line => {
        let val = line.replace(/"/g, '""');
        if (val.includes(",") || val.includes("\n") || val.includes('"')) {
           return `"${val}"`;
        }
        return val;
      }).join("\n");
    }
  }

  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19);
  
  a.download = `test-data-${timestamp}.${extension}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function copyOutput(btn) {
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.textContent;
    btn.textContent = "Copied ✅";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
    }, 1500);
  });
}

function clearOutput() {
  // Target the pre tag and empty its content
  document.getElementById("output").textContent = "";
  
  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.disabled = true;
  }
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