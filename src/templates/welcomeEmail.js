export const welcomeEmail = (username) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f4f6f8;
  font-family: Arial, Helvetica, sans-serif;
">

  <div style="
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  ">

    <!-- Header -->
    <div style="
      background-color: #111827;
      padding: 30px;
      text-align: center;
    ">
      <h1 style="
        margin: 0;
        color: #ffffff;
        font-size: 28px;
      ">
        Welcome! 🎉
      </h1>
    </div>

    <!-- Content -->
    <div style="padding: 35px 30px;">

      <h2 style="
        margin: 0 0 15px;
        color: #111827;
        font-size: 22px;
      ">
        Hello ${username}! 👋
      </h2>

      <p style="
        margin: 0 0 15px;
        color: #4b5563;
        font-size: 16px;
        line-height: 1.6;
      ">
        Your account has been created successfully.
        We're excited to have you with us!
      </p>

      <div style="
        margin: 25px 0;
        padding: 18px;
        background-color: #f3f4f6;
        border-radius: 8px;
        border-left: 4px solid #111827;
      ">
        <p style="
          margin: 0;
          color: #374151;
          font-size: 15px;
          line-height: 1.5;
        ">
          You can now log in and start exploring everything we have to offer.
        </p>
      </div>

      <p style="
        margin: 0;
        color: #4b5563;
        font-size: 15px;
        line-height: 1.6;
      ">
        Thanks for joining us. We hope you have a great experience! 🚀
      </p>

    </div>

    <!-- Footer -->
    <div style="
      padding: 20px 30px;
      background-color: #f9fafb;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    ">
      <p style="
        margin: 0;
        color: #9ca3af;
        font-size: 13px;
      ">
        © 2026 Your Company. All rights reserved.
      </p>

      <p style="
        margin: 8px 0 0;
        color: #9ca3af;
        font-size: 12px;
      ">
        This is an automated email. Please do not reply.
      </p>
    </div>

  </div>

</body>
</html>
`;