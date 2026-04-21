function randomString() {
  return Math.random().toString(36).substring(2, 8);
}

function generateEmail() {
  const domains = ["gmail.com", "yahoo.com", "test.com"];
  return `${randomString()}@${domains[Math.floor(Math.random()*domains.length)]}`;
}

function generatePhone() {
  const code = document.getElementById("country").value;
  const num = Math.floor(9000000000 + Math.random()*1000000000);
  return code + num;
}

function generateJSON() {
  const schema = document.getElementById("schema").value;

  if (schema === "basic") {
    return {
      name: "User_" + randomString(),
      email: generateEmail(),
      phone: generatePhone()
    };
  }

  if (schema === "ecommerce") {
    return {
      userId: randomString(),
      amount: Math.floor(Math.random()*10000),
      items: [{name:"Item1",price:100}]
    };
  }

  if (schema === "auth") {
    return {
      username: "user_" + randomString(),
      password: randomString() + "123"
    };
  }
}

function generate() {
  const type = document.getElementById("type").value;
  const count = document.getElementById("count").value;

  let result = [];

  for (let i=0;i<count;i++){
    if (type==="email") result.push(generateEmail());
    if (type==="phone") result.push(generatePhone());
    if (type==="json") result.push(generateJSON());
  }

  document.getElementById("output").textContent =
    type==="json" ? JSON.stringify(result,null,2) : result.join("\n");
}

function copyOutput(){
  const text = document.getElementById("output").textContent;
  navigator.clipboard.writeText(text);
  alert("Copied!");
}

async function submitFeedback(){
  const isAnon = document.getElementById("anonymous").checked;

  const name = isAnon ? "Anonymous" : document.getElementById("name").value || "Not provided";
  const email = isAnon ? "Anonymous" : document.getElementById("email").value || "Not provided";
  const message = document.getElementById("message").value;

  if (!message) {
    alert("Please enter feedback");
    return;
  }

  const res = await fetch("/api/sendFeedback",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({name,email,message})
  });

  if(res.ok) {
    alert("Feedback sent!");
    document.getElementById("message").value = "";
  } else {
    alert("Error sending feedback");
  }
}

function toggleIdentity() {
  const isAnon = document.getElementById("anonymous").checked;
  document.getElementById("identityFields").style.display = isAnon ? "none" : "block";
}