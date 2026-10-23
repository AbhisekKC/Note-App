import nodemailer from 'nodemailer';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const verifyMail = async (token, email) => {
  // Read and compile the Handlebars template
  const templatePath = path.join(__dirname, 'template.hbs');
  const emailTemplatePath = fs.readFileSync(templatePath, 'utf-8');
  const emailTemplate = handlebars.compile(emailTemplatePath);
  
  const emailHtml = emailTemplate({ 
    token: encodeURIComponent(token) 
  });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // Must be a Gmail App Password
      },
    });

    const mailConfiguration = {
      from: process.env.MAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailConfiguration);
    console.log('Email Verification sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(error.message);
  }
};
