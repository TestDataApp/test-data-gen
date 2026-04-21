export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev",
      to: "YOUR_EMAIL_HERE",
      subject: "New Feedback",
      html: `
        <h3>Feedback</h3>
        <p><b>Message:</b> ${message}</p>
      `
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}