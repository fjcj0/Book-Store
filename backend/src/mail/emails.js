import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { sender, transporter } from "./gmail.config.js";
export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = email;
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: recipient,
            subject: "Verify your email!!",
            html: VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken),
        });
        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Failed to send email:', error.message);
    }
};
export const sendWelcomeEmail = async (email, name) => {
    const recipient = email;
    try {
        const response = await transporter.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: recipient,
            subject: `Welcome ${name} to LibraryPs!!`,
            html: WELCOME_EMAIL_TEMPLATE.replace('{username}', name),
        });
        console.log('Email sent successfully:', response);
    } catch (error) {
        console.error('Failed to send email:', error.message);
    }
};
export const sendPasswordResetEmail = async (email, resetUrl) => {
    const recipient = email;
    try {
        const response = await transporter.sendMail({
            from: sender.email,
            to: recipient,
            subject: 'Reset password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetUrl),
        });
        console.log('Email sent successfully: ', response);
    } catch (error) {
        console.log(error.message);
    }
};
export const sendResetSuccessEmail = async (email) => {
    const recipient = email;
    try {
        const response = await transporter.sendMail({
            from: sender.email,
            to: recipient,
            subject: 'Password changed successfully!!',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        });
        console.log('Password changed successfully: ', response);
    } catch (error) {
        console.log(error.message);
    }
};