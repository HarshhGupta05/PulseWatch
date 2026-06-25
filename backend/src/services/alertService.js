import nodemailer from 'nodemailer';

export const sendDownAlert = async (monitorName, monitorUrl, recipientEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD, // NOT your gmail password - an App Password
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: `[DOWN] ${monitorName} is not responding`,
      text: `Your monitored service "${monitorName}" at ${monitorUrl} is down.`,
    });
    console.log(`Alert sent for ${monitorName}`);
  } catch (error) {
    // Swallow email errors - a failed alert must NOT crash the scheduler
    console.error('Failed to send alert email:', error.message);
  }
};
