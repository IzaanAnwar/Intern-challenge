export function resetMailBody(resetLink: string) {
  const body = `<!DOCTYPE html>
<html>
<head>
  <title>Password Reset</title>
  <style>
    body {
      font-family: sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f8f8f8;
      color: #333;
    }
    .container {
      background-color: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #007bff; /* Ant Design primary blue */
      margin-bottom: 20px;
    }
    .credentials-table {
      width: 100%;
      margin-bottom: 20px;
      border-collapse: collapse; /* Ensures rounded corners for table cells */
    }
    .credentials-table td,
    .credentials-table th {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
      border-radius: 4px; /* Rounded corners for table cells */
    }
    .button {
      background-color: #007bff; /* Ant Design primary blue */
      color: #fff !important;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: inline-block;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Password Reset</h1>
    <p>You've requested to reset your password on CDRSI Equipment booking. Click the button below to continue.</p>

    <a href="${resetLink}" class="button">Reset Password</a>

    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Sincerely,<br>The IIT Jodhpur Team</p>
  </div>
</body>
</html>
`;
  return body;
}
