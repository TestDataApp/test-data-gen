const structure = {
  identity: {
    label: "👤 Identity",
    categories: {
      names: {
        label: "Names & Personas",
        options: [
          { value: "identity:full_name", label: "Full Name" },
          { value: "identity:first_name", label: "First Name" },
          { value: "identity:last_name", label: "Last Name" },
          { value: "identity:title", label: "Job Title" },
          { value: "identity:gender", label: "Gender" }
        ]
      },
      contact: {
        label: "Contact Info",
        options: [
          { value: "identity:email", label: "Email Address" },
          { value: "identity:phone", label: "Phone Number" },
          { value: "identity:username", label: "Username" }
        ]
      }
    }
  },
  geography: {
    label: "📍 Geography",
    categories: {
      address: {
        label: "Global Address",
        options: [
          { value: "geography:full_address", label: "Full Address" },
          { value: "geography:city", label: "City" },
          { value: "geography:country", label: "Country" },
          { value: "geography:zip", label: "Zip/Postal Code" }
        ]
      }
    }
  },
  finance: {
    label: "💳 Finance",
    categories: {
      banking: {
        label: "Banking & Payment",
        options: [
          { value: "finance:cc_number", label: "Credit Card Number" },
          { value: "finance:iban", label: "IBAN" },
          { value: "finance:currency", label: "Currency Code" },
          { value: "finance:amount", label: "Transaction Amount" }
        ]
      }
    }
  },
  internet: {
    label: "🌐 Internet",
    categories: {
      tech: {
        label: "Technical Identifiers",
        options: [
          { value: "internet:uuid", label: "UUID (v4)" },
          { value: "internet:ipv4", label: "IPv4 Address" },
          { value: "internet:ipv6", label: "IPv6 Address" },
          { value: "internet:mac", label: "MAC Address" }
        ]
      }
    }
  },
  content: {
    label: "📄 Content",
    categories: {
      text: {
        label: "Lorem Ipsum",
        options: [
          { value: "content:sentence", label: "Random Sentence" },
          { value: "content:paragraph", label: "Random Paragraph" },
          { value: "content:word", label: "Random Word" }
        ]
      }
    }
  },
  json: {
    label: "📦 JSON Templates",
    categories: {
      auth: {
        label: "Authentication",
        options: [
          { value: "json:auth_login", label: "Login Request" },
          { value: "json:auth_signup", label: "Signup Request" }
        ]
      },
      ecommerce: {
        label: "E-commerce",
        options: [
          { value: "json:eco_checkout", label: "Checkout Payload" },
          { value: "json:eco_catalog", label: "Product Catalog" }
        ]
      },
      custom: {
        label: "Custom Builder",
        options: [
          { value: "custom:schema", label: "Custom JSON Schema" }
        ]
      }
    }
  }
};

// Global State
let currentBatch = [];
let activeTab = 'json';

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initDropdowns();
  initSavedSchemas();
});

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggleUI(savedTheme);
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
  if (toggleBtn) toggleBtn.innerHTML = theme === "dark" ? "☀️" : "🌙";
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
  const lengthGroup = document.getElementById("lengthGroup");
  const lengthInput = document.getElementById("strLength");
  const lengthLabel = document.getElementById("lengthLabel");
  const customContainer = document.getElementById("customSchemaContainer");

  customContainer.style.display = typeSelection.startsWith("custom:") ? "block" : "none";

  if (typeSelection.includes("email") || typeSelection.includes("password") || typeSelection.includes("username")) {
    lengthGroup.style.display = "flex";
    lengthLabel.textContent = "Length";
  } else {
    lengthGroup.style.display = "none";
  }
}

// --- Data Pools ---
const pools = {
  firstNames: ["Arun", "Priya", "Rahul", "Sneha", "Karthik", "Divya", "Amit", "Neha", "Rohit", "Anjali", "James", "Emma", "Liam", "Olivia", "Noah", "Ava"],
  lastNames: ["Kumar", "Sharma", "Singh", "Patel", "Reddy", "Nair", "Das", "Gupta", "Smith", "Johnson", "Williams", "Brown", "Jones"],
  cities: ["Mumbai", "Delhi", "Bangalore", "New York", "London", "Tokyo", "Berlin", "Paris", "Sydney", "Dubai"],
  countries: ["India", "USA", "UK", "Japan", "Germany", "France", "Australia", "UAE", "Canada", "Singapore"],
  titles: ["Engineer", "Designer", "Manager", "Analyst", "Director", "Architect", "Lead", "Associate"],
  genders: ["Male", "Female", "Non-binary", "Prefer not to say"],
  paymentMethods: ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallet", "PayPal"],
  currencies: ["USD", "EUR", "GBP", "INR", "JPY", "CAD", "AUD"],
  lorem: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Ut enim ad minim veniam, quis nostrud exercitation ullamco.", "Duis aute irure dolor in reprehenderit in voluptate velit esse.", "Excepteur sint occaecat cupidatat non proident, sunt in culpa."]
};

// --- Generators ---
function getRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateItem(type, index) {
  const [category, subType] = type.split(":");
  const len = parseInt(document.getElementById("strLength").value) || 8;

  switch (category) {
    case "identity":
      if (subType === "full_name") return `${getRandom(pools.firstNames)} ${getRandom(pools.lastNames)}`;
      if (subType === "first_name") return getRandom(pools.firstNames);
      if (subType === "last_name") return getRandom(pools.lastNames);
      if (subType === "title") return getRandom(pools.titles);
      if (subType === "gender") return getRandom(pools.genders);
      if (subType === "email") return `${getRandom(pools.firstNames).toLowerCase()}.${getRandom(pools.lastNames).toLowerCase()}${index}@test.com`;
      if (subType === "phone") return `+${Math.floor(Math.random() * 99) + 1} ${Math.floor(Math.random() * 9000000000) + 1000000000}`;
      if (subType === "username") return getRandom(pools.firstNames).toLowerCase() + index;
      break;
    case "geography":
      if (subType === "full_address") return `${Math.floor(Math.random() * 999) + 1} ${getRandom(pools.cities)}, ${getRandom(pools.countries)}`;
      if (subType === "city") return getRandom(pools.cities);
      if (subType === "country") return getRandom(pools.countries);
      if (subType === "zip") return Math.floor(Math.random() * 900000) + 100000;
      break;
    case "finance":
      if (subType === "cc_number") return `4532 ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000} ${Math.floor(Math.random() * 9000) + 1000}`;
      if (subType === "iban") return `GB${Math.floor(Math.random() * 90) + 10} BANK ${Math.floor(Math.random() * 900000) + 100000} ${Math.floor(Math.random() * 90000000) + 10000000}`;
      if (subType === "currency") return getRandom(pools.currencies);
      if (subType === "amount") return (Math.random() * 10000).toFixed(2);
      break;
    case "internet":
      if (subType === "uuid") return crypto.randomUUID();
      if (subType === "ipv4") return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
      if (subType === "mac") return "XX:XX:XX:XX:XX:XX".replace(/X/g, () => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]);
      break;
    case "content":
      if (subType === "sentence") return getRandom(pools.lorem);
      if (subType === "paragraph") return pools.lorem.join(" ");
      if (subType === "word") return getRandom(pools.lorem).split(" ")[0];
      break;
    case "json":
      return generateJSONTemplate(subType, index);
    default:
      return "N/A";
  }
}

function generateJSONTemplate(schema, index) {
  // Simplified version of the previous complex JSON generator
  if (schema === "auth_login") return { email: `user${index}@test.com`, password: "••••••••" };
  if (schema === "auth_signup") return { id: index + 1, name: `${getRandom(pools.firstNames)}`, email: `user${index}@test.com` };
  if (schema === "eco_checkout") return { orderId: `ORD-${1000 + index}`, total: (Math.random() * 500).toFixed(2), items: Math.floor(Math.random() * 5) + 1 };
  return { id: index, data: "test" };
}

function generateCustomFromSchema(schema, index) {
  if (typeof schema === 'string') {
    const type = schema.toLowerCase();
    if (type === 'uuid') return crypto.randomUUID();
    if (type === 'full_name') return `${getRandom(pools.firstNames)} ${getRandom(pools.lastNames)}`;
    if (type === 'email') return `user${index}@test.com`;
    if (type === 'address') return `${Math.floor(Math.random() * 999)} ${getRandom(pools.cities)}`;
    if (type === 'string') return Math.random().toString(36).substring(7);
    if (type === 'number') return Math.floor(Math.random() * 1000);
    if (type === 'boolean') return Math.random() > 0.5;
    return schema;
  }
  if (Array.isArray(schema)) return [generateCustomFromSchema(schema[0], index)];
  if (typeof schema === 'object' && schema !== null) {
    const res = {};
    for (const k in schema) res[k] = generateCustomFromSchema(schema[k], index);
    return res;
  }
  return schema;
}

// --- Main Flow ---
function generate() {
  const count = parseInt(document.getElementById("count").value) || 5;
  const typeSelection = document.getElementById("type").value;
  const [baseType] = typeSelection.split(":");
  
  if (count > 10000) {
    document.getElementById("countError").textContent = "Max count is 10,000";
    return;
  }
  document.getElementById("countError").textContent = "";

  currentBatch = [];
  let parsedSchema = null;
  if (baseType === "custom") {
    try {
      parsedSchema = JSON.parse(document.getElementById("customSchemaInput").value);
    } catch (e) {
      document.getElementById("schemaError").textContent = "Invalid JSON Schema";
      return;
    }
  }

  for (let i = 0; i < count; i++) {
    if (baseType === "custom") currentBatch.push(generateCustomFromSchema(parsedSchema, i));
    else currentBatch.push(generateItem(typeSelection, i));
  }

  document.getElementById("outputSection").style.display = "block";
  renderOutput();
  showToast("Data Generated successfully! ✨");
}

function renderOutput() {
  const output = document.getElementById("output");
  const sqlOutput = document.getElementById("sqlOutput");
  
  // JSON View
  output.textContent = JSON.stringify(currentBatch, null, 2);
  
  // SQL View
  sqlOutput.textContent = generateSQL(currentBatch);
  
  // Table View
  renderTable(currentBatch);
}

function renderTable(data) {
  const header = document.getElementById("tableHeader");
  const body = document.getElementById("tableBody");
  header.innerHTML = "";
  body.innerHTML = "";

  if (data.length === 0) return;

  const sample = data[0];
  const keys = typeof sample === 'object' ? Object.keys(sample) : ["Value"];
  
  keys.forEach(k => {
    const th = document.createElement("th");
    th.textContent = k;
    header.appendChild(th);
  });

  data.forEach(item => {
    const tr = document.createElement("tr");
    keys.forEach(k => {
      const td = document.createElement("td");
      td.textContent = typeof item === 'object' ? (typeof item[k] === 'object' ? JSON.stringify(item[k]) : item[k]) : item;
      tr.appendChild(td);
    });
    body.appendChild(tr);
  });
}

function generateSQL(data) {
  if (data.length === 0) return "-- No data to generate SQL";
  const sample = data[0];
  if (typeof sample !== 'object') return "-- SQL Export requires object-based data (JSON or Custom)";
  
  const tableName = "test_data";
  const keys = Object.keys(sample);
  const columns = keys.join(", ");
  
  const values = data.map(item => {
    const row = keys.map(k => {
      const val = item[k];
      if (typeof val === 'string') return `'${val.replace(/'/g, "''")}'`;
      if (val === null || val === undefined) return "NULL";
      return val;
    }).join(", ");
    return `(${row})`;
  }).join(",\n");

  return `INSERT INTO ${tableName} (${columns}) \nVALUES \n${values};`;
}

function switchTab(tab) {
  activeTab = tab;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.getElementById(`tab-${tab}`).classList.add("active");
  
  document.getElementById("jsonView").style.display = tab === "json" ? "block" : "none";
  document.getElementById("tableView").style.display = tab === "table" ? "block" : "none";
  document.getElementById("sqlView").style.display = tab === "sql" ? "block" : "none";
}

// --- Utils ---
function copyOutput(btn) {
  let text = "";
  if (activeTab === 'json') text = document.getElementById("output").textContent;
  else if (activeTab === 'sql') text = document.getElementById("sqlOutput").textContent;
  else {
    // For table, copy as CSV
    const rows = Array.from(document.querySelectorAll("#dataTable tr"));
    text = rows.map(r => Array.from(r.children).map(c => c.textContent).join(",")).join("\n");
  }

  navigator.clipboard.writeText(text).then(() => {
    showToast("Copied to clipboard! 📋");
  });
}

function clearOutput() {
  currentBatch = [];
  document.getElementById("outputSection").style.display = "none";
  document.getElementById("output").textContent = "";
  document.getElementById("sqlOutput").textContent = "";
  document.getElementById("tableBody").innerHTML = "";
}

function toggleDownloadMenu() {
  const menu = document.getElementById("downloadMenu");
  menu.style.display = menu.style.display === "none" ? "block" : "none";
}

document.addEventListener("click", (e) => {
  if (!e.target.closest("#downloadBtn")) {
    document.getElementById("downloadMenu").style.display = "none";
  }
});

function downloadFile(format) {
  let content = "";
  let filename = `mock-data-${Date.now()}`;
  
  if (format === 'json') {
    content = JSON.stringify(currentBatch, null, 2);
    filename += ".json";
  } else if (format === 'sql') {
    content = generateSQL(currentBatch);
    filename += ".sql";
  } else if (format === 'csv') {
    const keys = Object.keys(currentBatch[0]);
    content = keys.join(",") + "\n" + currentBatch.map(item => keys.map(k => `"${item[k]}"`).join(",")).join("\n");
    filename += ".csv";
  }

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "success-toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// --- Schema Management ---
function saveCurrentSchema() {
  const schema = document.getElementById("customSchemaInput").value;
  const name = prompt("Enter a name for this schema:");
  if (!name) return;

  const saved = JSON.parse(localStorage.getItem("mock_schemas") || "{}");
  saved[name] = schema;
  localStorage.setItem("mock_schemas", JSON.stringify(saved));
  initSavedSchemas();
  showToast("Schema saved! 💾");
}

function initSavedSchemas() {
  const select = document.getElementById("savedSchemas");
  select.innerHTML = '<option value="">Saved Schemas...</option>';
  const saved = JSON.parse(localStorage.getItem("mock_schemas") || "{}");
  for (const name in saved) {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  }
}

function loadSavedSchema() {
  const name = document.getElementById("savedSchemas").value;
  if (!name) return;
  const saved = JSON.parse(localStorage.getItem("mock_schemas") || "{}");
  document.getElementById("customSchemaInput").value = saved[name];
  showToast("Schema loaded! 📂");
}

function toggleIdentity() {
  const isAnon = document.getElementById("anonymous").checked;
  document.getElementById("identityFields").style.display = isAnon ? "none" : "flex";
}

async function submitFeedback() {
  const msg = document.getElementById("message").value;
  if (!msg) return showToast("Please enter a message! ✍️");
  
  // Mock API call
  showToast("Feedback sent! Thank you. ❤️");
  document.getElementById("message").value = "";
}