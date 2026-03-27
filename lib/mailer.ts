import nodemailer from 'nodemailer';

// Create a reusable transporter using the default SMTP transport
// You can use a mock transport or a real one like Sendgrid, Gmail App Passwords, etc.
const transportConfig = process.env.SMTP_HOST
  ? {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }
  : {
      // Mock configuration for testing if no SMTP is provided
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    };

const transporter = nodemailer.createTransport(transportConfig);

export const sendOTPVerificationEmail = async (email: string, otp: string) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_FROM || '"Portfolio Website" <hello@example.com>',
      to: email,
      subject: 'Verify your Email Address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">Verify your Email</h2>
          <p style="color: #555; font-size: 16px;">
            Thank you for registering. Use the following One-Time Password (OTP) to verify your email address. 
            This code is valid for 15 minutes.
          </p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
            <h1 style="margin: 0; color: #000; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p style="color: #555; font-size: 14px; text-align: center;">
            If you did not request this, please ignore this email.
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    // Always log the OTP to the console for easier testing
    console.log('--------------------------------------------------');
    if (!process.env.SMTP_HOST) {
      console.log('📧 MOCK EMAIL SENT (No SMTP Configured)');
    } else {
      console.log('📧 EMAIL SEND ATTEMPTED (Real SMTP)');
    }
    console.log(`To: ${email}`);
    console.log(`Subject: ${mailOptions.subject}`);
    console.log(`OTP Code: [ ${otp} ]`);
    console.log('--------------------------------------------------');

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
};
