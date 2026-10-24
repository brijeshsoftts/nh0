import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { transporter } from '../../config';

import { resetPasswordTemplate } from './templates/reset-password.template';

@Injectable()
export class EmailsService {
  private transporter: Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor() {
    this.transporter = transporter;
  }

  async resetPassword(email: string, token: string, expiry: string) {
    try {
      const mailOptions = {
        from: '"Nivara Hotels" <noreply@nivarahotels.com>',
        to: email,
        subject: 'Reset Your Password',
        html: resetPasswordTemplate(email, token, expiry),
      };
      await this.transporter.sendMail(mailOptions);
    } catch {
      throw new InternalServerErrorException(
        'Failed to send email. Please try again later.',
      );
    }
  }
}
