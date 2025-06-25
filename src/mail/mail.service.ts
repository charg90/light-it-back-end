import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmail(to: string, fullName: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'Welcome to Light IT Care',
      template: 'welcome',
      text: `Hello ${fullName}, welcome to Light IT Care!`,
    });
  }

  async sendEmailNotification(to: string, subject: string, message: string) {
    await this.mailerService.sendMail({
      to,
      subject,

      text: message,
    });
  }
}
