import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { env, transporter } from '../../config';
import type { PublicContactMessageDto } from '../public/dto/contact-message.dto';

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
        from: `"Nivara Hotels" <${env.EMAIL_USER}>`,
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

  async sendContactMessage(data: PublicContactMessageDto): Promise<void> {
    const subjects = {
      reservation: 'Room reservation',
      support: 'Customer support',
      group: 'Group booking',
      feedback: 'Feedback',
      other: 'Other inquiry',
    };

    try {
      await this.transporter.sendMail({
        from: `"Nivara Hotels" <${env.EMAIL_USER}>`,
        to: env.EMAIL_USER,
        replyTo: { name: data.fullName, address: data.email },
        subject: `Contact request: ${subjects[data.subject]}`,
        text: [
          'A new message was submitted through the public contact form.',
          '',
          `Name: ${data.fullName}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone || 'Not provided'}`,
          `Subject: ${subjects[data.subject]}`,
          '',
          'Message:',
          data.message,
        ].join('\n'),
      });
    } catch {
      throw new InternalServerErrorException(
        'Unable to send your message right now. Please try again later.',
      );
    }
  }
}
