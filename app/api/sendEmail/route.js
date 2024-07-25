import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "oskarkastro999@gmail.com", // Your Gmail address
    pass: "MODOrokudo103", // Your Gmail password or app-specific password
  },
  debug: true,
  logger: true,
  connectionTimeout: 90000,
});

export async function POST(req, res) {
  const { email, subject, message } = await req.json();

  const mailOptions = {
    from: "oskarkastro999@gmail.com",
    to: email,
    subject: subject,
    text: message,
  };

  try {
    console.log(res);
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email." });
  }
}
