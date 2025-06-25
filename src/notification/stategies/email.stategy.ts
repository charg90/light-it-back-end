import { Injectable, Logger } from '@nestjs/common';
import { NotificationStrategy } from './notification-strategy.interface';
import { MailService } from 'src/mail/mail.service';
import { SmsStrategy } from './sms.strategy';

@Injectable()
export class EmailStategy implements NotificationStrategy {
  constructor(private readonly mailSerivice: MailService) {}
  readonly type = 'email';
  private readonly logger = new Logger(SmsStrategy.name);

  async send(to: string, subject: string, message: string): Promise<void> {
    return await this.mailSerivice.sendEmailNotification(to, subject, message);
  }
}
