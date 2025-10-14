// emailTransporter.ts
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: process.env.TRANSPORTER_USERNAME,
    pass: process.env.TRANSPORTER_PASSWORD,
  },
});
