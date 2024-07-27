import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "oskarkastro999@gmail.com", // Your Gmail address
    pass: "MODOrokudo103", // Your Gmail password or app-specific password
  },
  debug: true,
  logger: true,
  connectionTimeout: 90000,
});

export async function POST(req) {
  const { email, subject, message } = await req.json();

  const mailOptions = {
    from: "oskarkastro999@gmail.com",
    to: email,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    // res.status(200).json({ message: "Email sent successfully!" });
    return NextResponse.json(
      { message: "Email sent succesfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: "Error sending email." });
    return NextResponse.json(
      { message: "Error sending the email!" },
      { status: 500 }
    );
  }
}
