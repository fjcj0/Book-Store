import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
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
