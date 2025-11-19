exports.verifyEmailTemplate = (name, email, otp, verifyUrl) => {
  return `
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; border: 1px solid #eaeaea;">
        
        <h2 style="color: #333;">Hello ${name},</h2>
        
        <p style="font-size: 15px; color: #555;">
          Thank you for registering with us. Please verify your email address to complete your account setup.
        </p>

        <!-- OTP SECTION -->
        <div style="margin: 20px 0; padding: 15px; background: #f0f8ff; border-left: 4px solid #007bff;">
          <p style="font-size: 16px; color: #333; margin: 0;">
            <strong>Your OTP Code:</strong>
          </p>

          <h1 style="font-size: 32px; letter-spacing: 4px; color: #007bff; margin: 10px 0;">
            ${otp}
          </h1>

          <p style="color: #ff0000; font-size: 14px; margin: 0;">
            ⚠️ This OTP is valid for <strong>10 minutes</strong>.
          </p>
        </div>

        <!-- URL BUTTON -->
        <div style="text-align: center; margin-top: 30px;">
          <a href="${verifyUrl}" 
            style="background-color: #28a745; color: #fff; padding: 12px 25px; text-decoration: none;
                   border-radius: 5px; font-size: 16px; display: inline-block;">
            Verify Email
          </a>
        </div>

        <p style="font-size: 14px; color: #777; margin-top: 20px;">
          Or click the URL below if the button doesn’t work:
          <br>
          <a href="${verifyUrl}" style="color: #007bff; word-wrap: break-word;">
            ${verifyUrl}
          </a>
        </p>

        <hr style="margin: 30px 0; border-top: 1px solid #ddd;">
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          This verification link and OTP are valid for <strong>10 minutes</strong>.
          <br>
          You received this email because you registered with: ${email}.
          If you did not request this, please ignore this message.
        </p>

      </div>
    </body>
  </html>
  `;
};
