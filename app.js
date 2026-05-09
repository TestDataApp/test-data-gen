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
      auth: {
        label: "Authentication",
        options: [
          { value: "json:auth_login", label: "Login Request" },
          { value: "json:auth_signup", label: "Signup Request" },
          { value: "json:auth_otp", label: "OTP Verification" },
          { value: "json:auth_token", label: "Token Refresh" },
          { value: "json:auth_invalid", label: "Invalid Credentials" }
        ]
      },
      user: {
        label: "User Management",
        options: [
          { value: "json:user_create", label: "Create User" },
          { value: "json:user_update", label: "Update Profile" },
          { value: "json:user_list", label: "User List" },
          { value: "json:user_role", label: "Role-based User" },
          { value: "json:user_invalid", label: "Invalid User Data" }
        ]
      },
      ecommerce: {
        label: "E-commerce",
        options: [
          { value: "json:eco_catalog", label: "Product Catalog" },
          { value: "json:eco_cart", label: "Cart" },
          { value: "json:eco_checkout", label: "Checkout" },
          { value: "json:eco_payment", label: "Payment" },
          { value: "json:eco_history", label: "Order History" }
        ]
      },
      api: {
        label: "API Testing",
        options: [
          { value: "json:api_pagination", label: "Pagination" },
          { value: "json:api_search", label: "Search/Filter" },
          { value: "json:api_sort", label: "Sorting" },
          { value: "json:api_bulk", label: "Bulk Request" },
          { value: "json:api_error", label: "Error Response" }
        ]
      },
      file: {
        label: "File Handling",
        options: [
          { value: "json:file_upload", label: "File Upload" },
          { value: "json:file_download", label: "File Download" },
          { value: "json:file_csv", label: "CSV/Excel Data" },
          { value: "json:file_large", label: "Large Payload" },
          { value: "json:file_invalid", label: "Invalid File" }
        ]
      },
      edge: {
        label: "Edge Cases",
        options: [
          { value: "json:edge_null", label: "Null Fields" },
          { value: "json:edge_max", label: "Max Length" },
          { value: "json:edge_special", label: "Special Characters" },
          { value: "json:edge_duplicate", label: "Duplicate Data" },
          { value: "json:edge_random", label: "Random Data" }
        ]
      },
      custom: {
        label: "Custom",
        options: [
          { value: "custom:schema", label: "Custom JSON Schema" }
        ]
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initDropdowns();
});

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.setAttribute("data-theme", "dark");
    updateThemeToggleUI("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    updateThemeToggleUI("light");
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeToggleUI(newTheme);
}

function updateThemeToggleUI(theme) {
  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    if (theme === "dark") {
      toggleBtn.innerHTML = "☀️";
    } else {
      toggleBtn.innerHTML = "🌙";
    }
  }
}

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
  
  const testTypeSelect = document.getElementById("testType");
  const complexitySelect = document.getElementById("complexity");

  if (customContainer) {
    customContainer.style.display = typeSelection.startsWith("custom:") ? "block" : "none";
  }

  if (testTypeSelect) {
    testTypeSelect.disabled = !typeSelection.startsWith("json:");
  }
  if (complexitySelect) {
    complexitySelect.disabled = !typeSelection.startsWith("json:");
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
      "gmail.com", "yahoo.com", "test.com", "hotmail.com", "yopmail.com",
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

function generateJSON(schema, userLen, index = 0) {
  const testType = document.getElementById("testType")?.value || "Valid";
  const complexity = document.getElementById("complexity")?.value || "Simple";

  const pools = {
    names: ["Arun", "Priya", "Rahul", "Sneha", "Karthik", "Divya", "Amit", "Neha", "Rohit", "Anjali"],
    emails: ["arun@test.com", "priya@test.com", "rahul@test.com", "sneha@test.com", "karthik@test.com", "divya@test.com", "amit@test.com", "neha@test.com", "rohit@test.com", "anjali@test.com"],
    passwords: ["Pass@123", "Priya#456", "Rahul$789", "Sneha%012", "Karthik^345", "Divya&678", "Amit*901", "Neha(234", "Rohit)567", "Anjali_890"],
    products: ["Laptop", "Mobile", "Tablet", "Mouse", "Keyboard", "Monitor", "Camera", "Watch", "Speaker", "Headphones"],
    roles: ["Admin", "User", "Manager", "Guest", "Support", "Editor", "Viewer", "Moderator", "Superadmin", "Analyst"],
    statuses: ["Active", "Inactive", "Pending", "Suspended", "Banned", "Deleted", "Archived", "Locked", "Approved", "Rejected"],
    companies: ["TechCorp", "InnovateX", "GlobalSys", "Nexus", "Pioneer", "Apex", "Zenith", "Quantum", "Stellar", "Vanguard"],
    ids: ["U101", "U102", "U103", "U104", "U105", "U106", "U107", "U108", "U109", "U110"],
    paymentMethods: ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallet", "PayPal", "Stripe", "Cash", "Crypto", "Bank Transfer"],
    fileNames: ["report.pdf", "data.csv", "image.png", "doc.docx", "sheet.xlsx", "archive.zip", "video.mp4", "audio.mp3", "script.js", "style.css"]
  };

  const getPool = (poolName) => pools[poolName][index % pools[poolName].length];

  const getVal = (valid, invalid, edge) => {
    if (testType === "Invalid") return invalid !== undefined ? invalid : "invalid";
    if (testType === "Edge") return edge !== undefined ? edge : null;
    return valid;
  };

  const getComplex = (simple, medium, complex) => {
    if (complexity === "Complex") return complex !== undefined ? complex : medium;
    if (complexity === "Medium") return medium !== undefined ? medium : simple;
    return simple;
  };

  // 1. Authentication
  if (schema === "auth_login") {
    const base = {
      email: getVal(getPool("emails"), "wrong-format", null),
      password: getVal(getPool("passwords"), "", "A".repeat(100))
    };
    return getComplex(base, { user: base, timestamp: "2026-05-02T10:00:00Z" }, { loginRequest: { user: base, metadata: { ip: "192.168.1.1", device: "Desktop", attempts: getVal(1, -1, 999) } } });
  }
  if (schema === "auth_signup") {
    const base = {
      name: getVal(getPool("names"), 1234, ""),
      email: getVal(getPool("emails"), "wrong-format", null),
      password: getVal(getPool("passwords"), "123", "A".repeat(100)),
      confirmPassword: getVal(getPool("passwords"), "mismatch", "A".repeat(100))
    };
    return getComplex(base, { user: base, role: getVal(getPool("roles"), 99, null) }, { signupRequest: { user: base, preferences: { newsletter: getVal(true, "yes", null) } } });
  }
  if (schema === "auth_otp") {
    const base = {
      phone: getVal("+1234567890", "phone", "+9999999999999999"),
      otp: getVal("123456", "abc", "000000")
    };
    return getComplex(base, { verification: base }, { otpRequest: { data: base, method: getVal("SMS", "Pigeon", null) } });
  }
  if (schema === "auth_token") {
    const base = {
      refreshToken: getVal("dGhpcy1pcy1hLXJlZnJlc2gtdG9rZW4=", "invalid", null),
      grantType: getVal("refresh_token", "wrong_grant", "")
    };
    return getComplex(base, { tokenRequest: base }, { refreshPayload: { data: base, client: { id: "client_123" } } });
  }
  if (schema === "auth_invalid") {
    const base = {
      username: getVal(getPool("emails"), "1=1", null),
      password: getVal("WrongPass", "", "A".repeat(200))
    };
    return getComplex(base, { errorTest: base }, { attackPayload: { credentials: base, injection: getVal(false, true, null) } });
  }

  // 2. User Management
  if (schema === "user_create") {
    const base = {
      firstName: getVal(getPool("names"), 123, ""),
      email: getVal(getPool("emails"), "no-at-sign", null),
      department: getVal("Engineering", "Not-A-Dept", null)
    };
    return getComplex(base, { newUser: base, role: getPool("roles") }, { userCreation: { profile: base, settings: { timezone: "UTC" } } });
  }
  if (schema === "user_update") {
    const base = {
      id: getVal(getPool("ids"), "NaN", null),
      status: getVal(getPool("statuses"), "Unknown", null)
    };
    return getComplex(base, { updateData: base, modifiedBy: getPool("names") }, { userUpdate: { target: base, audit: { reason: "User Request" } } });
  }
  if (schema === "user_list") {
    const base = {
      users: [getPool("names"), "User2"],
      count: getVal(2, "two", -1)
    };
    return getComplex(base, { data: base, page: 1 }, { userListResponse: { results: base, pagination: { total: 100, current: 1 } } });
  }
  if (schema === "user_role") {
    const base = {
      userId: getVal(getPool("ids"), "none", null),
      newRole: getVal(getPool("roles"), "SuperGod", null)
    };
    return getComplex(base, { roleAssignment: base }, { roleUpdateEvent: { payload: base, adminId: "A101" } });
  }
  if (schema === "user_invalid") {
    const base = {
      invalidName: getVal("TestUser", 12345, null),
      badEmail: getVal("test@test.com", "test.com", "")
    };
    return getComplex(base, { brokenData: base }, { negativeTestPayload: { data: base, expectedError: "ValidationError" } });
  }

  // 3. E-commerce
  if (schema === "eco_catalog") {
    const base = {
      productId: getVal(getPool("ids"), "NaN", null),
      productName: getVal(getPool("products"), "", "A".repeat(200)),
      price: getVal(99.99, "free", -50)
    };
    return getComplex(base, { catalogItem: base, stock: getVal(10, "none", -1) }, { productEntry: { item: base, metadata: { tags: ["sale", "new"] } } });
  }
  if (schema === "eco_cart") {
    const base = {
      cartId: getVal("C100", "invalid", null),
      itemId: getVal(getPool("ids"), "none", null),
      qty: getVal(2, "two", -10)
    };
    return getComplex(base, { cart: base, subtotal: 199.98 }, { shoppingCart: { details: base, session: { active: true } } });
  }
  if (schema === "eco_checkout") {
    const base = {
      cartId: getVal("C100", "invalid", null),
      shippingCode: getVal("12345", "abc", null)
    };
    return getComplex(base, { checkoutPayload: base, address: "123 Main St" }, { checkoutProcess: { orderDetails: base, billing: { sameAsShipping: true } } });
  }
  if (schema === "eco_payment") {
    const base = {
      orderId: getVal("O500", "none", null),
      method: getVal(getPool("paymentMethods"), "Barter", null),
      amount: getVal(250.00, "lot", -100)
    };
    return getComplex(base, { paymentInfo: base, currency: "USD" }, { transaction: { data: base, gateway: { provider: "Stripe", status: "Init" } } });
  }
  if (schema === "eco_history") {
    const base = {
      userId: getVal(getPool("ids"), "NaN", null),
      ordersFound: getVal(5, "five", -1)
    };
    return getComplex(base, { history: base, lastOrder: "O499" }, { orderHistoryResponse: { summary: base, orders: [{ id: "O499", total: 100 }] } });
  }

  // 4. API Testing
  if (schema === "api_pagination") {
    const base = {
      page: getVal(1, "one", -1),
      limit: getVal(10, "ten", 1000000)
    };
    return getComplex(base, { pagination: base, totalPages: 5 }, { apiPagination: { params: base, links: { next: "/api?page=2" } } });
  }
  if (schema === "api_search") {
    const base = {
      query: getVal(getPool("products"), 123, "A".repeat(500)),
      filterCategory: getVal("Electronics", 1, null)
    };
    return getComplex(base, { searchRequest: base, exactMatch: false }, { searchPayload: { criteria: base, options: { fuzzy: true } } });
  }
  if (schema === "api_sort") {
    const base = {
      sortBy: getVal("createdAt", "invalidField", null),
      order: getVal("asc", "diagonal", "")
    };
    return getComplex(base, { sorting: base }, { sortRequest: { params: base, multiSort: [base] } });
  }
  if (schema === "api_bulk") {
    const base = {
      operations: getVal(["op1", "op2"], "string", null)
    };
    return getComplex(base, { bulkRequest: base, stopOnError: true }, { batchProcess: { jobs: base, config: { retries: 3 } } });
  }
  if (schema === "api_error") {
    const base = {
      errorCode: getVal(404, "four-oh-four", -1),
      message: getVal("Not Found", 123, null)
    };
    return getComplex(base, { errorResponse: base, timestamp: "2026-05-02T10:00:00Z" }, { errorDetails: { error: base, traceId: "trace_789" } });
  }

  // 5. File Handling
  if (schema === "file_upload") {
    const base = {
      fileName: getVal(getPool("fileNames"), "no-ext", "A".repeat(255)),
      fileSize: getVal(1024, "large", -1)
    };
    return getComplex(base, { uploadMetadata: base, type: "application/pdf" }, { fileSubmission: { metadata: base, content: { base64: "JVBERi0..." } } });
  }
  if (schema === "file_download") {
    const base = {
      fileId: getVal("F100", "NaN", null),
      expiry: getVal(3600, "soon", -10)
    };
    return getComplex(base, { downloadRequest: base }, { downloadLink: { params: base, url: "https://dl.example.com/F100" } });
  }
  if (schema === "file_csv") {
    const base = {
      csvData: getVal("id,name\n1,Arun", 123, null),
      rows: getVal(2, "two", -1)
    };
    return getComplex(base, { csvPayload: base }, { spreadsheetImport: { data: base, mapping: { col1: "id" } } });
  }
  if (schema === "file_large") {
    const base = {
      payloadChunk: getVal("A".repeat(100), 123, null),
      chunkId: getVal(1, "one", -1)
    };
    return getComplex(base, { largeData: base, totalChunks: 10 }, { multipartUpload: { chunk: base, checksum: "hash" } });
  }
  if (schema === "file_invalid") {
    const base = {
      fileType: getVal("application/exe", 123, null),
      virusScan: getVal("Failed", true, null)
    };
    return getComplex(base, { rejectedFile: base }, { securityEvent: { fileInfo: base, action: "Quarantine" } });
  }

  // 6. Edge Cases
  if (schema === "edge_null") {
    const base = {
      fieldA: null,
      fieldB: null
    };
    return getComplex(base, { nullData: base }, { emptyPayload: { data: base, valid: false } });
  }
  if (schema === "edge_max") {
    const base = {
      hugeString: getVal("A".repeat(500), 123, null),
      hugeNumber: getVal(999999999999, "NaN", null)
    };
    return getComplex(base, { maxBounds: base }, { overflowTest: { values: base } });
  }
  if (schema === "edge_special") {
    const base = {
      symbols: getVal("!@#$%^&*()_+{}|:<>?", 123, null),
      emoji: getVal("😀🚀🔥", "smile", null)
    };
    return getComplex(base, { charTest: base }, { encodingPayload: { chars: base, format: "UTF-8" } });
  }
  if (schema === "edge_duplicate") {
    const base = {
      id: getVal(100, "NaN", null),
      ID: getVal(200, "NaN", null)
    };
    return getComplex(base, { dupKeys: base }, { conflictTest: { fields: base, resolver: "overwrite" } });
  }
  if (schema === "edge_random") {
    const base = {
      rand1: getVal(Math.random(), "NaN", null),
      rand2: getVal(getPool("names"), 123, null)
    };
    return getComplex(base, { chaosData: base }, { entropyTest: { randomVals: base } });
  }

  // Fallback for custom logic based on old schemas
  return {
    id: getVal(getPool("ids"), "invalid-id", null),
    name: getVal(getPool("names"), "1234", ""),
    email: getVal(getPool("emails"), "wrong-format", null)
  };
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
    else if (baseType === "json") result.push(generateJSON(subType, userLen, i));
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

document.addEventListener("click", function (event) {
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
          if (typeof item === 'object' && item !== null) {
            Object.keys(item).forEach(k => headers.add(k));
          }
        });
        const headerArr = Array.from(headers);

        let csv = headerArr.join(",") + "\n";
        data.forEach(item => {
          if (typeof item === 'object' && item !== null) {
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
    } catch (e) {
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