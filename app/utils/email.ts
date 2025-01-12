'use server'

import nodemailer from 'nodemailer'

export async function sendConfirmationEmail(email: string, token: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/confirm-email?token=${token}`

    const info = await transporter.sendMail({
      from: `"Cosmic Coding Journey" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: 'Welcome to Cosmic Coding Journey - Confirm Your Email',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4a5568; text-align: center;">Welcome to Cosmic Coding Journey!</h1>
          <p style="color: #4a5568; font-size: 16px;">You're about to embark on an amazing coding adventure. But first, please confirm your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationLink}" 
               style="background: linear-gradient(to right, #7928ca, #ff0080);
                      color: white;
                      padding: 12px 24px;
                      border-radius: 25px;
                      text-decoration: none;
                      font-weight: bold;">
              Confirm Email Address
            </a>
          </div>
          <p style="color: #718096; font-size: 14px; text-align: center;">
            If the button doesn't work, you can copy and paste this link into your browser:<br>
            <span style="color: #4a5568;">${confirmationLink}</span>
          </p>
        </div>
      `,
    })

    console.log('Confirmation email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw new Error('Failed to send confirmation email')
  }
}

