export const otpEmailTemplate = (username: string, otp: number) => {
	return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <style>
      body {
        font-family: Arial, sans-serif;
        background:#f4f6f8;
        padding:30px;
      }
      .container{
        max-width:500px;
        margin:auto;
        background:white;
        padding:30px;
        border-radius:8px;
        text-align:center;
        box-shadow:0 4px 10px rgba(0,0,0,0.05);
      }
      .otp{
        font-size:32px;
        letter-spacing:6px;
        font-weight:bold;
        color:#2d6cdf;
        margin:20px 0;
      }
      .footer{
        font-size:12px;
        color:#888;
        margin-top:20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Email Verification</h2>

      <p>Hello ${username},</p>

      <p>Your One-Time Password (OTP) is:</p>

      <div class="otp">${otp}</div>

      <p>This code will expire in <b>5 minutes</b>.</p>

      <p>If you did not request this, please ignore this email.</p>

      <div class="footer">
        © ${new Date().getFullYear()} E-commerce
      </div>
    </div>
  </body>
  </html>
  `;
};

export const resetPasswordEmailTemplate = (
	username: string,
	resetLink: string,
) => {
	return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body{
    font-family: Arial, sans-serif;
    background:#f4f6f8;
    padding:30px;
  }

  .container{
    max-width:500px;
    margin:auto;
    background:white;
    padding:30px;
    border-radius:8px;
    text-align:center;
    box-shadow:0 4px 10px rgba(0,0,0,0.05);
  }

  .button{
    display:inline-block;
    padding:14px 24px;
    background:#2d6cdf;
    color:white !important;
    text-decoration:none;
    border-radius:6px;
    font-weight:bold;
    margin:20px 0;
  }

  .link{
    word-break:break-all;
    font-size:13px;
    color:#555;
    margin-top:15px;
  }

  .footer{
    font-size:12px;
    color:#888;
    margin-top:20px;
  }
</style>
</head>

<body>

<div class="container">

<h2>Password Reset Request</h2>

<p>Hello ${username},</p>

<p>We received a request to reset your password.</p>

<p>Click the button below to create a new password:</p>

<a href="${resetLink}" class="button">
Reset Password
</a>

<p>This link will expire in <b>15 minutes</b>.</p>

<p>If the button does not work, copy and paste this link into your browser:</p>

<p class="link">${resetLink}</p>

<p>If you did not request a password reset, you can safely ignore this email.</p>

<div class="footer">
© ${new Date().getFullYear()} E-commerce
</div>

</div>

</body>
</html>
`;
};
