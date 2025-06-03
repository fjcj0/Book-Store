import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

export const sender = {
    email: "omarqais225@gmail.com",
    name: "LibraryPs Company",
};

/*
const mailOptions = {
    from: `"${sender.name} ${sender.email}`,
    to: `${recipients[0].email}`,
    subject: 'Hello from Gmail using Nodemailer',
    text: 'This email was sent using Gmail SMTP and Node.js!',
};

transporter.sendMail(mailOptions)
    .then(info => console.log('Email sent:', info))
    .catch(console.error);
*/