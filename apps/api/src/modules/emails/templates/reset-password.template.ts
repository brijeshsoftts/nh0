import { env } from '../../../config';

export const resetPasswordTemplate = (
  name: string,
  token: string,
  expiry: string,
) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">

  <table width="100%" cellpadding="0" cellspacing="0"
         style="background-color: #f4f4f4; padding: 40px 10px;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0"
               style="max-width: 500px; background-color: #ffffff;
                      border-radius: 8px; padding: 30px;">

          <tr>
            <td align="center">
              <h2 style="color: #333333; margin-bottom: 20px;">
                Reset Your Password
              </h2>
            </td>
          </tr>

          <tr>
            <td style="color: #555555; font-size: 15px; line-height: 1.6;">
              <p>Hello ${name},</p>

              <p>
                We received a request to reset your password.
                Click the button below to create a new password.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 20px 0;">
              <a href="${env.CORS_ORIGIN}/reset-password?token=${token}"
                 style="display: inline-block; padding: 12px 25px;
                        background-color: #2563eb; color: #ffffff;
                        text-decoration: none; border-radius: 5px;
                        font-size: 15px; font-weight: bold;">
                Reset Password
              </a>
            </td>
          </tr>

          <tr>
            <td style="color: #555555; font-size: 14px; line-height: 1.6;">
              <p>
                This link will expire in ${expiry}.
              </p>
              <p>
                If you didn't request a password reset, you can
                safely ignore this email.
              </p>

              <p style="margin-top: 25px;">
                Best regards,<br>
                Nivara Hotels
              </p>
            </td>
          </tr>

          <tr>
            <td style="border-top: 1px solid #eeeeee; padding-top: 15px;
                       text-align: center; color: #999999; font-size: 12px;">
              &copy; ${new Date().getFullYear()} Nivara Hotels | All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
