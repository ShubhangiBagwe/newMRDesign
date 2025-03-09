const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON body
app.use(bodyParser.json());
app.use(cors());
// Route to send email
app.post("/send-email", async (req, res) => {
  const { name, email, message, number } = req.body;

  if (!name || !email || !message || !number) {
    return res.status(400).send("All fields are required.");
  }

  try {
    // Set up the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service provider (e.g., Gmail, Outlook)
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or app password
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`, // Shows sender's name with their email
      to: "info@mrdesign.co.in", // Recipient email
      subject: "Contact Form Submission",
      text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nNumber: ${number}\nMessage: ${message}`,
      replyTo: email, // Allows recipient to reply directly to the sender
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).send("Email sent successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
